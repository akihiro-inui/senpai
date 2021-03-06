# Mentor

## What is Mentor?
TBD

# Developers Note

## How to launch test local database
```
docker run --name mentor-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres  -p 5432:5432 -d postgres
```

## How to run Backend API
Manually,
``` 
cd backend && pip install -r requirements.txt && &python src/main.py
```

## How to run Frontend application
Manually,
```
cd frontend && npm build && npm start
```

## Run whole app with docker compose
1. Make a file called .ENV in your project root folder

2. Build images
```
docker-compose build
```

3. Run containers
```
docker-compose --env-file .ENV up -d
```

## How to make changes in DB schema, tables
1. Make the change in `orm_models/db_models.py` (e.g. Add table, change column name etc..)  
2. Make the change in `shemas/{table_name}.py`  
3. Generate Alembic file by running this command  
`alembic -c src/alembic.ini revision --autogenerate -m "{Your change description}"`
4. Revise the generated file under `src/alembic/versions/{generated_file}.py`
5. Push the version file together with other changes to GitHub