from flask import Flask, render_template, request, session, redirect
from functools import wraps
from werkzeug.security import check_password_hash, generate_password_hash
import logging
import messaging
import os

app = Flask(__name__)
app.secret_key = os.environ["FLASK_SECRET_KEY"]

logging.basicConfig(level=logging.INFO)

# tag::login_required[]
def login_required(f):
    """
    Decorator that returns a redirect if session['email'] is not set
    """

    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "email" not in session:
            return redirect("/login")
        return f(*args, **kwargs)

    return decorated_function


# end::login_required[]


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        print(email, password)
        msg = messaging.Messaging()
        msg.send("GETHASH", {"email": email})
        response = msg.receive()
        try:
            if response["success"] != True:
                return "Login failed."
            if check_password_hash(response["hash"], password):
                session["email"] = email
                return redirect("/")
            else:
                return "Login failed."
        except:
            pass
    return render_template("login.html")


@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        first_name = request.form["first_name"]
        last_name = request.form["last_name"]
        email = request.form["email"]
        password = request.form["password"]
        print(first_name, last_name, email, password)
        msg = messaging.Messaging()
        msg.send(
            "REGISTER",
            {
                "email": email,
                "hash": generate_password_hash(password),
                "first_name": first_name,
                "last_name": last_name,
            },
        )
        response = msg.receive()
        try:
            if response["success"]:
                session["email"] = email
                return redirect("/")
            else:
                return f"{response['message']}"
        except:
            pass
    return render_template("signup.html")


@app.route("/about")
def about():
    return render_template("about.html")


"""
@app.route("/secret")
@login_required
def secret():
    return render_template("secret.html")
"""

# tag::register[]
"""@app.route("/singup", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        msg = messaging.Messaging()
        msg.send("REGISTER", {"email": email, "hash": generate_password_hash(password)})
        response = msg.receive()
        if response["success"]:
            session["email"] = email
            return redirect("/")
        else:
            return f"{response['message']}"
    return render_template("register.html")
"""

# end::register[]

# tag::login[]
"""@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        print("POst method got called")
        email = request.form["email"]
        password = request.form["password"]
        msg = messaging.Messaging()
        msg.send("GETHASH", {"email": email})
        response = msg.receive()
        if response["success"] != True:
            return "Login failed."
        if check_password_hash(response["hash"], password):
            session["email"] = email
            return redirect("/")
        else:
            return "Login failed."
    print("get method called")
    return redirect("/")
"""

# end::login[]


@app.route("/logout")
def logout():
    session.pop("email", None)
    return redirect("/")


@app.route("/")
@app.route("/<path:dummy>")
def page_not_found(dummy=None):
    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)
