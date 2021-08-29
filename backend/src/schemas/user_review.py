from pydantic import BaseModel
from datetime import datetime


class UserReviewSchema(BaseModel):
    """
    UserReview database table schema
    It holds all column names and relationship to other tables
    """
    id: str
    review_id: str
    user_id: str
    score: float
    created_at: datetime

    class Config:
        orm_mode = True
