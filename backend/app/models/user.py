from sqlalchemy import Column, Integer,Enum, String,Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import text
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy.orm import relationship
from app.models.cart import Cart
from app.models.order import Order
# from app.models.product import Product

from passlib.context import CryptContext  # For password hashing
from app.core.database import Base

from enum import Enum as PythonEnum

class UserRole(str, PythonEnum):
    client = "client"
    admin = "admin"
class UserGender(str, PythonEnum):
    male = "male"
    female = "female"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    lastName = Column(String)
    address = Column(String)
    gender = Column(Enum(UserGender))
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    role = Column(Enum(UserRole), default=UserRole.client)

    # products = relationship("Product", back_populates="owner")
    carts = relationship("Cart", back_populates="owner")
    orders = relationship("Order", back_populates="owner")
    
    
    
    
    
    
def get_user_by_username(session: Session, username: str):
    return session.query(User).filter(User.email == username).first()