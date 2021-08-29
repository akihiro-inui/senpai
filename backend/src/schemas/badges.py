from pydantic import BaseModel
from datetime import datetime


class BadgesSchema(BaseModel):
    """
    Badges database table schema
    It holds all column names and relationship to other tables
    """
    id: int
    name: str
    created_at: datetime

    class Config:
        orm_mode = True
