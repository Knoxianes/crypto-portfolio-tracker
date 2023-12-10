from flask import request
from helpers.db import ConnectDB
import bcrypt


def LoginPOST():
    data = request.json
    email = data["email"]
    password = data["password"]
    with ConnectDB() as db:
        try:
            result = db.execute(
                "select password,verified,token from users where email=? limit 1;", [email])
            if len(result.rows) == 0:
                return {"message": "bad login"}
            verified = result.rows[0][1]
            if verified == 0:
                return {"message": "not verified"}
            hashed = result.rows[0][0].encode('utf-8')
            if not bcrypt.checkpw(password.encode('utf-8'), hashed):
                return {"message": "bad login"}
            token = result.rows[0][2]
            return {"message": token}
        except Exception:
            return {"message": "error"}
