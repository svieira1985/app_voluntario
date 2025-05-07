from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg
from fastapi.staticfiles import StaticFiles
import os

from app.database.database import engine, SessionLocal
from app.models import models
from app.routers import auth, users, events, financial, admin
from app.auth.password import get_password_hash
from datetime import datetime

models.Base.metadata.create_all(bind=engine)

os.makedirs("uploads/documents", exist_ok=True)
os.makedirs("uploads/events", exist_ok=True)
os.makedirs("uploads/financial", exist_ok=True)

app = FastAPI(title="Nariz Encantado API", description="API para o aplicativo de voluntariado Nariz Encantado")

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(events.router)
app.include_router(financial.router)
app.include_router(admin.router)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

def create_initial_admin():
    db = SessionLocal()
    try:
        admin_count = db.query(models.User).filter(models.User.is_admin == True).count()
        if admin_count == 0:
            hashed_password = get_password_hash("admin123")
            new_admin = models.User(
                email="admin@narizencantado.org",
                hashed_password=hashed_password,
                full_name="Admin Nariz Encantado",
                cpf="12345678901",
                is_admin=True,
                birth_date=datetime(1990, 1, 1),
                clown_name="Admin"
            )
            db.add(new_admin)
            db.commit()
            print("Initial admin user created with email: admin@narizencantado.org and password: admin123")
    except Exception as e:
        print(f"Error creating initial admin: {e}")
    finally:
        db.close()

create_initial_admin()

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}
