from dotenv import load_dotenv
import os
import jwt
from flask import make_response, redirect, render_template 

from helpers.db import ConnectDB

load_dotenv()


def GetPortfolio(token):
    try:
        try:
            username = jwt.decode(token, os.getenv(
                "JWT"), algorithms=["HS256"])["username"]
        except Exception as e:
            print(e)
            resp = make_response(redirect("/", code=303))
            resp.set_cookie('token', expires=0)
            return resp
        with ConnectDB() as db:
            result = db.execute(
                "select username from users where username=? limit 1;", [username])
            if len(result) == 0:
                resp = make_response(redirect("/", code=303))
                resp.set_cookie('token', expires=0)
                return resp
            return render_template("portfolio.html")
    except Exception as e:
        print(e)
        return "Server error"
