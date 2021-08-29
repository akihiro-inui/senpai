import os
import sys

sys.path.insert(0, os.getcwd())
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
from src.orm_models.db_models import BaseModel
from src.settings import load_config

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.attributes.get("configure_logger", True):
    fileConfig(config.config_file_name, disable_existing_loggers=False)


# Add BaseModel per schema
target_metadata = [BaseModel.metadata]


def get_url() -> str:
    """
    Create connection string for PostgreSQL database
    :return: Connection string
    """
    load_config(".ENV")
    host = os.environ.get("SENPAI_DB_HOST")
    db = os.environ.get("SENPAI_DB_NAME")
    user = os.environ.get("SENPAI_DB_USER")
    password = os.environ.get("SENPAI_DB_PASSWORD")
    port = os.environ.get("SENPAI_DB_PORT")
    return f"postgresql://{user}:{password}@{host}:{port}/{db}"


# add your model's MetaData object here
# for 'autogenerate' support
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata


# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def run_migrations_offline():
    """Run migrations in 'offline' mode.
    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.
    Calls to context.execute() here emit the given string to the
    script output.
    """
    url = get_url()
    context.configure(
        url=url, target_metadata=target_metadata, literal_binds=True, compare_type=True
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode.
    In this scenario we need to create an Engine
    and associate a connection with the context.
    """
    configuration = config.get_section(config.config_ini_section)
    configuration["sqlalchemy.url"] = get_url()
    connectable = engine_from_config(
        configuration,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            include_schemas=True,
            compare_type=True,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
