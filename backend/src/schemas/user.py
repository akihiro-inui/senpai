from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from datetime import date


class UserSchema(BaseModel):
    """
    User database table schema
    It holds all column names and relationship to other tables
    """
    id: str
    name: str
    email: str
    gender: str
    country: str
    hashed_password: str
    birth_date: date
    salt: str
    password_reset_token: str
    account_activation_token: str
    created_at: datetime

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    """
    Fields information needed for POST
    """
    name: str
    email: str
    gender: Optional[str]
    country: Optional[str]
    password: str
    birth_date: Optional[date]


class UserUpdate(BaseModel):
    """
    Fields information needed for Update
    """
    id: Optional[str]
    name: Optional[str]
    email: str
    gender: Optional[str]
    country: Optional[str]
    birth_date: Optional[date]
    salt: Optional[str]


class UserDelete(BaseModel):
    """
    Fields information needed for Delete
    """
    email: str


class UserLogin(BaseModel):
    email: str
    password: str


class UserGet(BaseModel):
    id: str
    email: str
