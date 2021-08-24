import os
import sys
sys.path.insert(0, os.getcwd())

from sqlalchemy import MetaData
from sqlalchemy import create_engine
from sqlalchemy.schema import CreateSchema
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, create_database
from src.utils.custom_error_handlers import DBError
from src.utils.common_logger import logger
from src.settings import load_config
from src.orm_models.db_models import BaseModel


class DBConnector:
    def __init__(self):
        self.Meta = MetaData()
        self.__check_config()
        self.__init_db()
        self.__init_schemas()
        self.__initialize_tables()
        self.__init_session_maker()

    def __check_config(self):
        # Load parameters from .ENV
        if os.path.isfile('.ENV'):
            load_config('.ENV')

        self.DB_USER = os.environ.get('DB_USER')
        self.DB_PASSWORD = os.environ.get('DB_PASSWORD')
        self.DB_HOST = os.environ.get('DB_HOST')
        self.DB_PORT = os.environ.get('DB_PORT')
        self.DB_NAME = os.environ.get('DB_NAME')
        self.DB_SCHEMAS = os.environ.get('DB_SCHEMAS').split()

        # Check required fields exist
        if None in [os.environ.get('DB_USER'),
                    os.environ.get('DB_PASSWORD'),
                    os.environ.get('DB_HOST'),
                    os.environ.get('DB_PORT'),
                    os.environ.get('DB_NAME'),
                    os.environ.get('DB_SCHEMAS')]:
            logger.error("Could not retrieve DB config")
            raise DBError("Could not retrieve DB config")

        # Create connection string
        self.connection_string = f"postgresql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}/{self.DB_NAME}"

    def __init_db(self):
        """
        Create SQLAlchemy DB connector engine and create database if it does not exist
        """
        self.engine = create_engine(self.connection_string)

        # Create database if it does not exist
        if not database_exists(self.engine.url):
            try:
                create_database(self.engine.url)
                logger.info("Successfully created database")
            except Exception as err:
                raise DBError(f"Failed to create database: {err}")
        else:
            logger.info("Database already exists. Skipping")

    def __init_schemas(self):
        """
        Create SQLAlchemy DB connector engine and create schemas if they not exist
        """
        self.engine = create_engine(self.connection_string)
        existing_schemas = self.engine.dialect.get_schema_names(self.engine)
        for schema in self.DB_SCHEMAS:
            if schema not in existing_schemas:
                try:
                    self.engine.execute(CreateSchema(schema))
                    logger.info(f"Successfully created schema: {schema}")
                except Exception as err:
                    raise DBError(f"Failed to create schema: {schema}: {err}")
            else:
                logger.info(f"Schema {schema} already exists. Skipping")

    def __initialize_tables(self):
        """
       Create SQLAlchemy DB connector engine and create tables
        """
        try:
            for (table_name, table) in BaseModel.metadata.tables.items():
                self.Meta._add_table(table_name, table.schema, table)
            self.Meta.create_all(self.engine)
            logger.info(f"Successfully created tables")
        except Exception as err:
            raise DBError(message=f"Failed to create tables: {err}")

    def __init_session_maker(self):
        """
        Create DB session maker
        """
        try:
            self.Session = sessionmaker(bind=self.engine)
        except Exception as err:
            raise DBError(f"Failed to create database session {err}")

    def get_session(self):
        """
        Get DB session
        :return: Session
        """
        session = self.Session()
        try:
            yield session
            session.commit()
        except Exception:
            session.rollback()
        finally:
            session.close()
