from typing import List
from sqlalchemy.orm import Session
from fastapi import Depends, APIRouter, Response
from ..schemas.user import UserCreate, UserUpdate, UserGet
from src.data_layer.user import get_all_users_from_db, get_user_by_email_from_db, create_user_in_db, update_user_in_db, delete_user_from_db
from ..orm_models.db_models import UserModel
from . import DBC
from . import hasher

router = APIRouter()


@router.get("/user", response_model=List[UserGet])
def get_all_users_endpoint(db_session: Session = Depends(DBC.get_session)):
    """
    GET all users
    :param db_session: DB session
    :return: All user entries
    """
    return Response(status_code=200, content=get_all_users_from_db(db_session))


@router.get("/user/email/{user_email}", response_model=UserGet)
def get_one_user_by_email_endpoint(user_email: str, db_session: Session = Depends(DBC.get_session)):
    """
    GET one user by name
    :param user_email: User email to get
    :param db_session: DB session
    :return: Retrieved user entry
    """
    # Get user by name
    return Response(status_code=200, content=get_user_by_email_from_db(user_email, db_session))


@router.post("/api/v1/user")
def post_one_user_endpoint(user: UserCreate, db_session: Session = Depends(DBC.get_session)):
    """
    POST one user
    It reads parameters from the request field and add missing fields from default values defined in the model
    :param user: UserBase class that contains all columns in the table
    :param db_session: DB session
    :return: Created user entry
    """
    user_args = user.dict()
    # Create hashed password
    user_args["hashed_password"], user_args["salt"] = hasher.hash(user.password)

    # Create User Model
    del user_args['password']
    user_model = UserModel(**user_args)

    # Commit to DB
    create_user_in_db(user_model, db_session)
    return {"message": "Successfully created user"}


@router.put("/user")
def put_one_user_endpoint(user: UserUpdate, db_session: Session = Depends(DBC.get_session)):
    """
    PUT one user
    It reads parameters from the request field and update finds the entry and update it
    :param user: UserUpdate class that contains requested field to update
    :param db_session: DB session
    :return: Updated user entry
    """
    update_user_in_db(user, db_session)
    return Response(status_code=200, content={"message": "Successfully updated user"})


@router.delete("/user/email/{user_email}")
def delete_one_user_by_email_endpoint(user_email: str, db_session: Session = Depends(DBC.get_session)):
    """
    DELETE one user by ID
    It reads parameters from the request field, finds the entry and delete it
    :param user_email: User ID to delete
    :param db_session: DB session
    :return: Deleted user entry
    """
    delete_user_from_db(user_email, db_session)
    return Response(status_code=200, content={"message": "Successfully deleted user"})
