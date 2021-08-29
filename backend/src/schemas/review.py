from pydantic import BaseModel
from datetime import datetime


class ReviewSchema(BaseModel):
    """
    Review database table schema
    It holds all column names and relationship to other tables
    """
    id: str
    expertize: float
    availability: float
    helpfulness: float
    comment: str
    created_at: datetime

    class Config:
        orm_mode = True
