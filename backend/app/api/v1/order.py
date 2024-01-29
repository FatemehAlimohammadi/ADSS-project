from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.services.orderService import get_orders_service,get_order_service,create_order_service
from app.models.user import User
from app.schema.order import OrderCreate,OrderResponse
from app.helpers.jwt import *
from typing import Any


router = APIRouter()


# @router.get("/orders/",response_model=list[OrderResponse])
@router.get("/orders/",response_model=None)
async def read_orders(
    current_user: Annotated[User, Depends(get_current_active_user)],
    skip: int = 0, limit: int = 8):
    db  = SessionLocal()
    
    orders = get_orders_service(db,current_user, skip=skip, limit=limit)
    return orders

@router.get("/orders/{user_id}",response_model=OrderResponse)
async def read_order(user_id: int):
    db  = SessionLocal()
    user = get_order_service(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return user

@router.post("/orders/", response_model=None)
async def create_order_route(order: OrderCreate,
    current_user: Annotated[User, Depends(get_current_active_user)]
    ):
    
    
    
    db  = SessionLocal()
    # Your logic to create a order
    # Return an instance of OrderResponse
    return create_order_service(db,order,current_user)
    # created_user = create_user(db,order)
    # return {created_user.email}