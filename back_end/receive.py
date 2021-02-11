"""
import pika

parameters = pika.URLParameters('amqp://guest:guest@localhost:5672/%2f')
connection = pika.BlockingConnection(parameters)
channel = connection.channel()
#calling the channel and passing the queue name
channel.queue_declare(queue='test-queue')

# method, properties, body = channel.basic_get('test-queue')
# if method:
#     print(method, properties, body)
#     channel.basic_ack(method.delivery_tag)
# else:
#     print("No messasge returned")

def callback(channel, method, properties, body):
    print("Received %r" % body)
channel.basic_consume(
    queue='test-queue', on_message_callback=callback, auto_ack=True)
print("Waiting for messages. To exit press CTRL+C")
channel.start_consuming()
"""

import pika 
import os
import time


MSG_USER=os.environ.get("MSG_USER")
MSG_PASS=os.environ.get("MSG_PASS")
#NAME=os.environ.get("TEST")
HOST=os.environ.get("MESSAGING_HOST")

credentials = pika.PlainCredentials(MSG_USER,MSG_PASS)

parameters = pika.ConnectionParameters(HOST,5672,"/",credentials=credentials)

connection = pika.BlockingConnection(parameters=parameters)
channel = connection.channel()

channel.queue_declare(queue="hello")

def callback(channel, method, properties, body):
    print("Received %r" % body)
channel.basic_consume(
    queue="hello", on_message_callback=callback, auto_ack=True)
print("Waiting for messages. To exit press CTRL+C")
channel.start_consuming()