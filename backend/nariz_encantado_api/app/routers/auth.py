from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import List

from app.database.database import get_db
from app.schemas.user import UserCreate, User
from app.schemas.token import Token
from app.models.models import User as UserModel
from app.auth.jwt import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from app.auth.password import verify_password, get_password_hash

router = APIRouter(
    prefix="/auth",
    tags=["authentication"],
    responses={401: {"description": "Unauthorized"}},
)

@router.post("/register", response_model=User)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user_email = db.query(UserModel).filter(UserModel.email == user.email).first()
    if db_user_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    db_user_cpf = db.query(UserModel).filter(UserModel.cpf == user.cpf).first()
    if db_user_cpf:
        raise HTTPException(status_code=400, detail="CPF already registered")
    
    hashed_password = get_password_hash(user.password)
    db_user = UserModel(
        full_name=user.full_name,
        clown_name=user.clown_name,
        birth_date=user.birth_date,
        cpf=user.cpf,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(
        (UserModel.email == form_data.username) | (UserModel.cpf == form_data.username)
    ).first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/reset-password")
def reset_password(email: str, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.email == email).first()
    if not user:
        return {"message": "If your email is registered, you will receive a password reset link"}
    
    return {"message": "If your email is registered, you will receive a password reset link"}
