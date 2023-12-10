from flask import render_template, request, redirect
import jwt
import os
from dotenv import load_dotenv
from helpers.db import ConnectDB
from helpers.mail import SendResetMail
import time
import bcrypt

load_dotenv()


def ForgotPasswordGET():
    return 'forgot password get 1'


def ForgotPasswordPOST():
    with ConnectDB() as db:
        try:
            data = request.json
            email = data["email"]
            result = db.execute(
                "select username, verified from users where email=? limit 1;", [email])
            if len(result.rows) == 0:
                return {"message": "bad email"}
            username = result.rows[0][0]
            verified = result.rows[0][1]
            if verified == 0:
                return {"message": "not verified"}

            verification_token = jwt.encode({"exp": time.time(
            )+3600, "username": username}, os.getenv("JWT"), algorithm="HS256")
            db.execute("update users set verification_token=? where username=? ",
                       [verification_token, username])
            SendResetMail(email, verification_token)
            return {"message": "done"}
        except Exception as e:
            print(e)
            return {"message": "error"}


def ForgotPasswordTokenGET(token):
    try:
        username = jwt.decode(token, os.getenv(
            "JWT"), algorithms=["HS256"])["username"]
        with ConnectDB() as db:
            result = db.execute(
                "select verified,verification_token from users where username=? limit 1;", [username])
            if len(result.rows) == 0:
                return "Error user is not in database try to register again"
            if result.rows[0][0] == 0:
                return "User not verified"
            if result.rows[0][1] != token:
                return "Invalid reset token"
            return render_template("forgotpassword.html")
    except Exception as e:
        print(e)
        return "Reset failed token expired or some other error happend"


def ForgotPasswordTokenPOST(token):
    with ConnectDB() as db:
        try:
            data = request.json
            password = data["password"]
            username = jwt.decode(token, os.getenv(
                "JWT"), algorithms=["HS256"])["username"]
            password = bcrypt.hashpw(
                password.encode('utf-8'), bcrypt.gensalt())
            db.execute("update users set password=? where username=? ",
                       [password.decode('utf-8'), username])
            return redirect("/", 303)
        except Exception as e:
            print(e)
            return {"message": "error"}
