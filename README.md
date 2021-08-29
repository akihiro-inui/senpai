# SENPAI

## What is Senpai?
TBD

# Developers Note

## How to launch test local database
```
docker run --name senpai-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=senpai -p 5432:5432 -d postgres
```

## How to run API
Manually,
``` 
cd backend && pip install -r requirements.txt && &python src/main.py
```
with Docker,
``` 
TODO
```

## How to run Frontend application
Manually,
```
cd frontend && npm build && npm start
```
with Docker,
```
TODO
```

## How to make changes in DB schema, tables
1. Make the change in `orm_models/db_models.py` (e.g. Add table, change column name etc..)  
2. Make the change in `shemas/{table_name}.py`  
3. Generate Alembic file by running this command  
`alembic -c src/alembic.ini revision --autogenerate -m "{Your change description}"`
4. Revise the generated file under `src/alembic/versions/{generated_file}.py`
5. Push the version file together with other changes to GitHub