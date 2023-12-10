from dotenv import load_dotenv
from flask import request
import os
import jwt

from helpers.db import ConnectDB

load_dotenv()


def GetTransactionsFromToken(token):
    try:
        username = jwt.decode(token, os.getenv(
            "JWT"), algorithms=["HS256"])["username"]
        with ConnectDB() as db:
            result = db.execute(
                "select * from transactions where username=? order by date desc;", [username])
            transactions = []
            for row in result:
                transaction_id = row[0]
                date = row[2]
                coin = row[3]
                quantity = row[4]
                price = row[5]
                transaction = {
                    "transaction_id": transaction_id,
                    "username": username,
                    "date": date,
                    "coin": coin,
                    "quantity": quantity,
                    "price": price}
                transactions.append(transaction)
            ret = {
                "transactions": transactions,
                "message": "done"
            }
            return ret
    except Exception as e:
        print(e)
        return {"message": "error"}


def PostTransaction():
    try:
        data = request.json
        username = data["username"]
        date = int(data["date"])
        coin = data["coin"]
        quantity = float(data["quantity"])
        price = float(data["price"])
        with ConnectDB() as db:
            result = db.execute(
                f"select {coin} from users where username=?;", [username])
            oldquantity = result[0][0]
            if oldquantity is None:
                oldquantity = 0
            db.execute(f"update users set {coin}=? where username=?;",
                       [oldquantity+quantity, username])
            db.execute("insert into transactions(username,date,coin,quantity,price) values(?,?,?,?,?);", [
                       username, date, coin, quantity, price]) 
            return {
                "message": "done",
                "coin": coin,
                "quantity": oldquantity+quantity
            }
    except Exception as e:
        print(e)
        return {"message": "error"}


def PutTransaction():
    try:
        data = request.json
        username = data["username"]
        date = int(data["date"])
        transaction_coin = data["coin"]
        transaction_quantity = float(data["quantity"])
        price = float(data["price"])
        transaction_id = int(data["transaction_id"])
        with ConnectDB() as db:
            result = db.execute(
                "select * from transactions where transaction_id = ?;", [transaction_id])
            if len(result) == 0:
                return {"message": "error"}
            username = result[0][1]
            coin = result[0][3]
            old_quantity = float(result[0][4])
            result = db.execute(
                f"select {coin} from users where username=?;", [username])
            quantity = result[0][0]
            if quantity is None:
                quantity = 0
            newquantity = quantity - old_quantity
            if newquantity <= 0:
                newquantity = None
            db.execute(f"update users set {coin}=? where username=?;",
                       [newquantity, username])
            result = db.execute(
                f"select {transaction_coin} from users where username=?;", [username])
            oldquantity = result[0][0]
            if oldquantity is None:
                oldquantity = 0
            db.execute(f"update users set {transaction_coin}=? where username=?;",
                       [oldquantity+transaction_quantity, username])
            db.execute("update transactions set date=?,price=?,coin=?,quantity=? where transaction_id=?;", [
                       date, price, transaction_coin, transaction_quantity, transaction_id])
            return {
                "message": "done",
                "oldcoin": coin,
                "newcoin": transaction_coin,
                "oldquantity": newquantity,
                "newquantity": oldquantity+transaction_quantity
            }
    except Exception as e:
        print(e)
        return {"message": "error"}


def DeleteTransaction():
    try:
        data = request.json
        transaction_id = int(data["transaction_id"])
        with ConnectDB() as db:
            result = db.execute(
                "select * from transactions where transaction_id = ?;", [transaction_id])
            if len(result) == 0:
                return {"message": "error"}
            username = result[0][1]
            coin = result[0][3]
            transaction_quantity = float(result[0][4])
            result = db.execute(
                f"select {coin} from users where username=?;", [username])
            quantity = result[0][0]
            if quantity is None:
                quantity = 0
            newquantity = quantity - transaction_quantity
            if newquantity <= 0:
                newquantity = None
            db.execute(f"update users set {coin}=? where username=?;",
                       [newquantity, username])
            db.execute("delete from transactions where transaction_id=?;", [
                       transaction_id])
            return {
                "message": "done",
                "coin": coin,
                "quantity": newquantity
            }
    except Exception as e:
        print(e)
        return {"message": "error"}
