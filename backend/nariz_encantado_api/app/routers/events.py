from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List, Optional
import os
from datetime import datetime

from app.database.database import get_db
from app.schemas.event import EventCreate, Event, EventRegistrationCreate, EventRegistration
from app.models.models import Event as EventModel, EventRegistration as EventRegistrationModel, User as UserModel
from app.auth.jwt import get_current_active_user, get_admin_user

router = APIRouter(
    prefix="/events",
    tags=["events"],
    responses={401: {"description": "Unauthorized"}},
)

@router.get("/", response_model=List[Event])
def get_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    events = db.query(EventModel).offset(skip).limit(limit).all()
    return events

@router.post("/", response_model=Event, status_code=status.HTTP_201_CREATED)
def create_event(event: EventCreate, db: Session = Depends(get_db), current_user: UserModel = Depends(get_admin_user)):
    db_event = EventModel(
        name=event.name,
        date_time=event.date_time,
        location=event.location,
        total_spots=event.total_spots,
        available_spots=event.available_spots,
        description=event.description
    )
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

@router.get("/{event_id}", response_model=Event)
def get_event(event_id: int, db: Session = Depends(get_db)):
    db_event = db.query(EventModel).filter(EventModel.id == event_id).first()
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return db_event

@router.post("/{event_id}/register", response_model=EventRegistration)
def register_for_event(
    event_id: int, 
    db: Session = Depends(get_db), 
    current_user: UserModel = Depends(get_current_active_user)
):
    event = db.query(EventModel).filter(EventModel.id == event_id).first()
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    
    existing_registration = db.query(EventRegistrationModel).filter(
        EventRegistrationModel.user_id == current_user.id,
        EventRegistrationModel.event_id == event_id
    ).first()
    
    if existing_registration:
        raise HTTPException(status_code=400, detail="User already registered for this event")
    
    if event.available_spots <= 0:
        raise HTTPException(status_code=400, detail="No available spots for this event")
    
    db_registration = EventRegistrationModel(
        user_id=current_user.id,
        event_id=event_id
    )
    
    event.available_spots -= 1
    
    db.add(db_registration)
    db.commit()
    db.refresh(db_registration)
    return db_registration

@router.post("/{event_id}/upload-image", response_model=Event)
async def upload_event_image(
    event_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_admin_user)
):
    event = db.query(EventModel).filter(EventModel.id == event_id).first()
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    
    upload_dir = "uploads/events"
    os.makedirs(upload_dir, exist_ok=True)
    
    file_extension = os.path.splitext(file.filename)[1]
    file_name = f"event_{event_id}_{datetime.utcnow().timestamp()}{file_extension}"
    file_path = os.path.join(upload_dir, file_name)
    
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    event.image_path = file_path
    db.commit()
    db.refresh(event)
    
    return event
