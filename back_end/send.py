"""
import pika
import os
import time

time.sleep(20)
HOST=os.environ.get("MESSAGING_HOST")
parameters = pika.URLParameters('amqp://guest:guest@{}:5672/%2f'.format(HOST))
connection = pika.BlockingConnection(parameters)
channel = connection.channel()
#calling the channel and passing the queue name
channel.queue_declare(queue='test-queue')

channel.basic_publish('',
                        'test-queue',
                        'message body',
                        pika.BasicProperties(content_type='text/plain',
                                          delivery_mode=1))

#channel.basic_publish(exchange="", routing_key="test-queue", body="Hello World")
connection.close()
"""
import pika 
import os
import time

time.sleep(45)
MSG_USER=os.environ.get("MSG_USER")
MSG_PASS=os.environ.get("MSG_PASS")
#NAME=os.environ.get("TEST")
HOST=os.environ.get("MESSAGING_HOST")

credentials = pika.PlainCredentials(MSG_USER,MSG_PASS)

parameters = pika.ConnectionParameters(HOST,5672,"/",credentials=credentials)

connection = pika.BlockingConnection(parameters=parameters)

channel = connection.channel()

channel.queue_declare(queue="hello")

channel.basic_publish(exchange="",routing_key="hello",body="Hello World")

connection.close()