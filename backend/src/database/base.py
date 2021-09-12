import os
import sys
sys.path.insert(0, os.getcwd())

import pkg_resources
from sqlalchemy import MetaData
from sqlalchemy import create_engine
from sqlalchemy.schema import CreateSchema
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, create_database
from alembic.config import Config
from alembic.command import upgrade, downgrade
from src.utils.custom_error_handlers import DBError
from src.utils.common_logger import logger
from src.settings import load_config
from src.orm_models.db_models import BaseModel


class DBConnector:
    def __init__(self):
        self.__check_config()
        self.engine = create_engine(self.connection_string)
        self.Meta = MetaData()
        self.__init_session_maker()

    def _initialize_db(self):
        """
        Initialize database
        Case A. Create database if it does not exist -> Create schemas and tables
        Case B. If database already exists -> Upgrade database schema, tables
        """
        try:
            # Create or upgrade DB
            is_created = self._create_db() if database_exists(self.engine.url) is False else self._upgrade_db()

            # Create schemas and tables only if database was created for the first time
            if is_created is True:
                self._create_schemas()
                self._create_tables()
        except Exception as err:
            raise DBError(message=f"Failed to initialize database: {err}")

    def __check_config(self):
        """
        Check the database parameter was given from environment variable or from file.
        Create connection string to the database.
        """
        # Load parameters from .ENV
        if os.path.isfile('.ENV'):
            load_config('.ENV')

        self.DB_USER = os.environ.get('MENTOR_DB_USER')
        self.DB_PASSWORD = os.environ.get('MENTOR_DB_PASSWORD')
        self.DB_HOST = os.environ.get('MENTOR_DB_HOST')
        self.DB_PORT = os.environ.get('MENTOR_DB_PORT')
        self.DB_NAME = os.environ.get('MENTOR_DB_NAME')
        self.DB_SCHEMAS = os.environ.get('MENTOR_DB_SCHEMAS').split()

        # Check required fields exist
        if None in [self.DB_USER,
                    self.DB_PASSWORD,
                    self.DB_HOST,
                    self.DB_PORT,
                    self.DB_NAME,
                    self.DB_SCHEMAS]:
            logger.error("Could not retrieve DB config")
            raise DBError("Could not retrieve DB config")

        # Create connection string
        self.connection_string = f"postgresql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}/{self.DB_NAME}"

    def _create_db(self) -> bool:
        """
        Create SQLAlchemy DB connector engine and create database
        """
        # Create database if it does not exist
        success = False
        try:
            create_database(self.engine.url)
            logger.info("Successfully created database")
            success = True
        except Exception as err:
            success = False
            raise DBError(f"Failed to create database: {err}")
        finally:
            return success

    def _create_schemas(self):
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

    def _create_tables(self):
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

    @staticmethod
    def _upgrade_db() -> None:
        """
        Executes Alembic update based on the file content of src/alembic/versions/{the_most_recent_version.py}
        """
        try:
            alembic_file_path = pkg_resources.resource_filename("src", "alembic.ini")
            upgrade(Config(alembic_file_path), "head")
            logger.info("Successfully upgraded DB to alembic head")
        except Exception as err:
            raise DBError(message=f"Failed to upgrade DB: {err}")

    @staticmethod
    def _downgrade_db():
        """
        Executes Alembic downgrade based on the file content of src/alembic/versions/{the_most_recent_version.py}
        """
        try:
            filepath = pkg_resources.resource_filename("src", "alembic.ini")
            downgrade(Config(filepath), "base")
            logger.info("Successfully downgraded DB to alembic base")
        except Exception as err:
            raise DBError(message=f"Failed to upgrade DB: {err}")

    def get_session(self):
        """
        Get DB session
        :return: Session
        """
        session = self.Session()
        try:
            yield session
            session.commit()
        except Exception as err:
            session.rollback()
            raise DBError(f"{err}")
        finally:
            session.close()


if __name__ == "__main__":
    DBC = DBConnector()
    DBC._initialize_db()