FROM python:3.12-slim
RUN apt-get update && apt-get install -y openssl ca-certificates libssl-dev
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
CMD ["python", "src/auth.py"]
