from sqlalchemy.orm import Session,joinedload
from app.models.category import Category

def get_category(db: Session, category_id: int):
    return db.query(Category).filter(Category.id == category_id).first()

def get_categories(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Category).offset(skip).limit(limit).all()


def get_category_products(db: Session,category_id:int):
    carts_with_products = db.query(Category).filter(Category.id == category_id).options(joinedload(Category.products)).first()
    return carts_with_products
    
def create_category(db: Session, category: Category):
    db.add(category)
    db.commit()
    db.refresh(category)
    
    return category
