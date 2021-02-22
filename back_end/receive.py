import pika 
import os
import time


MSG_USER=os.environ.get("MSG_USER")
MSG_PASS=os.environ.get("MSG_PASS")
HOST=os.environ.get("MESSAGING_HOST")

credentials = pika.PlainCredentials(MSG_USER,MSG_PASS)

parameters = pika.ConnectionParameters(HOST,5672,"/",credentials=credentials)

connection = pika.BlockingConnection(parameters=parameters)
channel = connection.channel()

channel.queue_declare(queue="hello")

def callback(channel, method, properties, body):
    print("Received %r" % body.decode())
channel.basic_consume(
    queue="hello", on_message_callback=callback, auto_ack=True)
print("Waiting for messages. To exit press CTRL+C")
channel.start_consuming()
