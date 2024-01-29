from sqlalchemy.orm import Session
from app.models.product import Product
from datetime import datetime, timedelta
from sqlalchemy import  and_,func
from app.helpers.date import get_index_day_in_week,get_day_of_week

def get_product(db: Session, product_id: int):
    return db.query(Product).filter(Product.id == product_id).first()



# def get_products(db: Session, skip: int = 0, limit: int = 10):
#     return db.query(Product).offset(skip).limit(limit).all()

def get_products(db: Session,current_user, skip: int = 0, limit: int = 8):
    products= db.query(Product).offset(skip).limit(limit).all()
    
    return products
    
    
    
    
    return products
   
  

def create_product(db: Session, product: Product):
    db.add(product)
    db.commit()
    db.refresh(product)
    
    return product
