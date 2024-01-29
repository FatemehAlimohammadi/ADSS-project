from sqlalchemy.orm import Session,joinedload
from app.models.order import Order
from datetime import datetime, timedelta
from sqlalchemy import  and_,func
from app.helpers.date import get_index_day_in_week,get_day_of_week

def get_order(db: Session, order_id: int):
    return db.query(Order).filter(Order.id == order_id).first()



def get_last_active_order(db: Session,user_id:int):
    return db.query(Order).filter(Order.owner_id==user_id).order(Order.id.desc()).first()

def get_orders(db: Session,current_user, skip: int = 0, limit: int = 8):
    # orders= db.query(Order).offset(skip).limit(limit).all()
    orders_with_products = db.query(Order).options(joinedload(Order.order_products),joinedload(Order.owner)).all()
    
    return orders_with_products
   
  

def create_order(db: Session, order: Order):
    db.add(order)
    db.commit()
    db.refresh(order)
    
    return order
