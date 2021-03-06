import os
import sys
sys.path.insert(0, os.getcwd())

import uvicorn
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from src.endpoints import docs, users, login
from src.utils.common_logger import logger
from src.database.base import DBConnector
from src.utils.custom_error_handlers import BaseSystemError, DataNotFoundError, PydanticError

# Initialize DB
DBC = DBConnector()
DBC._initialize_db()

# Create API Application
app = FastAPI()


@app.exception_handler(DataNotFoundError)
async def validation_exception_handler(request, err):
    return JSONResponse(status_code=404,
                        content={"message": "Requested data was not found",
                                 "detail": f"{err}",
                                 "data": None})


@app.exception_handler(PydanticError)
async def validation_exception_handler(request, err):
    base_error_message = f"Failed to execute: {request.method}: {request.url}"
    logger.error(base_error_message)
    return JSONResponse(status_code=400,
                        content={"message": f"{base_error_message}: Error in data format", "detail": f"{err}"})


@app.exception_handler(BaseSystemError)
async def unknown_exception_handler(request, err):
    base_error_message = f"Unknown error. Failed to execute: {request.method}: {request.url}"
    logger.error(base_error_message)
    return JSONResponse(status_code=400, content={"message": f"{base_error_message}", "detail": f"{err}"})


# Add endpoints
app.include_router(docs.router)
app.include_router(users.router)
app.include_router(login.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5000, log_level="info", reload=True)
