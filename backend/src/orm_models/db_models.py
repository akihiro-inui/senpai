from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, VARCHAR, TIMESTAMP, ForeignKey, Integer, PrimaryKeyConstraint, VARBINARY, Date, Float
from sqlalchemy.sql import func

BaseModel = declarative_base()
schema_name = "app"


class UserModel(BaseModel):
    """
    Define Users database table ORM model
    """
    __table_args__ = {"schema": schema_name}
    __tablename__ = "users"

    # Register columns
    id = Column(Integer, unique=True, primary_key=True, index=True, autoincrement=True)
    name = Column(VARCHAR, index=True)
    email = Column(VARCHAR, unique=True, index=True)
    gender = Column(VARCHAR)
    country = Column(VARCHAR)
    birthdate = Column(Date, unique=True, index=True)
    hashed_password = Column(VARCHAR, unique=True)
    salt = Column(VARCHAR, unique=True)
    created_at = Column(TIMESTAMP, default=func.now())
    PrimaryKeyConstraint(id, name="PK_users_id")


class BadgesModel(BaseModel):
    """
    Define Badges database table ORM model
    """
    __table_args__ = {"schema": schema_name}
    __tablename__ = "badges"

    # Register columns
    id = Column(Integer, unique=True, primary_key=True, index=True, autoincrement=True)
    name = Column(VARCHAR(200), index=True)
    created_at = Column(TIMESTAMP, default=func.now())
