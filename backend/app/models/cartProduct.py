from sqlalchemy import Column, Integer,ForeignKey, String,Boolean,Enum as EnumSQL
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import text
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy.orm import relationship
from enum import Enum

from passlib.context import CryptContext  # For password hashing
from app.core.database import Base


class CartProduct(Base):
    __tablename__ = "cartProducts"

    id = Column(Integer, primary_key=True)
    name = Column(String,  index=True)
    image = Column(String)
    count = Column(Integer, default=0)
    price = Column(String)
    
    # date = Column(DateTime,default='')
  
    category_id = Column(Integer, ForeignKey("categories.id"))
    category = relationship("Category", back_populates="cartProducts")

    cart_id = Column(Integer, ForeignKey("carts.id"))
    cart = relationship("Cart", back_populates="cart_products")
    

