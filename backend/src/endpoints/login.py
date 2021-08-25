import sqlalchemy
from sqlalchemy.orm import Session
from fastapi import Depends, APIRouter
from ..schemas.users import UserLogin
from ..orm_models.db_models import UserModel
from . import DBC
from src.logic.hasher import Hasher
from src.logic.jwt_handler import encode_auth_token


hasher = Hasher()
router = APIRouter()


@router.post("/api/v1/login")
def login_user_by_id(user: UserLogin, db: Session = Depends(DBC.get_session)):
    """
    GET login token for user
    :param user: UserLogin class
    :param db: DB session
    :return: Retrieved login token
    """
    try:
        retrieved_user = db.query(UserModel).filter(UserModel.email == user.email).one()
        if hasher.verify(user.password, retrieved_user.salt, str(retrieved_user.hashed_password)):
            token = encode_auth_token(retrieved_user.id, 1000)
            return {"jwt_token": token}
        else:
            return {"jwt_token": "wrong password"}

    except sqlalchemy.orm.exc.NoResultFound:
        raise Exception(f"{user.email} does not exist")
