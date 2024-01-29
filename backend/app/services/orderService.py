from sqlalchemy.orm import Session
from app.db.orderCrud import get_order,get_orders,create_order
from app.models.order import Order
from fastapi import Depends, FastAPI, HTTPException, status
from app.db.categoryCrud import get_category
from app.helpers.jwt import get_current_user
from app.models.user import User
from app.db.cartCrud import get_cart,delete_cart
from app.models.orderProduct import OrderProduct
from app.db.cartProductCrud import getCartProducts
from app.db.orderProductCrud import create_orderProduct
from datetime import datetime

def get_order_service(db: Session, category_id: int):
    return get_order(db, category_id)

def get_orders_service(db: Session,current_user:User, skip: int = 0, limit: int = 8):
    
    return get_orders(db, current_user,skip=skip, limit=limit)

def create_order_service(db: Session, order,current_user:User):
   
    if(order.cart_id <=0):
        raise HTTPException(status_code=403, detail="cart_id missing from body")
    
    # get last order that is active and belogs to current user
    
    cart = get_cart(db,order.cart_id)
    if(not cart):
        raise HTTPException(status_code=403, detail="cart does not set")
    
   
    # get cart and save order
    order_db = Order(
        code=cart.code,
        sum_price=cart.sum_price,
        product_count=cart.product_count,
        owner_id=cart.owner_id
    )
    savedOrder  = create_order(db,order_db)
    
    # get cartProducts and save orderProduct
    cartProducts = getCartProducts(db,cart.id)
    
    for product in cartProducts:
        productOrderObject = OrderProduct(
            name=product.name,
            image=product.image,
            price=product.price,
            count=product.count,
            category_id=product.category_id,
            order_id=savedOrder.id
        )
        orderProduct = create_orderProduct(db,productOrderObject)
    
    # remove cart and products
    delete_cart(db,order.cart_id)
    
    # return success response
    return {"success":True}
    
