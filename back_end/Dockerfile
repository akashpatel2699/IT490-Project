# Dockerfile, Image, Container

FROM python:3.7
WORKDIR /app
COPY . . 
RUN pip install pika
RUN apt-get install bash
CMD ["./run.sh"]