from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime

class EventBase(BaseModel):
    name: str
    date_time: datetime
    location: str
    total_spots: int
    available_spots: int
    description: Optional[str] = None
    
class EventCreate(EventBase):
    pass

class Event(EventBase):
    id: int
    image_path: Optional[str] = None
    created_at: datetime
    
    class Config:
        orm_mode = True

class EventRegistrationBase(BaseModel):
    event_id: int
    
class EventRegistrationCreate(EventRegistrationBase):
    pass

class EventRegistration(EventRegistrationBase):
    id: int
    user_id: int
    registered_at: datetime
    
    class Config:
        orm_mode = True
