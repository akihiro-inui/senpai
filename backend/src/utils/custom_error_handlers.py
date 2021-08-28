from src.utils.common_logger import logger


class BaseSystemError(Exception):
    def __init__(self, message, status_code=400):
        self.message = message
        self.status_code = status_code
        logger.error(message)

    def __str__(self):
        return self.message


class PydanticError(Exception):
    def __init__(self, message):
        super().__init__(message)


class ConfigError(Exception):
    def __init__(self, message):
        super().__init__(message)


class DBError(Exception):
    def __init__(self, message):
        super().__init__(message)


class DataNotFoundError(Exception):
    def __init__(self, message=404):
        super().__init__(message)
