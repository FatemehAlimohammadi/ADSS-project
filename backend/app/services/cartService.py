from sqlalchemy.orm import Session,joinedload
from app.db.cartCrud import get_cart,get_carts,create_cart,get_last_active_cart
from app.models.cart import Cart
from fastapi import Depends, FastAPI, HTTPException, status
from app.db.categoryCrud import get_category
from app.helpers.jwt import get_current_user
from app.models.user import User
from app.db.cartCrud import delete_cart
from app.db.productCrud import get_product
from app.schema.cart import CartProductCreateDTO
from datetime import datetime
from app.models.cartProduct import CartProduct
from app.helpers.string import generate_random_string
from app.db.cartProductCrud import create_cartProduct,isCartHasProductId,updateCartProduct,updateCartPrice

def get_cart_service(db: Session, category_id: int):
    return get_cart(db, category_id)

def get_carts_service(db: Session,current_user:User, skip: int = 0, limit: int = 8):
    
    return get_carts(db, current_user,skip=skip, limit=limit)


def delete_cart_service(db:Session,cart_id:int):
    delete_cart(db,cart_id)

def create_cart_service(db: Session, cart:CartProductCreateDTO ,current_user:User):
   
    if(cart.product_id <=0):
        raise HTTPException(status_code=403, detail="product_id missing from body")
    
    # check if product is exist
    product = get_product(db,cart.product_id)
    if not product:
        raise HTTPException(status_code=403, detail="product does not founded")
    
    # get last cart belongs to user that is active
    lastActiveCart = get_last_active_cart(db,current_user.id)
    cartIsUpdate=False
    
    
    
    sum_price= 0
    if product.price and cart.count:
            sum_price = int(product.price) * int(cart.count)
    
    # if cart does not exist create  new cart
    if not lastActiveCart:
        cartIsUpdate = True
        id 
        code  = generate_random_string()
        
        
        
        cartObject = Cart(code=code,sum_price=sum_price,product_count=cart.count,owner_id=current_user.id)
        lastActiveCart  = create_cart(db,cartObject)
        sum_price=0
    
    
    # is product for this cart exist? increment count of cartProduct record
    cartProduct = isCartHasProductId(db,lastActiveCart.id,cart.product_id)
    
    if cartIsUpdate==False:
        # update cart to new price
        newPrice = int(lastActiveCart.sum_price) +sum_price
        # newCount = lastActiveCart.product_count + cart.count
        updateCartPrice(db,lastActiveCart.id,newPrice,1)

    
    if cartProduct:
        count= cartProduct.count + cart.count
        # update count porduct for current basket store
        updateCartProduct(db,lastActiveCart.id,cart.product_id,count)
        
    else:    
        # save product for cart
        productCartObject = CartProduct(name=product.name,
            image=product.image,
            price=product.price,
            count=cart.count,
            category_id=product.category_id,
            cart_id=lastActiveCart.id
        )
    
        cartProduct = create_cartProduct(db,productCartObject)
    
    
    carts_with_products = db.query(Cart).options(joinedload(Cart.cart_products)).all()
    
    return carts_with_products

 
    
        

   
