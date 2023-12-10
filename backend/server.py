from flask import Flask, redirect, render_template, request
from prices import UpdatePrice
from handlers.forgot_password import ForgotPasswordGET, ForgotPasswordPOST, ForgotPasswordTokenGET, ForgotPasswordTokenPOST
from handlers.signup import SignupPOST
from handlers.login import LoginPOST
from handlers.verify import VerifyTokenGET, VerifyGET, VerifyPOST
from handlers.resetpassword import ResetPassword
from handlers.api.charts import ChartsData1Day, ChartsData7Day, ChartsData30Day
from handlers.api.userdata import GetUserDataFromToken, PutUserData
from handlers.api.prices import GetLatestPrices, Get1DayPrice, Get7DayPrice, Get1HourPrice
from handlers.api.transactions import DeleteTransaction, GetTransactionsFromToken, PostTransaction, PutTransaction
from handlers.portfolio import GetPortfolio
from handlers.logout import Logout
from multiprocessing import Process

app = Flask(__name__, static_url_path="/assets",
            static_folder="assets", template_folder="pages")
token_paths = ["portfolio", "api", "profile", "logout"]


@app.before_request
def middleware():
    path = request.path.split('/')[1]
    if request.method == "GET" and path != "assets":
        token = request.cookies.get("token")
        if token:
            if path not in token_paths:
                return redirect("/portfolio", 303)
        else:
            if path in token_paths:
                return redirect("/", 303)


@app.post("/signup")
def signup():
    return SignupPOST()


@app.post("/login")
def login():
    return LoginPOST()


@app.get("/")
def home():
    return render_template("login.html")


@app.get("/signup")
def getsignup():
    return render_template("signup.html")


@app.route("/verify/<string:token>")
def verify_token(token):
    return VerifyTokenGET(token)


@app.route("/verify", methods=['POST', 'GET'])
def verify():
    if request.method == 'POST':
        return VerifyPOST()
    if request.method == 'GET':
        return VerifyGET()


@app.route("/forgotpassword", methods=['POST', 'GET'])
def forgotpassword():
    if request.method == 'POST':
        return ForgotPasswordPOST()
    if request.method == 'GET':
        return ForgotPasswordGET()


@app.route("/forgotpassword/<string:token>", methods=['POST', 'GET'])
def forgotpasswordtoken(token):
    if request.method == 'POST':
        return ForgotPasswordTokenPOST(token)
    if request.method == 'GET':
        return ForgotPasswordTokenGET(token)


@app.post("/resetpassword/<string:token>")
def resetpassword(token):
    return ResetPassword(token)


@app.get("/portfolio")
def portfolio():
    token = request.cookies.get("token")
    return GetPortfolio(token)


@app.get("/profile")
def profile():
    return render_template("profile.html")


@app.get("/logout")
def logout():
    return Logout()


@app.get("/api/userdata/<string:token>")
def userdata(token):
    return GetUserDataFromToken(token)


@app.put("/api/userdata/<string:token>")
def updateuserdata(token):
    return PutUserData(token)


@app.get("/api/prices")
def prices():
    return GetLatestPrices()


@app.get("/api/prices/1d")
def prices1d():
    return Get1DayPrice()


@app.get("/api/prices/1h")
def prices1h():
    return Get1HourPrice()


@app.get("/api/prices/7d")
def prices7d():
    return Get7DayPrice()


@app.get("/api/chart/1d/<string:token>")
def chartdata1day(token):
    return ChartsData1Day(token)


@app.get("/api/chart/7d/<string:token>")
def chartdata7day(token):
    return ChartsData7Day(token)


@app.get("/api/chart/30d/<string:token>")
def chartdata30day(token):
    return ChartsData30Day(token)


@app.get("/api/transactions/<string:token>")
def gettransactions(token):
    return GetTransactionsFromToken(token)


@app.post("/api/transactions")
def posttransactions():
    return PostTransaction()


@app.put("/api/transactions")
def puttransaction():
    return PutTransaction()


@app.delete("/api/transactions")
def deletetransaction():
    return DeleteTransaction()


p = Process(target=UpdatePrice)
p.start()

if __name__ == "__main__":
    app.run(debug=True)
