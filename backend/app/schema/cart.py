from typing import Optional

from pydantic import BaseModel


class CartDelete(BaseModel):
    cart_id : int

class CartCreate(BaseModel):
    product_id : int
    count: int

    
class CartProductCreateDTO:
   def __init__(self,product_id:int,count:int):
        self.product_id = product_id
        self.count = count
        
    
    
    

class CartResponse(BaseModel):
    id: int
    name: str
    category_id : int
    name: str
    image: str
    price: str
    description: str | None
    category_id: int

    class Config:
        orm_mode = True