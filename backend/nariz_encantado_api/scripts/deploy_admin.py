import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database.database import SessionLocal
from app.models.models import User
from app.auth.password import get_password_hash
from datetime import datetime

def create_admin():
    db = SessionLocal()
    try:
        admin = db.query(User).filter(User.email == 'admin@narizencantado.org').first()
        
        if admin:
            print(f'Admin user found: ID={admin.id}, Email={admin.email}, Is_Admin={admin.is_admin}')
            
            admin.hashed_password = get_password_hash('admin123')
            db.commit()
            print('Admin password updated to admin123')
        else:
            print('Admin user not found')
            
            hashed_password = get_password_hash('admin123')
            new_admin = User(
                email='admin@narizencantado.org',
                hashed_password=hashed_password,
                full_name='Admin Nariz Encantado',
                cpf='12345678901',
                is_admin=True,
                birth_date=datetime(1990, 1, 1),
                clown_name='Admin'
            )
            db.add(new_admin)
            db.commit()
            print(f'Admin user created with email: admin@narizencantado.org and password: admin123')
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()
