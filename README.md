# SENPAI

# What is SENPAI?
It is secret for now

# Local setup
Run PostgreSQL database locally
```
docker run --name senpai-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=senpai -p 5432:5432 -d postgres
```

Run backend
``` 
cd backend && python src/main.py
```

Run frontend
```
cd frontend && npm build && npm start
```


Have fun!