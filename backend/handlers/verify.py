from flask import render_template, request
import jwt
import os
from dotenv import load_dotenv
from helpers.db import ConnectDB
from helpers.mail import SendVerificationMail
import time

load_dotenv()


def VerifyTokenGET(token):
    try:
        username = jwt.decode(token, os.getenv(
            "JWT"), algorithms=["HS256"])["username"]
        with ConnectDB() as db:
            result = db.execute(
                "select verified,verification_token from users where username=? limit 1;", [username])
            if len(result.rows) == 0:
                return "Error user is not in database try to register again"
            if result.rows[0][0] == 1:
                return "User already verified"
            if result.rows[0][1] != token:
                return "Invalid verification token"
            db.execute(
                "update users set verified = 1 where username=?;", [username])
            return "Verification successful"
    except Exception as e:
        print(e)
        return "Verification failed token expired or some other error happend"


def VerifyGET():
    return render_template("verification_token_reset.html")


def VerifyPOST():
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
            if verified == 1:
                return {"message": "verified"}

            verification_token = jwt.encode({"exp": time.time(
            )+3600, "username": username}, os.getenv("JWT"), algorithm="HS256")
            db.execute("update users set verification_token=? where username=? ",
                       [verification_token, username])
            SendVerificationMail(email, verification_token)
            return {"message": "done"}
        except Exception as e:
            print(e)
            return {"message": "error"}
