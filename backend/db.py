from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from passlib.context import CryptContext

app = FastAPI()

# Password context for hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# User model
class User(BaseModel):
    username: str
    password: str
    email: Optional[str] = None

# In-memory database
db = []

@app.post("/signup")
def signup(user: User):
    hashed_password = pwd_context.hash(user.password)
    db.append({
        "username": user.username,
        "password": hashed_password,
        "email": user.email
    })
    return {"message": "User created successfully"}

@app.post("/login")
def login(user: User):
    for user_db in db:
        if user_db["username"] == user.username:
            if pwd_context.verify(user.password, user_db["password"]):
                return {"message": "Login successful"}
            raise HTTPException(status_code=400, detail="Incorrect password")
    raise HTTPException(status_code=400, detail="User not found")
