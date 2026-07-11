FROM python:3.12-alpine
WORKDIR /app
COPY . .
ENV PORT=8080 FALP_DANE=/app/dane
EXPOSE 8080
CMD ["python3", "serwer.py"]
