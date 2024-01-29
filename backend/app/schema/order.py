from typing import Optional

from pydantic import BaseModel

class OrderCreate(BaseModel):
    cart_id:int

    
    

class OrderResponse(BaseModel):
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