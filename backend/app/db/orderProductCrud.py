from sqlalchemy.orm import Session
from app.models.orderProduct import OrderProduct
from datetime import datetime, timedelta
from sqlalchemy import  and_,func,update
from app.helpers.date import get_index_day_in_week,get_day_of_week
from sqlalchemy import or_
from app.models.order import Order

def get_orderProduct(db: Session, orderProduct_id: int):
    return db.query(OrderProduct).filter(OrderProduct.id == orderProduct_id).first()


def get_last_active_orderProduct(db: Session,user_id:int):
    return db.query(OrderProduct).filter(OrderProduct.owner_id==user_id).order(OrderProduct.id.desc()).first()

def getOrderProducts(db:Session,order_id:int):
    order_products = db.query(OrderProduct).filter_by(order_id=order_id).all()
    return order_products

def get_orderProducts(db: Session,current_user, skip: int = 0, limit: int = 8):
    orderProducts= db.query(OrderProduct).offset(skip).limit(limit).all()
    
    return orderProducts
   
def updateOrderPrice(db: Session,order_id:int,newPrice:int,newCount:int):
    print(f'updating order_id {order_id}  and newPrice {newPrice} and newCOunt: {newCount}')
    db.execute(update(Order).where(Order.id == order_id).values(dict(sum_price=newPrice,product_count=newCount)))
    db.commit()
   
def updateOrderProduct(db: Session,order_id:int,product_id:int,newCount:int):
    db.execute(update(OrderProduct).where(and_(OrderProduct.order_id == order_id , OrderProduct.id==product_id)).values(dict(count =newCount)))
    

    db.commit()
 
    
def isOrderHasProductId(db: Session,order_id:int,product_id:int):
    return db.query(OrderProduct).filter(
        and_(
            OrderProduct.order_id==order_id,
            OrderProduct.id==product_id
        )
    ).first()


def create_orderProduct(db: Session, orderProduct: OrderProduct):
    db.add(orderProduct)
    db.commit()
    db.refresh(orderProduct)
    
    return orderProduct
