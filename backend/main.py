from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict

app = FastAPI()

class Product(BaseModel):
    name: str
    quantity: int

shopping_cart: Dict[int, Product] = {}

@app.post('/add-to-cart/{product_id}')
def add_to_cart(product_id: int, product: Product):
    if product_id in shopping_cart:
        shopping_cart[product_id].quantity += product.quantity
    else:
        shopping_cart[product_id] = product
    return shopping_cart[product_id]

@app.get('/view-cart/{user_id}')
def view_cart(user_id: int):
    if user_id not in shopping_cart:
        raise HTTPException(status_code=404, detail="User not found")
    return shopping_cart[user_id]

@app.put('/update-cart/{product_id}')
def update_cart(product_id: int, product: Product):
    if product_id in shopping_cart:
        shopping_cart[product_id] = product
        return shopping_cart[product_id]
    else:
        raise HTTPException(status_code=404, detail="Product not found in the cart.")

@app.delete('/remove-from-cart/{product_id}')
def remove_from_cart(product_id: int):
    if product_id in shopping_cart:
        removed_product = shopping_cart.pop(product_id)
        return {'message': 'Product removed from the cart', 'removed_product': removed_product}
    else:
        raise HTTPException(status_code=404, detail="Product not found in the cart.")
