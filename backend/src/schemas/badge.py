from pydantic import BaseModel
from datetime import datetime


class BadgeSchema(BaseModel):
    """
    Badge database table schema
    It holds all column names and relationship to other tables
    """
    id: str
    name: str
    created_at: datetime

    class Config:
        orm_mode = True
