from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import os
from datetime import datetime

from app.database.database import get_db
from app.schemas.financial import FinancialRecordCreate, FinancialRecord
from app.models.models import FinancialRecord as FinancialRecordModel, User as UserModel
from app.auth.jwt import get_admin_user

router = APIRouter(
    prefix="/financial",
    tags=["financial"],
    responses={401: {"description": "Unauthorized"}},
)

@router.get("/", response_model=List[FinancialRecord])
def get_financial_records(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_admin_user)
):
    records = db.query(FinancialRecordModel).offset(skip).limit(limit).all()
    return records

@router.post("/", response_model=FinancialRecord, status_code=status.HTTP_201_CREATED)
def create_financial_record(
    record: FinancialRecordCreate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_admin_user)
):
    db_record = FinancialRecordModel(
        record_type=record.record_type,
        amount=record.amount,
        description=record.description,
        record_date=record.record_date
    )
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

@router.post("/{record_id}/upload-document", response_model=FinancialRecord)
async def upload_financial_document(
    record_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_admin_user)
):
    record = db.query(FinancialRecordModel).filter(FinancialRecordModel.id == record_id).first()
    if record is None:
        raise HTTPException(status_code=404, detail="Financial record not found")
    
    upload_dir = "uploads/financial"
    os.makedirs(upload_dir, exist_ok=True)
    
    file_extension = os.path.splitext(file.filename)[1]
    file_name = f"financial_{record_id}_{datetime.utcnow().timestamp()}{file_extension}"
    file_path = os.path.join(upload_dir, file_name)
    
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    record.document_path = file_path
    db.commit()
    db.refresh(record)
    
    return record

@router.get("/summary")
def get_financial_summary(
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_admin_user)
):
    records = db.query(FinancialRecordModel).all()
    
    monthly_data = {}
    
    for record in records:
        month_key = record.record_date.strftime("%Y-%m")
        
        if month_key not in monthly_data:
            monthly_data[month_key] = {
                "income": 0,
                "expense": 0,
                "balance": 0
            }
        
        if record.record_type == "income":
            monthly_data[month_key]["income"] += record.amount
            monthly_data[month_key]["balance"] += record.amount
        elif record.record_type == "expense":
            monthly_data[month_key]["expense"] += record.amount
            monthly_data[month_key]["balance"] -= record.amount
    
    chart_data = []
    for month, data in monthly_data.items():
        chart_data.append({
            "month": month,
            "income": data["income"],
            "expense": data["expense"],
            "balance": data["balance"]
        })
    
    chart_data.sort(key=lambda x: x["month"])
    
    return chart_data
