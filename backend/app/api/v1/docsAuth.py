
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.services.userService import get_users_service, get_user, create_user_service
from app.models.user import User
from app.schema.user import UserCreate, UserResponse
from app.helpers.jwt import *
from app.schema.token import Token,TokenData,TokenDataPost

router = APIRouter()
from typing import Any

@router.post("/token",response_model=None)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm,Depends()]
    # form_data: Annotated[OAuth2PasswordRequestForm,Depends(TokenDataPost)]
) -> Token:
    db  = SessionLocal()
    
    user = authenticate_user(db, form_data.username, form_data.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "scopes":form_data.scopes},
        expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer",role=user.role)


@router.get("/users/me",response_model=None)
async def read_users_me(
    current_user: Annotated[User, Security(get_current_active_user, scopes=["admin"])]
):
    return current_user


@router.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[User, Security(get_current_active_user, scopes=[])]
):
    return current_user
    # return [{"item_id": "Foo", "owner": current_user.email}]



@router.get("/status/")
async def read_system_status(current_user: Annotated[User, Depends(get_current_user)]):
    return {"status": "ok"}