from sqlalchemy import Column, Integer, String,Boolean,Enum as EnumSQL
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import text
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy.orm import relationship
from enum import Enum

from passlib.context import CryptContext  # For password hashing
from app.core.database import Base



class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, index=True)
    description = Column(String,default='')
    is_active = Column(Boolean, default=True)

    products = relationship("Product", back_populates="category")
    cart_products = relationship("CartProduct", back_populates="category")
    cartProducts = relationship("CartProduct", back_populates="category")
    orderProducts = relationship("OrderProduct", back_populates="category")