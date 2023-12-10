import time
from flask import request
from helpers.db import ConnectDB
from helpers.mail import SendVerificationMail
import bcrypt
import jwt
from dotenv import load_dotenv
import os
import traceback

load_dotenv()


def SignupPOST():
    data = request.json
    username = data["username"]
    email = data["email"]
    password = data["password"]

    with ConnectDB() as client:
        try:
            result = client.execute(
                "select username from users where username=? limit 1;", [username])
            if len(result.rows) > 0:
                return {"message": "bad username"}
            result = client.execute(
                "select username from users where email=? limit 1;", [email])
            if len(result.rows) > 0:
                return {"message": "bad email"}
            password = bcrypt.hashpw(
                password.encode('utf-8'), bcrypt.gensalt())

            verification_token = jwt.encode({"exp": time.time(
            )+3600, "username": username}, os.getenv("JWT"), algorithm="HS256")

            token = jwt.encode({"username": username},
                               os.getenv("JWT"), algorithm="HS256")
            client.execute("insert into users(username,email,password,token,verification_token,verified) values (?,?,?,?,?,0);", [
                           username, email, password.decode('utf-8'), token, verification_token])
            SendVerificationMail(email, verification_token)
        except Exception as e:
            traceback.print_exc()
            print(e)
            return {"message": "error"}
    return {"message": "done"}
