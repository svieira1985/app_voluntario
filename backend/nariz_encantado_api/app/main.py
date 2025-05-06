from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg
from fastapi.staticfiles import StaticFiles
import os

from app.database.database import engine
from app.models import models
from app.routers import auth, users, events, financial

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

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}
