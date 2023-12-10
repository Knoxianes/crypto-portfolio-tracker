import jwt
import traceback
import os
import time
from dotenv import load_dotenv

from helpers.db import ConnectDB
from helpers.convert import ConvertNumber

load_dotenv()


def ChartsData1Day(token):
    try:
        username = jwt.decode(token, os.getenv(
            "JWT"), algorithms=["HS256"])["username"]
        with ConnectDB() as db:
            quantity = db.execute(
                "select btc,eth,usdt,bnb,usdc,sol,ada,link,matic,dot from users where username=?;", [username])
            if len(quantity) == 0:
                return {"message": "error"}
            unixtime = (time.time() - 3600*24) * 1000
            prices = db.execute(
                "select * from prices where date >= ? order by date;", [unixtime])
            ret = []
            for row in prices:
                dateSplited = time.ctime(row[0]/1000).split(" ")
                addZero = False
                if len(dateSplited) == 6:
                    dateSplited.remove('')
                    addZero = True
                month = dateSplited[1]
                day = "0"+dateSplited[2] if addZero else dateSplited[2]
                times = dateSplited[3].split(":")
                hours = times[0]
                minutes = times[1]
                value = 0
                for i, coin in enumerate(quantity[0]):
                    if coin is None:
                        continue
                    value += coin * row[i+1]
                if value != 0:
                    valueConverted = ConvertNumber(round(value, 2))
                else:
                    valueConverted = 0
                dataPoint = {
                    "date": f"{day} {month} {hours}:{minutes}",
                    "valueConvrted": f"${valueConverted}",
                    "value": round(value, 2),
                    "unix": row[0]
                }
                ret.append(dataPoint)
            return {
                "data": ret,
                "message": "done"
            }
    except Exception as e:
        print(traceback.format_exc())
        return {"message": "error"}


def ChartsData7Day(token):
    try:
        username = jwt.decode(token, os.getenv(
            "JWT"), algorithms=["HS256"])["username"]
        with ConnectDB() as db:
            quantity = db.execute(
                "select btc,eth,usdt,bnb,usdc,sol,ada,link,matic,dot from users where username=?;", [username])
            if len(quantity) == 0:
                return {"message": "error"}
            unixtime = (time.time() - 3600*24*7) * 1000
            prices = db.execute(
                "select * from prices where date >= ? order by date;", [unixtime])
            ret = []
            for row in prices:
                dateSplited = time.ctime(row[0]/1000).split(" ")
                addZero = False
                if len(dateSplited) == 6:
                    dateSplited.remove('')
                    addZero = True
                month = dateSplited[1]
                day = "0"+dateSplited[2] if addZero else dateSplited[2]
                times = dateSplited[3].split(":")
                hours = times[0]
                minutes = times[1]
                value = 0
                for i, coin in enumerate(quantity[0]):
                    if coin is None:
                        continue
                    value += coin * row[i+1]
                if value != 0:
                    valueConverted = ConvertNumber(round(value, 2))
                else:
                    valueConverted = 0
                dataPoint = {
                    "date": f"{day} {month} {hours}:{minutes}",
                    "valueConverted": f"${valueConverted}",
                    "value": round(value, 2),
                    "unix": row[0]
                }
                ret.append(dataPoint)
            return {
                "data": ret,
                "message": "done"
            }
    except Exception:
        print(traceback.format_exec())
        return {"message": "error"}


def ChartsData30Day(token):
    try:
        username = jwt.decode(token, os.getenv(
            "JWT"), algorithms=["HS256"])["username"]
        with ConnectDB() as db:
            quantity = db.execute(
                "select btc,eth,usdt,bnb,usdc,sol,ada,link,matic,dot from users where username=?;", [username])
            if len(quantity) == 0:
                return {"message": "error"}
            unixtime = (time.time() - 3600*24*30) * 1000
            prices = db.execute(
                "select * from prices where date >= ? order by date;", [unixtime])
            ret = []
            for row in prices:
                dateSplited = time.ctime(row[0]/1000).split(" ")
                addZero = False
                if len(dateSplited) == 6:
                    dateSplited.remove('')
                    addZero = True
                month = dateSplited[1]
                day = "0"+dateSplited[2] if addZero else dateSplited[2]
                times = dateSplited[3].split(":")
                hours = times[0]
                minutes = times[1]
                value = 0
                for i, coin in enumerate(quantity[0]):
                    if coin is None:
                        continue
                    value += coin * row[i+1]
                if value != 0:
                    valueConverted = ConvertNumber(round(value, 2))
                else:
                    valueConverted = 0
                dataPoint = {
                    "date": f"{day} {month} {hours}:{minutes}",
                    "valueConverted": f"${valueConverted}",
                    "value": round(value, 2),
                    "unix": row[0]
                }
                ret.append(dataPoint)
            return {
                "data": ret,
                "message": "done"
            }
    except Exception as e:
        print(e)
        return {"message": "error"}
