import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database.database import SessionLocal
from app.models.models import User
from app.auth.password import get_password_hash, verify_password

def check_admin():
    db = SessionLocal()
    try:
        admin = db.query(User).filter(User.email == "admin@narizencantado.org").first()
        
        if admin:
            print(f"Admin user found: ID={admin.id}, Email={admin.email}, Is_Admin={admin.is_admin}")
            print(f"Password verification test: {verify_password('admin123', admin.hashed_password)}")
            
            admin.hashed_password = get_password_hash("admin123")
            db.commit()
            print("Admin password updated to 'admin123'")
        else:
            print("Admin user not found")
            
            hashed_password = get_password_hash("admin123")
            new_admin = User(
                email="admin@narizencantado.org",
                hashed_password=hashed_password,
                full_name="Admin Nariz Encantado",
                cpf="12345678901",
                is_admin=True,
                birth_date="1990-01-01",
                clown_name="Admin"
            )
            db.add(new_admin)
            db.commit()
            print(f"Admin user created with email: admin@narizencantado.org and password: admin123")
            
        users = db.query(User).all()
        print(f"Total users in database: {len(users)}")
        for user in users:
            print(f"User: {user.email}, Admin: {user.is_admin}")
    finally:
        db.close()

if __name__ == "__main__":
    check_admin()
