from sqlalchemy.orm import Session
from app.db.categoryCrud import create_category,get_categories,get_category,get_category_products
from app.models.category import Category
from app.models.category import Category


def get_category_service(db: Session, category_id: int):
    return get_category(db, category_id)

def get_categories_service(db: Session, skip: int = 0, limit: int = 10):
    return get_categories(db, skip=skip, limit=limit)

def get_category_products_service(db: Session, category_id):
    return get_category_products(db,category_id)

def create_category_service(db: Session, category: Category):
    db_category = Category(name=category.name, description= category.description)
    
    return create_category(db, db_category)
