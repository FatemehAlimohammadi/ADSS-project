from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.services.categoryService import get_categories_service,get_category_service,create_category_service,get_category_products_service
from app.models.category import Category
from app.schema.category import CategoryCreate,CategoryResponse
router = APIRouter()
from typing import Any
from app.helpers.jwt import *



@router.get("/categories/",response_model=None)
async def read_categories(skip: int = 0, limit: int = 10):
    db  = SessionLocal()
    categories = get_categories_service(db, skip=skip, limit=limit)
    return categories

@router.get("/categories/{category_id}/products",response_model=None)
async def get_category_products(category_id: int):
    db  = SessionLocal()
    category = get_category_products_service(db, category_id)
    if category is None:
        raise HTTPException(status_code=404, detail="User not found")
    return category

@router.get("/categories/{category_id}",response_model=CategoryResponse)
async def read_user(category_id: int):
    db  = SessionLocal()
    category = get_category_service(db, category_id)
    if category is None:
        raise HTTPException(status_code=404, detail="User not found")
    return category

@router.post("/categories/", response_model=CategoryResponse)
async def create_category_route(category: CategoryCreate,
    current_user: Annotated[User, Security(get_current_active_user, scopes=[])]
                                ):
    db  = SessionLocal()
    
 
   
    return create_category_service(db,category)
   