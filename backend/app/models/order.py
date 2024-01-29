from sqlalchemy import Column, Integer, String,ForeignKey,Boolean,Enum as EnumSQL
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import text
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy.orm import relationship
from enum import Enum
import app.models.orderProduct
from passlib.context import CryptContext  # For password hashing
from app.core.database import Base




class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    code = Column(String,unique=True)
    sum_price = Column(String)
    product_count = Column(Integer)

    order_products = relationship("OrderProduct", back_populates="order")



    owner_id = Column(Integer, ForeignKey("users.id"))
    
    owner = relationship("User", back_populates="orders")
    
