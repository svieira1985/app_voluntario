import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database.database import SessionLocal, engine, Base
from app.models.models import User
from app.auth.password import get_password_hash
import argparse
from datetime import datetime

Base.metadata.create_all(bind=engine)

def create_admin(email, password, full_name, cpf):
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).first()
        if user:
            if user.is_admin:
                print(f"User {email} already exists and is an admin.")
                return
            else:
                user.is_admin = True
                db.commit()
                print(f"User {email} has been upgraded to admin.")
                return
        
        hashed_password = get_password_hash(password)
        new_admin = User(
            email=email,
            hashed_password=hashed_password,
            full_name=full_name,
            cpf=cpf,
            is_admin=True,
            birth_date=datetime.now(),
            clown_name="Admin"
        )
        db.add(new_admin)
        db.commit()
        print(f"Admin user {email} created successfully.")
    finally:
        db.close()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create an admin user")
    parser.add_argument("--email", required=True, help="Admin email")
    parser.add_argument("--password", required=True, help="Admin password")
    parser.add_argument("--name", required=True, help="Admin full name")
    parser.add_argument("--cpf", required=True, help="Admin CPF")
    
    args = parser.parse_args()
    create_admin(args.email, args.password, args.name, args.cpf)
