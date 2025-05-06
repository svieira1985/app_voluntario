from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import os
from datetime import datetime

from app.database.database import get_db
from app.schemas.user import User, Document
from app.models.models import User as UserModel, Document as DocumentModel, EventRegistration
from app.auth.jwt import get_current_active_user

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={401: {"description": "Unauthorized"}},
)

@router.get("/me", response_model=User)
def read_users_me(current_user: UserModel = Depends(get_current_active_user)):
    return current_user

@router.get("/me/events")
def read_user_events(current_user: UserModel = Depends(get_current_active_user), db: Session = Depends(get_db)):
    registrations = db.query(EventRegistration).filter(EventRegistration.user_id == current_user.id).all()
    events = []
    for registration in registrations:
        events.append({
            "event": {
                "id": registration.event.id,
                "name": registration.event.name,
                "date_time": registration.event.date_time,
                "location": registration.event.location,
                "image_path": registration.event.image_path
            },
            "registered_at": registration.registered_at
        })
    return events

@router.get("/me/documents", response_model=List[Document])
def read_user_documents(current_user: UserModel = Depends(get_current_active_user), db: Session = Depends(get_db)):
    documents = db.query(DocumentModel).filter(DocumentModel.user_id == current_user.id).all()
    return documents

@router.post("/me/documents", response_model=Document)
async def upload_document(
    document_type: str,
    file: UploadFile = File(...),
    current_user: UserModel = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    valid_types = ["vaccination_proof", "id_card", "signed_contract"]
    if document_type not in valid_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid document type. Must be one of: {', '.join(valid_types)}"
        )
    
    upload_dir = "uploads/documents"
    os.makedirs(upload_dir, exist_ok=True)
    
    file_extension = os.path.splitext(file.filename)[1]
    file_name = f"{current_user.id}_{document_type}_{datetime.utcnow().timestamp()}{file_extension}"
    file_path = os.path.join(upload_dir, file_name)
    
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    existing_doc = db.query(DocumentModel).filter(
        DocumentModel.user_id == current_user.id,
        DocumentModel.document_type == document_type
    ).first()
    
    if existing_doc:
        existing_doc.file_path = file_path
        existing_doc.uploaded_at = datetime.utcnow()
        db.commit()
        db.refresh(existing_doc)
        return existing_doc
    else:
        db_document = DocumentModel(
            user_id=current_user.id,
            document_type=document_type,
            file_path=file_path
        )
        db.add(db_document)
        db.commit()
        db.refresh(db_document)
        return db_document
