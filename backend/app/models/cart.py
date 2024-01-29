from sqlalchemy import Column, Integer,ForeignKey, String,Boolean,Enum as EnumSQL
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import text
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy.orm import relationship
from enum import Enum

from passlib.context import CryptContext  # For password hashing
from app.core.database import Base
import app.models.cartProduct



class Cart(Base):
    __tablename__ = "carts"

    id = Column(Integer, primary_key=True)
    code = Column(String,unique=True)
    sum_price = Column(String)
    product_count = Column(Integer)
    owner_id = Column(Integer, ForeignKey("users.id"))

    cart_products = relationship("CartProduct", back_populates="cart")
    owner = relationship("User", back_populates="carts")
    
