from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.services.userService import get_users_service,get_user_service, create_user_service
from app.models.user import User
from app.helpers.jwt import *

from app.schema.user import UserCreate, UserResponse
router = APIRouter()
from typing import Any

@router.get("/users/",response_model=list[UserResponse])
async def read_users(
    skip: int = 0, limit: int = 10,
    ):
    db  = SessionLocal()
    users = get_users_service(db, skip=skip, limit=limit)
    return users

@router.get("/users/{user_id}",response_model=UserResponse)
def read_user(user_id: int):
    db  = SessionLocal()
    user = get_user_service(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

    
@router.post("/users/", response_model=None)
async def create_user_route(user: UserCreate):
    db  = SessionLocal()
    # Your logic to create a user
    # Return an instance of UserResponse
    user= create_user_service(db,user)
      
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "scopes":["client"]},
        expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")
    
    
    # created_user = create_user(db,user)
    # return {created_user.email}