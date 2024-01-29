
from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str
    gender: str
    name: str
    lastName: str
    address: str

class UserResponse(BaseModel):
    id: int
    email: str
    gender: str
    name: str
    lastName: str
    address: str
    role:str

    class Config:
        orm_mode = True