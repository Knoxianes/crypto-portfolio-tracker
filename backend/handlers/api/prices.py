from dotenv import load_dotenv
import math
import time
from prices import UpdatePricesPast
from helpers.db import ConnectDB

load_dotenv()


def GetLatestPrices():
    try:
        with ConnectDB() as db:
            result = db.execute(
                "select * from prices order by date desc limit 1;")
            date = result[0][0]
            btc = result[0][1]
            eth = result[0][2]
            usdt = result[0][3]
            bnb = result[0][4]
            usdc = result[0][5]
            sol = result[0][6]
            ada = result[0][7]
            link = result[0][8]
            matic = result[0][9]
            dot = result[0][10]
            ret = {
                "prices": {
                    "date": date,
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


def Get1DayPrice():
    try:
        with ConnectDB() as db:
            unixtime = ((math.trunc(time.time()) -
                        math.trunc(time.time()) % 300) - 3600*24) * 1000
            result = db.execute(
                "select * from prices where date=?;", [unixtime])
            if len(result) > 0:
                date = result[0][0]
                btc = result[0][1]
                eth = result[0][2]
                usdt = result[0][3]
                bnb = result[0][4]
                usdc = result[0][5]
                sol = result[0][6]
                ada = result[0][7]
                link = result[0][8]
                matic = result[0][9]
                dot = result[0][10]
                ret = {
                    "prices": {
                        "date": date,
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
            result = UpdatePricesPast(unixtime)
            if result == "error":
                return {"message": "error"}
            date = result[0]
            btc = result[1]
            eth = result[2]
            usdt = result[3]
            bnb = result[4]
            usdc = result[5]
            sol = result[6]
            ada = result[7]
            link = result[8]
            matic = result[9]
            dot = result[10]
            ret = {
                "prices": {
                    "date": date,
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


def Get1HourPrice():
    try:
        with ConnectDB() as db:
            unixtime = ((math.trunc(time.time()) -
                         math.trunc(time.time()) % 300) - 3600) * 1000

            result = db.execute(
                "select * from prices where date=?;", [unixtime])
            if len(result) > 0:
                date = result[0][0]
                btc = result[0][1]
                eth = result[0][2]
                usdt = result[0][3]
                bnb = result[0][4]
                usdc = result[0][5]
                sol = result[0][6]
                ada = result[0][7]
                link = result[0][8]
                matic = result[0][9]
                dot = result[0][10]
                ret = {
                    "prices": {
                        "date": date,
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
            result = UpdatePricesPast(unixtime)
            if result == "error":
                return {"message": "error"}
            date = result[0]
            btc = result[1]
            eth = result[2]
            usdt = result[3]
            bnb = result[4]
            usdc = result[5]
            sol = result[6]
            ada = result[7]
            link = result[8]
            matic = result[9]
            dot = result[10]
            ret = {
                "prices": {
                    "date": date,
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


def Get7DayPrice():
    try:
        with ConnectDB() as db:
            unixtime = ((math.trunc(time.time()) -
                         math.trunc(time.time()) % 300) - 3600*7*24) * 1000
            result = db.execute(
                "select * from prices where date=?;", [unixtime])
            if len(result) > 0:
                date = result[0][0]
                btc = result[0][1]
                eth = result[0][2]
                usdt = result[0][3]
                bnb = result[0][4]
                usdc = result[0][5]
                sol = result[0][6]
                ada = result[0][7]
                link = result[0][8]
                matic = result[0][9]
                dot = result[0][10]
                ret = {
                    "prices": {
                        "date": date,
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
            result = UpdatePricesPast(unixtime)
            if result == "error":
                return {"message": "error"}
            date = result[0]
            btc = result[1]
            eth = result[2]
            usdt = result[3]
            bnb = result[4]
            usdc = result[5]
            sol = result[6]
            ada = result[7]
            link = result[8]
            matic = result[9]
            dot = result[10]
            ret = {
                "prices": {
                    "date": date,
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
