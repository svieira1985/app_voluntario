from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Text, Float
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    clown_name = Column(String, index=True)
    birth_date = Column(DateTime)
    cpf = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    documents = relationship("Document", back_populates="user")
    event_registrations = relationship("EventRegistration", back_populates="user")

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    document_type = Column(String)  # vaccination_proof, id_card, signed_contract
    file_path = Column(String)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="documents")

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    date_time = Column(DateTime)
    location = Column(String)
    total_spots = Column(Integer)
    available_spots = Column(Integer)
    image_path = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    registrations = relationship("EventRegistration", back_populates="event")

class EventRegistration(Base):
    __tablename__ = "event_registrations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    event_id = Column(Integer, ForeignKey("events.id"))
    registered_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="event_registrations")
    event = relationship("Event", back_populates="registrations")

class FinancialRecord(Base):
    __tablename__ = "financial_records"

    id = Column(Integer, primary_key=True, index=True)
    record_type = Column(String)  # income, expense
    amount = Column(Float)
    description = Column(Text, nullable=True)
    document_path = Column(String, nullable=True)
    record_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
