from flask import Flask, render_template, request, session, redirect
from functools import wraps
from werkzeug.security import check_password_hash, generate_password_hash
import logging
import random
import copy

import messaging
import os

app = Flask(__name__)
app.secret_key = os.environ["FLASK_SECRET_KEY"]
"""
Following line must be deleted before production
"""

logging.basicConfig(level=logging.INFO)

test_questions = []


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
        msg = messaging.Messaging()
        msg.send("GETHASH", {"email": email})
        response = msg.receive()
        try:
            if response["success"] != True:
                return render_template(
                    "login.html",
                    error_title="Login Failed",
                    error_message="Login Failed for some reason. Please try back again with  correct credentials",
                )
            if check_password_hash(response["hash"], password):
                session["email"] = email
                return redirect("/")
            else:
                return render_template(
                    "login.html",
                    error_title="Login Failed",
                    error_message="Login Failed for some reason. Please try back again with  correct credentials",
                )
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
                return render_template(
                    "signup.html",
                    error_title=response["message"],
                    error_message=response["message"],
                )
        except:
            pass
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
    global test_questions
    if request.method == "POST":
        correct = 0
        for each_question in test_questions:
            try:
                user_answer = request.form[each_question["id"]]
                if user_answer.lower() == each_question["keys"][0]:
                    correct += 1
            except Exception:
                continue
        percentage_score = (correct / len(test_questions)) * 100
        status = "passed" if percentage_score >= 70 else "failed"
        message = ""
        if percentage_score < 70:
            message = "Unfortunately, you have scored {}% on the test and missed the passing score of 70% or more.".format(
                int(percentage_score)
            )
        elif percentage_score == 70:
            message = "Luckily, you passed the test with a scoring percentage of {}% on the test.".format(
                int(percentage_score)
            )
        else:
            message = "Congrats, you have scored {}% on the test and crossed the passing requirement of 70% or more.".format(
                int(percentage_score)
            )
        return render_template("scorecard.html", message=message, status=status)
    msg = messaging.Messaging()
    msg.send("GETTEST", {"email": "garbage"})
    response = msg.receive()
    try:
        if response["success"] != True:
            return render_template("index.html")
        test_questions = response["questions"]["questions"]
    except:
        pass
    questions_copy = copy.deepcopy(test_questions)
    shuffle_questions = shuffle_questions_keys(questions_copy)
    return render_template("test.html", questions=shuffle_questions)


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
