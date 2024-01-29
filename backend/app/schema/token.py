from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str
    role:str | None


class TokenDataPost(BaseModel):
    username: str 
    password: str  
    
class TokenData(BaseModel):
    username: str 
    scopes: list[str] = []


class User(BaseModel):
    id: int
    email: str
    is_active: bool | None = None

    class Config:
        orm_mode = True


class UserInDB(User):
    hashed_password: str