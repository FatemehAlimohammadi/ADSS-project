from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.services.productService import get_products_service,get_product_service,create_product_service,update_product_service
from app.models.user import User
from app.schema.product import ProductCreate,ProductResponse
from app.helpers.jwt import *
from typing import Any


router = APIRouter()


# @router.get("/products/",response_model=list[ProductResponse])
@router.get("/products/",response_model=None)
async def read_products(
    current_user: Annotated[User, Depends(get_current_active_user)],
    skip: int = 0, limit: int = 8):
    db  = SessionLocal()
    
    products = get_products_service(db,current_user, skip=skip, limit=limit)
    return products

@router.get("/products/{product_id}",response_model=ProductResponse)
async def read_product(product_id: int):
    db  = SessionLocal()
    user = get_product_service(db, product_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return user

@router.put("/products/{product_id}", response_model=None)
async def create_product_route(product: ProductCreate,product_id,
    current_user: Annotated[User, Security(get_current_active_user, scopes=["admin"])]
    ):
    db  = SessionLocal()
    return update_product_service(db,product,product_id,current_user)


@router.post("/products/", response_model=None)
async def create_product_route(product: ProductCreate,
    current_user: Annotated[User, Security(get_current_active_user, scopes=["admin"])]
    ):
    
    
    db  = SessionLocal()
    # Your logic to create a product
    # Return an instance of ProductResponse
    return create_product_service(db,product,current_user)
    # created_user = create_user(db,product)
    # return {created_user.email}