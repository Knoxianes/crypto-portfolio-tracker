from dotenv import load_dotenv
import os
import jwt
from flask import request

from helpers.db import ConnectDB

load_dotenv()


def GetUserDataFromToken(token):
    try:
        username = jwt.decode(token, os.getenv(
            "JWT"), algorithms=["HS256"])["username"]
        with ConnectDB() as db:
            result = db.execute(
                "select * from users where username=?;", [username])
            email = result[0][1]
            name = result[0][3]
            lastname = result[0][4]
            address = result[0][5]
            city = result[0][6]
            country = result[0][7]
            phone = result[0][8]
            btc = result[0][12]
            eth = result[0][13]
            usdt = result[0][14]
            bnb = result[0][15]
            usdc = result[0][16]
            sol = result[0][17]
            ada = result[0][18]
            link = result[0][19]
            matic = result[0][20]
            dot = result[0][21]
            ret = {
                "userData": {
                    "username": username,
                    "email": email,
                    "name": name,
                    "lastname": lastname,
                    "address": address,
                    "city": city,
                    "country": country,
                    "phone": phone,
                    "coins": {
                        "btc": btc,
                        "eth": eth,
                        "usdt": usdt,
                        "bnb": bnb,
                        "usdc": usdc,
                        "sol": sol,
                        "ada": ada,
                        "link": link,
                        "matic": matic,
                        "dot": dot}
                },
                "message": "done"}
            return ret
    except Exception as e:
        print(e)
        return {"message": "error"}


def PutUserData(token):
    try:
        data = request.json
        username = jwt.decode(token, os.getenv(
            "JWT"), algorithms=["HS256"])["username"]
        name = data["name"]
        lastname = data["lastname"]
        address = data["address"]
        city = data["city"]
        country = data["country"]
        phone = data["phone"]
        with ConnectDB() as db:
            db.execute("update users set name=?,lastname=?,address=?,city=?,country=?,phone=? where username=?;", [
                       name, lastname, address, city, country, phone, username])
            return {"message": "done"}
    except Exception as e:
        print(e)
        return {"message": "error"}
