from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database.database import get_db
from app.schemas.user import User, UserCreate
from app.models.models import User as UserModel
from app.auth.jwt import get_admin_user
from app.auth.password import get_password_hash

router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    responses={401: {"description": "Unauthorized"}},
)

@router.get("/users", response_model=List[User])
def get_all_users(
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_admin_user)
):
    """Get all users. Admin only."""
    users = db.query(UserModel).all()
    return users

@router.post("/users", response_model=User)
def create_admin_user(
    user_data: UserCreate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_admin_user)
):
    """Create a new admin user. Admin only."""
    existing_user = db.query(UserModel).filter(
        (UserModel.email == user_data.email) | 
        (UserModel.cpf == user_data.cpf)
    ).first()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email or CPF already registered"
        )
    
    hashed_password = get_password_hash(user_data.password)
    new_user = UserModel(
        email=user_data.email,
        full_name=user_data.full_name,
        cpf=user_data.cpf,
        clown_name=user_data.clown_name,
        birth_date=user_data.birth_date,
        hashed_password=hashed_password,
        is_admin=True
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user

@router.patch("/users/{user_id}/role", response_model=User)
def update_user_role(
    user_id: int,
    role_data: dict,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_admin_user)
):
    """Update a user's admin status. Admin only."""
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    user.is_admin = role_data.get("is_admin", user.is_admin)
    
    db.commit()
    db.refresh(user)
    
    return user
