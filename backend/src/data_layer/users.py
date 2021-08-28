from typing import List
from pydantic.error_wrappers import ValidationError
from sqlalchemy.orm import Session
from sqlalchemy.orm.exc import NoResultFound
from fastapi import Depends
from ..orm_models.db_models import UserModel
from ..schemas.users import UserGet, UserUpdate
from src.utils.custom_error_handlers import DataNotFoundError, PydanticError
from . import DBC


def get_all_users_from_db(db: Session = Depends(DBC.get_session)) -> List[UserGet]:
    """
    Get all users
    :param db: DB session
    :return: List of UserGet
    """
    try:
        users = db.query(UserModel).all()
        return [UserGet(id=user.id, email=user.email) for user in users]
    except NoResultFound:
        raise DataNotFoundError("No users were found")
    except ValidationError:
        raise PydanticError("Wrong Pydantic data format when retrieving user")
    except Exception as err:
        raise err


def get_user_by_email_from_db(user_email: str, db: Session = Depends(DBC.get_session)) -> UserGet:
    """
    Get one user by email
    :param user_email: User email
    :param db: DB session
    :return: One UserMinimum
    """
    try:
        user = db.query(UserModel).filter(UserModel.email == user_email).one()
        return UserGet(id=user.id, email=user.email)
    except NoResultFound:
        raise DataNotFoundError("Could not find the user from given email")
    except ValidationError:
        raise PydanticError("Wrong Pydantic data format when retrieving user")
    except Exception as err:
        raise err


def create_user_in_db(user: UserModel, db_session: Session = Depends(DBC.get_session)):
    """
    Create one user
    :param user: UserModel
    :param db_session: DB session
    """
    try:
        db_session.add(user)
        db_session.commit()
        db_session.refresh(user)
    except ValidationError:
        raise PydanticError("Wrong Pydantic data format when retrieving user")
    except Exception as err:
        raise err


def update_user_in_db(user: UserUpdate, db_session: Session = Depends(DBC.get_session)):
    """
    Update one user
    :param user: UserUpdate
    :param db_session: DB session
    """
    try:
        # Get user by ID
        user_to_put = db_session.query(UserModel).filter(UserModel.email == user.email).one()

        # Update model class variable for requested fields
        for var, value in vars(user).items():
            setattr(user_to_put, var, value) if value else None

        # Commit to DB
        db_session.add(user_to_put)
        db_session.commit()
        db_session.refresh(user_to_put)
    except NoResultFound:
        raise DataNotFoundError("Could not find the user from given email")
    except ValidationError:
        raise PydanticError("Wrong Pydantic data format when retrieving user")
    except Exception as err:
        raise err


def delete_user_from_db(user_email: str, db_session: Session = Depends(DBC.get_session)):
    """
    Delete one user by email
    :param user_email: User email
    :param db_session: DB session
    """
    try:
        # Delete entry
        affected_rows = db_session.query(UserModel).filter(UserModel.email == user_email).delete()
        if not affected_rows:
            raise NoResultFound
        # Commit to DB
        db_session.commit()
    except NoResultFound:
        raise DataNotFoundError("Could not find the user from given email")
    except ValidationError:
        raise PydanticError("Wrong Pydantic data format when retrieving user")
    except Exception as err:
        raise err

