import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/')
@app.route('/<path:dummy>')
def page_not_found(dummy=None):
    return "<h1>Page Not found</h1>" 

app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=int(os.getenv('PORT', 8080)),
    debug=True
)
