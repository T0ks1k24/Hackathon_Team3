FROM python:3.12-slim

RUN sudo apt-get update && sudo apt-get install -y netcat && sudo apt-get clean

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chmod +x /app/entrypoint.sh

CMD ["/app/entrypoint.sh"]
