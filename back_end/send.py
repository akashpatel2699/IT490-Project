import os
import time
import pika

MSG_USER=os.environ.get("MSG_USER")
MSG_PASS=os.environ.get("MSG_PASS")
HOST=os.environ.get("MESSAGING_HOST")

credentials = pika.PlainCredentials(MSG_USER,MSG_PASS)

parameters = pika.ConnectionParameters(HOST,5672,"/",credentials=credentials)

connection = pika.BlockingConnection(parameters=parameters)

channel = connection.channel()

channel.queue_declare(queue="hello")

channel.basic_publish(exchange="",routing_key="hello",body="Good morning, milestone 2 testing")

connection.close()
