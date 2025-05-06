from typing import Optional, List
from pydantic import BaseModel, EmailStr
from datetime import datetime

class DocumentBase(BaseModel):
    document_type: str
    
class DocumentCreate(DocumentBase):
    pass

class Document(DocumentBase):
    id: int
    user_id: int
    file_path: str
    uploaded_at: datetime
    
    class Config:
        orm_mode = True

class UserBase(BaseModel):
    full_name: str
    clown_name: str
    birth_date: datetime
    cpf: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str  # Can be either CPF or email
    password: str

class User(UserBase):
    id: int
    is_active: bool
    is_admin: bool
    created_at: datetime
    documents: List[Document] = []
    
    class Config:
        orm_mode = True
