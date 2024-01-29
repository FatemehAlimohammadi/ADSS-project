from sqlalchemy.orm import Session,joinedload
from app.models.cart import Cart
from datetime import datetime, timedelta
from sqlalchemy import  and_,func,delete
from app.helpers.date import get_index_day_in_week,get_day_of_week
from fastapi import FastAPI, Depends, HTTPException
from app.models.cartProduct import CartProduct
from app.models.cart import Cart

def get_cart(db: Session, cart_id: int):
    return db.query(Cart).filter(Cart.id == cart_id).first()




def get_last_active_cart(db: Session,user_id:int):
    return db.query(Cart).filter(Cart.owner_id==user_id).order_by(Cart.id.desc()).first()


def delete_cart(db: Session,cart_id: int):
    # Check if the cart exists
    cart = db.query(Cart).filter(Cart.id == cart_id).first()
    if cart is None:
        raise HTTPException(status_code=404, detail="Cart not found")

    # Delete the related cart products
    db.execute(delete(CartProduct).where(CartProduct.cart_id == cart_id))

    # Delete the cart
    db.execute(delete(Cart).where(Cart.id == cart_id))

    # Commit the changes
    db.commit()
    

def get_carts(db: Session,current_user):
    # carts= db.query(Cart).offset(skip).limit(limit).all()
    carts_with_products = db.query(Cart).options(joinedload(Cart.cart_products)).all()
    
    return carts_with_products
    
    
    
    

def create_cart(db: Session, cart: Cart):
    db.add(cart)
    db.commit()
    db.refresh(cart)
    
    return cart
