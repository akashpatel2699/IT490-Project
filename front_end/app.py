from flask import Flask, render_template, request, session, redirect
from functools import wraps
from werkzeug.security import check_password_hash, generate_password_hash
import logging
import random
import copy

# import messaging
import os

app = Flask(__name__)
# app.secret_key = os.environ["FLASK_SECRET_KEY"]
"""
Following line must be deleted before production
"""
app.secret_key = "\xd4\xe0\x8e\xceg1g0\xcd\xd7\x14J\xed\x87M\xdc\xb7p\xf3;\tBw\x9e"

logging.basicConfig(level=logging.INFO)

# index 0 is the correct answer from answers

test_questions = [
    {
        "id": "1",
        "question": "This is a test question 1. Please try your best to answer them.",
        "keys": ["answer1", "answer2", "answer3", "answer4"],
    },
    {
        "id": "2",
        "question": "This is a test  question 2. Please try your best to answer them.",
        "keys": ["answer2", "answer1", "answer3", "answer4"],
    },
]


def shuffle_questions_keys(questions):
    """
    Shuffle questions and the keys
    """
    random.shuffle(questions)
    for each_question in questions:
        random.shuffle(each_question["keys"])
    return questions


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


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        print(email, password)
        # msg = messaging.Messaging()
        # msg.send("GETHASH", {"email": email})
        # response = msg.receive()
        # try:
        #     if response["success"] != True:
        #         return render_template(
        #             "login.html",
        #             error_title="Login Failed",
        #             error_message="Login Failed for some reason. Please try back again with  correct credentials",
        #         )
        #     if check_password_hash(response["hash"], password):
        #         session["email"] = email
        #         return redirect("/")
        #     else:
        #         return render_template(
        #             "login.html",
        #             error_title="Login Failed",
        #             error_message="Login Failed for some reason. Please try back again with  correct credentials",
        #         )
        # except:
        #     pass
    return render_template("login.html")


@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        first_name = request.form["first_name"]
        last_name = request.form["last_name"]
        email = request.form["email"]
        password = request.form["password"]
        print(first_name, last_name, email, password)
        # msg = messaging.Messaging()
        # msg.send(
        #     "REGISTER",
        #     {
        #         "email": email,
        #         "hash": generate_password_hash(password),
        #         "first_name": first_name,
        #         "last_name": last_name,
        #     },
        # )
        # response = msg.receive()
        # try:
        #     if response["success"]:
        #         session["email"] = email
        #         return redirect("/")
        #     else:
        #         return render_template(
        #             "signup.html",
        #             error_title=response["message"],
        #             error_message=response["message"],
        #         )
        # except:
        #     pass
        session["email"] = email
    return render_template("signup.html")


@app.route("/team")
def about():
    return render_template("team.html")


@app.route("/gettest", methods=["GET", "POST"])
@login_required
def get_test():
    """
    Create deepcopy of questions before shuffling
    questions and keys
    """
    if request.method == "POST":
        correct = 0
        for each_question in test_questions:
            try:
                user_answer = request.form[each_question["id"]]
                if user_answer == each_question["keys"][0]:
                    correct += 1
            except Exception:
                continue
        status = "passed" if (correct / len(test_questions)) * 100 > 70 else "failed"
        return render_template("scorecard.html", score=correct, status=status)
    questions_copy = copy.deepcopy(test_questions)
    shuffle_questions = shuffle_questions_keys(questions_copy)
    return render_template("test.html", questions=shuffle_questions)


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
