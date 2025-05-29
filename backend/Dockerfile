FROM python:3.12-slim

RUN apt-get update && apt-get install -y netcat && apt-get clean

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chmod +x /app/entrypoint.sh

CMD ["/app/entrypoint.sh"]
