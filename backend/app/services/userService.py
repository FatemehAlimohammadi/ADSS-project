from sqlalchemy.orm import Session
from app.db import create_user,get_user,get_users
from app.models.user import User
from app.helpers.hash import get_password_hash


def get_user_service(db: Session, user_id: int):
    return get_user(db, user_id)

def get_users_service(db: Session, skip: int = 0, limit: int = 10):
    return get_users(db, skip=skip, limit=limit)

def create_user_service(db: Session, user: User):
    hashed_password = get_password_hash(user.password)
    # db_user = User(email=user.email, hashed_password=hashed_password,name=user.name,lastName = user.lastName,gender = user.gender,address=user.address,role='admin')
    db_user = User(email=user.email, hashed_password=hashed_password,name=user.name,lastName = user.lastName,gender = user.gender,address=user.address)

    return create_user(db, db_user)
