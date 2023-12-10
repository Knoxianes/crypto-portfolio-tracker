from flask import request
import jwt
import os
from dotenv import load_dotenv
from helpers.db import ConnectDB
import bcrypt

load_dotenv()


def ResetPassword(token):
    with ConnectDB() as db:
        try:
            data = request.json
            password = data["password"]
            oldpassword = data["oldpassword"]
            username = jwt.decode(token, os.getenv(
                "JWT"), algorithms=["HS256"])["username"]
            result = db.execute(
                "select password from users where username=? limit 1;", [username])
            hashed = result.rows[0][0].encode('utf-8')
            if not bcrypt.checkpw(oldpassword.encode('utf-8'), hashed):
                return {"message": "bad password"}
            password = bcrypt.hashpw(
                password.encode('utf-8'), bcrypt.gensalt())
            db.execute("update users set password=? where username=?;",
                       [password.decode('utf-8'), username])
            return {
                "message": "done"
            }
        except Exception as e:
            print(e)
            return {"message": "error"}
