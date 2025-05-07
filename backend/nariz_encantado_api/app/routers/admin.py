from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from app.database.database import get_db
from app.models.models import User
from app.schemas.user import UserCreate, UserResponse, UserUpdate
from app.auth.jwt import get_admin_user
from app.auth.password import get_password_hash

router = APIRouter(
    prefix="/users",
    tags=["admin"],
    dependencies=[Depends(get_admin_user)]
)

@router.post("/admin", response_model=UserResponse)
def create_admin(user: UserCreate, db: Session = Depends(get_db), current_user: User = Depends(get_admin_user)):
    """
    Create a new admin user. Only accessible by existing admins.
    """
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    db_user = db.query(User).filter(User.cpf == user.cpf).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="CPF already registered"
        )
    
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        hashed_password=hashed_password,
        full_name=user.full_name,
        cpf=user.cpf,
        birth_date=datetime.strptime(user.birth_date, "%Y-%m-%d").date(),
        clown_name=user.clown_name,
        is_admin=True
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

@router.get("/admins", response_model=List[UserResponse])
def get_admins(db: Session = Depends(get_db), current_user: User = Depends(get_admin_user)):
    """
    Get all admin users. Only accessible by admins.
    """
    return db.query(User).filter(User.is_admin == True).all()

@router.patch("/{user_id}/admin", response_model=UserResponse)
def toggle_admin_status(
    user_id: int, 
    user_update: UserUpdate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_admin_user)
):
    """
    Toggle admin status for a user. Only accessible by admins.
    """
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    db_user.is_admin = user_update.is_admin
    
    db.commit()
    db.refresh(db_user)
    
    return db_user
