from sqlalchemy import Column, Integer, String,Boolean,ForeignKey,DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import text
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy.orm import relationship

from passlib.context import CryptContext  # For password hashing
from app.core.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, index=True)
    image = Column(String)
    price = Column(String)
    
    description = Column(String,default='')
    
    # date = Column(DateTime,default='')
    is_active = Column(Boolean, default=True)

    category_id = Column(Integer, ForeignKey("categories.id"))
    category = relationship("Category", back_populates="products")

    # owner_id = Column(Integer, ForeignKey("users.id"))
    # owner = relationship("User", back_populates="products")
    
    
    
