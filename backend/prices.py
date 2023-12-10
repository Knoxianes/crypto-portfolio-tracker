from binance.spot import Spot
from helpers.db import ConnectDB
import time


def UpdatePrice():
    try:
        while True:
            client = Spot()
            coins = Coins()

            eth = client.klines(symbol="ETHUSDT", interval="5m", limit=1)
            btc = client.klines(symbol="BTCUSDT", interval="5m", limit=1)
            bnb = client.klines(symbol="BNBUSDT", interval="5m", limit=1)
            sol = client.klines(symbol="SOLUSDT", interval="5m", limit=1)
            ada = client.klines(symbol="ADAUSDT", interval="5m", limit=1)
            link = client.klines(symbol="LINKUSDT", interval="5m", limit=1)
            matic = client.klines(symbol="MATICUSDT", interval="5m", limit=1)
            dot = client.klines(symbol="DOTUSDT", interval="5m", limit=1)

            coins.time = btc[0][0]
            coins.btc = float(btc[0][4])
            coins.eth = float(eth[0][4])
            coins.bnb = float(bnb[0][4])
            coins.sol = float(sol[0][4])
            coins.ada = float(ada[0][4])
            coins.link = float(link[0][4])
            coins.dot = float(dot[0][4])
            coins.matic = float(matic[0][4])

            try:
                with ConnectDB() as db:
                    result = db.execute(
                        "select date from prices where date = ?", [coins.time])
                    if len(result) == 0:
                        db.execute("insert into prices(date,btc,eth,usdt,bnb,usdc,sol,ada,link,matic,dot) values(?,?,?,?,?,?,?,?,?,?,?);", [
                                   coins.time, coins.btc, coins.eth, coins.usdt, coins.bnb, coins.usdc, coins.sol, coins.ada, coins.link, coins.matic, coins.dot])
            except Exception as e:
                print(e)
            time.sleep(300)
    except Exception as e:
        print(e)


if __name__ == "__main__":
    UpdatePrice()


class Coins():
    def __init__(self):
        self.time = 0
        self.btc = 0.0
        self.eth = 0.0
        self.usdt = 1
        self.bnb = 0.0
        self.usdc = 1
        self.sol = 0.0
        self.ada = 0.0
        self.link = 0.0
        self.matic = 0.0
        self.dot = 0.0


def UpdatePricesPast(startTime):
    try:
        client = Spot()
        coins = Coins()
        eth = client.klines(symbol="ETHUSDT", interval="5m",
                            startTime=startTime, limit=1)
        btc = client.klines(symbol="BTCUSDT", interval="5m",
                            startTime=startTime, limit=1)
        bnb = client.klines(symbol="BNBUSDT", interval="5m",
                            startTime=startTime, limit=1)
        sol = client.klines(symbol="SOLUSDT", interval="5m",
                            startTime=startTime, limit=1)
        ada = client.klines(symbol="ADAUSDT", interval="5m",
                            startTime=startTime, limit=1)
        link = client.klines(symbol="LINKUSDT", interval="5m",
                             startTime=startTime, limit=1)
        matic = client.klines(symbol="MATICUSDT",
                              interval="5m", startTime=startTime, limit=1)
        dot = client.klines(symbol="DOTUSDT", interval="5m",
                            startTime=startTime, limit=1)
        returnValue = []
        coins.time = startTime
        coins.btc = float(btc[0][1])
        coins.eth = float(eth[0][1])
        coins.bnb = float(bnb[0][1])
        coins.sol = float(sol[0][1])
        coins.ada = float(ada[0][1])
        coins.link = float(link[0][1])
        coins.dot = float(dot[0][1])
        coins.matic = float(matic[0][1])
        try:
            with ConnectDB() as db:
                result = db.execute(
                    "select date from prices where date = ?", [coins.time])
                if len(result) == 0:
                    db.execute("insert into prices(date,btc,eth,usdt,bnb,usdc,sol,ada,link,matic,dot) values(?,?,?,?,?,?,?,?,?,?,?);", [
                               coins.time, coins.btc, coins.eth, coins.usdt, coins.bnb, coins.usdc, coins.sol, coins.ada, coins.link, coins.matic, coins.dot])
        except Exception as e:
            print(e)
            return "error"
        returnValue.append(startTime)
        returnValue.append(float(btc[0][1]))
        returnValue.append(float(eth[0][1]))
        returnValue.append(1)
        returnValue.append(float(bnb[0][1]))
        returnValue.append(1)
        returnValue.append(float(sol[0][1]))
        returnValue.append(float(ada[0][1]))
        returnValue.append(float(link[0][1]))
        returnValue.append(float(matic[0][1]))
        returnValue.append(float(dot[0][1]))
        return returnValue
    except Exception as e:
        print(e)
        return "error"
