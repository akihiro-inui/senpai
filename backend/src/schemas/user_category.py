from pydantic import BaseModel
from datetime import datetime


class UserCategorySchema(BaseModel):
    """
    UserCategory database table schema
    It holds all column names and relationship to other tables
    """
    id: str
    user_id: str
    category_id: str
    created_at: datetime

    class Config:
        orm_mode = True
