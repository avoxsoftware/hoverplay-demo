FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1
WORKDIR /app

COPY app/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy entire repository into the container so the `app` package is nested
# at /app/app which preserves the package layout for imports.
COPY . .

EXPOSE 5000
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
