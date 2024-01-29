from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.services.cartService import get_carts_service,get_cart_service,create_cart_service,delete_cart_service
from app.models.user import User
from app.schema.cart import CartCreate,CartResponse,CartProductCreateDTO,CartDelete
from app.helpers.jwt import *
from typing import Any


router = APIRouter()


# @router.get("/carts/",response_model=list[CartResponse])
@router.get("/carts/",response_model=None)
async def read_carts(
    current_user: Annotated[User, Depends(get_current_active_user)],
    skip: int = 0, limit: int = 8):
    db  = SessionLocal()
    
    carts = get_carts_service(db,current_user, skip=skip, limit=limit)
    return carts

@router.get("/carts/{user_id}",response_model=CartResponse)
async def read_cart(user_id: int):
    db  = SessionLocal()
    user = get_cart_service(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Cart not found")
    return user

@router.delete("/carts/", response_model=None)
async def delete_cart_route(cart: CartDelete,
    current_user: Annotated[User, Depends(get_current_active_user)]
    ):
    
    db  = SessionLocal()
    
    cart = CartProductCreateDTO(cart.product_id,cart.count)
    
    return delete_cart_service(db,cart,current_user)
@router.post("/carts/", response_model=None)
async def create_cart_route(cart: CartCreate,
    current_user: Annotated[User, Depends(get_current_active_user)]
    ):
    
    db  = SessionLocal()
    
    cart = CartProductCreateDTO(cart.product_id,cart.count)
    
    return create_cart_service(db,cart,current_user)
    