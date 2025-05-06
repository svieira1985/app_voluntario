from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class FinancialRecordBase(BaseModel):
    record_type: str  # income, expense
    amount: float
    description: Optional[str] = None
    record_date: datetime
    
class FinancialRecordCreate(FinancialRecordBase):
    pass

class FinancialRecord(FinancialRecordBase):
    id: int
    document_path: Optional[str] = None
    created_at: datetime
    
    class Config:
        orm_mode = True
