from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from datetime import date


class UserSchema(BaseModel):
    """
    Users database table schema
    It holds all column names and relationship to other tables
    """
    id: int
    name: str
    email: str
    gender: str
    country: str
    hashed_password: str
    birthdate: date
    salt: str
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
    birthdate: Optional[date]


class UserUpdate(BaseModel):
    """
    Fields information needed for Update
    """
    id: Optional[int]
    name: Optional[str]
    email: str
    gender: Optional[str]
    country: Optional[str]
    birthdate: Optional[date]
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
    id: int
    email: str
