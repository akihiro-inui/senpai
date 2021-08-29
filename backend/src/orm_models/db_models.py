from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import text, Column, VARCHAR, TIMESTAMP, ForeignKey, Integer, PrimaryKeyConstraint, Date, Float, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

BaseModel = declarative_base()
schema_name = "app"


class UserModel(BaseModel):
    """
    Define User database table ORM model
    """
    __table_args__ = {"schema": schema_name}
    __tablename__ = "user"

    # Register columns
    id = Column(UUID,
                unique=True,
                primary_key=True,
                index=True,
                server_default=text("gen_random_uuid()"))
    name = Column(VARCHAR(200), index=True)
    email = Column(VARCHAR(200), unique=True, index=True)
    gender = Column(VARCHAR)
    country = Column(VARCHAR)
    birth_date = Column(Date, unique=True, index=True)
    hashed_password = Column(VARCHAR, unique=True)
    is_senpai = Column(Boolean)
    salt = Column(VARCHAR, unique=True)
    password_reset_token = Column(VARCHAR(200))
    account_activation_token = Column(VARCHAR(200))
    created_at = Column(TIMESTAMP, default=func.now())
    PrimaryKeyConstraint(id, name="PK_users_id")


class CategoryModel(BaseModel):
    """
    Define Category database table ORM model
    """
    __table_args__ = {"schema": schema_name}
    __tablename__ = "category"

    # Register columns
    id = Column(UUID,
                unique=True,
                primary_key=True,
                index=True,
                server_default=text("gen_random_uuid()"))
    name = Column(VARCHAR(200), index=True)
    created_at = Column(TIMESTAMP, default=func.now())


class UserCategoryModel(BaseModel):
    """
    Define UserCategory database table ORM model
    """
    __table_args__ = {"schema": schema_name}
    __tablename__ = "user_category"

    # Register columns
    id = Column(UUID,
                unique=True,
                primary_key=True,
                index=True,
                server_default=text("gen_random_uuid()"))
    user_id = Column(ForeignKey(f"{schema_name}.user.id", name="FK_user_category_user_id"))
    category_id = Column(ForeignKey(f"{schema_name}.category.id", name="FK_user_category_category_id"))
    created_at = Column(TIMESTAMP, default=func.now())


class ReviewModel(BaseModel):
    """
    Define Review database table ORM model
    """
    __table_args__ = {"schema": schema_name}
    __tablename__ = "review"

    # Register columns
    id = Column(UUID,
                unique=True,
                primary_key=True,
                index=True,
                server_default=text("gen_random_uuid()"))
    expertize = Column(Float)
    availability = Column(Float)
    helpfulness = Column(Float)
    comment = Column(VARCHAR(8000))
    created_at = Column(TIMESTAMP, default=func.now())


class UserReviewModel(BaseModel):
    """
    Define UserReview database table ORM model
    """
    __table_args__ = {"schema": schema_name}
    __tablename__ = "user_review"

    # Register columns
    id = Column(UUID,
                unique=True,
                primary_key=True,
                index=True,
                server_default=text("gen_random_uuid()"))
    review_id = Column(ForeignKey(f"{schema_name}.review.id", name="FK_user_review_review_id"))
    user_id = Column(ForeignKey(f"{schema_name}.user.id", name="FK_user_review_user_id"))
    score = Column(Float)
    created_at = Column(TIMESTAMP, default=func.now())


class BadgeModel(BaseModel):
    """
    Define Badge database table ORM model
    """
    __table_args__ = {"schema": schema_name}
    __tablename__ = "badge"

    # Register columns
    id = Column(UUID,
                unique=True,
                primary_key=True,
                index=True,
                server_default=text("gen_random_uuid()"))
    name = Column(VARCHAR(200), index=True)
    created_at = Column(TIMESTAMP, default=func.now())
