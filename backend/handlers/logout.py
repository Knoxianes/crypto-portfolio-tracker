from flask import make_response


def Logout():
    try:
        resp = make_response({"message": "done"})
        resp.set_cookie('token', expires=0)
        return resp
    except Exception as e:
        print(e)
        return {"message": "error"}
