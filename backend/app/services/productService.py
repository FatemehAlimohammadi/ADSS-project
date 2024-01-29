from sqlalchemy.orm import Session
from app.db.productCrud import get_product,get_products,create_product
from app.models.product import Product
from sqlalchemy import update,and_
from fastapi import Depends, FastAPI, HTTPException, status
from app.db.categoryCrud import get_category
from app.helpers.jwt import get_current_user
from app.models.user import User
from datetime import datetime

def get_product_service(db: Session, category_id: int):
    return get_product(db, category_id)

def get_products_service(db: Session,current_user:User, skip: int = 0, limit: int = 8):
    
    return get_products(db, current_user,skip=skip, limit=limit)

def create_product_service(db: Session, product: Product,current_user:User):
   
    if(product.category_id <=0):
        raise HTTPException(status_code=403, detail="category missing from body")
    
    # check if category_id exist
    category = get_category(db,product.category_id)
    if(not category):
        raise HTTPException(status_code=403, detail="category does not set")
    
    if(not current_user):
        raise HTTPException(status_code=403, detail="you must loggin before")
    

    db_product = Product(
        name=product.name,
        image=product.image,
        category_id =product.category_id ,
        price=product.price,
        description=product.description,

        is_active=product.is_active,
        
    )

    return create_product(db, db_product)


def update_product_service(db: Session, product: Product,product_id:int,current_user:User):
   
    if(product.category_id <=0):
        raise HTTPException(status_code=403, detail="category missing from body")
    
    # check if category_id exist
    db_product = get_product(db,product_id)
    if(not db_product):
        raise HTTPException(status_code=403, detail="product does not set")
    
    if(not current_user):
        raise HTTPException(status_code=403, detail="you must loggin before")

 
    
    db.execute(update(Product).where(Product.id == product_id).values(dict(
        name=product.name,
        image=product.image,
        category_id =product.category_id ,
        price=product.price,
        description=product.description,
        is_active=product.is_active
    )))
    db.commit()
    
    db.refresh(db_product)
    
    return db_product
    
    

    
