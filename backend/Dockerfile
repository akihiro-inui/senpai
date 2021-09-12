FROM python:3.8

EXPOSE 5000

COPY . .

ENV MENTOR_DB_HOST=$MENTOR_DB_HOST
ENV MENTOR_DB_PASSWORD=$MENTOR_DB_PASSWORD
ENV MENTOR_DB_USER=$MENTOR_DB_USER
ENV MENTOR_DB_NAME=$MENTOR_DB_NAME
ENV MENTOR_DB_PORT=$MENTOR_DB_PORT

RUN apt-get update
RUN apt-get install unixodbc-dev -y
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "5000"]