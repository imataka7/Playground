FROM python:3.7-slim

WORKDIR /app

COPY ./src/requirements.txt /app

RUN pip install --trusted-host pypi.python.org -r requirements.txt

COPY ./src /app

EXPOSE 8080

ENV NAME World

CMD ["python", "app.py"]