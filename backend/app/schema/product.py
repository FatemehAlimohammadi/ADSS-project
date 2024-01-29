from typing import Optional

from pydantic import BaseModel

class ProductCreate(BaseModel):
    name: str
    category_id : int
    name: str
    image: str
    price: str
    description: Optional[str] = ''  # Optional with a default value

    is_active: Optional[bool] = True  # Optional with a default value
    
    category_id: int
    

class ProductResponse(BaseModel):
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