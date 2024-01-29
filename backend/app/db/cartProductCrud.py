from sqlalchemy.orm import Session
from app.models.cartProduct import CartProduct
from datetime import datetime, timedelta
from sqlalchemy import  and_,func,update
from app.helpers.date import get_index_day_in_week,get_day_of_week
from sqlalchemy import or_
from app.models.cart import Cart

def get_cartProduct(db: Session, cartProduct_id: int):
    return db.query(CartProduct).filter(CartProduct.id == cartProduct_id).first()


def get_last_active_cartProduct(db: Session,user_id:int):
    return db.query(CartProduct).filter(CartProduct.owner_id==user_id).order(CartProduct.id.desc()).first()

def getCartProducts(db:Session,cart_id:int):
    cart_products = db.query(CartProduct).filter_by(cart_id=cart_id).all()
    return cart_products

def get_cartProducts(db: Session,current_user, skip: int = 0, limit: int = 8):
    cartProducts= db.query(CartProduct).offset(skip).limit(limit).all()
    
    return cartProducts
   
def updateCartPrice(db: Session,cart_id:int,newPrice:int,newCount:int):
    print(f'updating cart_id {cart_id}  and newPrice {newPrice} and newCOunt: {newCount}')
    db.execute(update(Cart).where(Cart.id == cart_id).values(dict(sum_price=newPrice,product_count=newCount)))
    db.commit()
   
def updateCartProduct(db: Session,cart_id:int,product_id:int,newCount:int):
    db.execute(update(CartProduct).where(and_(CartProduct.cart_id == cart_id , CartProduct.id==product_id)).values(dict(count =newCount)))
    

    db.commit()
 
    
def isCartHasProductId(db: Session,cart_id:int,product_id:int):
    return db.query(CartProduct).filter(
        and_(
            CartProduct.cart_id==cart_id,
            CartProduct.id==product_id
        )
    ).first()


def create_cartProduct(db: Session, cartProduct: CartProduct):
    db.add(cartProduct)
    db.commit()
    db.refresh(cartProduct)
    
    return cartProduct
