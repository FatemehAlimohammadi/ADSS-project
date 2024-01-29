from sqlalchemy import Column, Integer,ForeignKey, String,Boolean,Enum as EnumSQL
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import text
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy.orm import relationship
from enum import Enum

from passlib.context import CryptContext  # For password hashing
from app.core.database import Base




class OrderProduct(Base):
    __tablename__ = "orderProducts"

    id = Column(Integer, primary_key=True)
    name = Column(String,  index=True)
    image = Column(String)
    price = Column(String)
    count = Column(Integer, default=0)
    
    # date = Column(DateTime,default='')

    category_id = Column(Integer, ForeignKey("categories.id"))
    category = relationship("Category", back_populates="orderProducts")

    order_id = Column(Integer, ForeignKey("orders.id"))
    order = relationship("Order", back_populates="order_products")
    
