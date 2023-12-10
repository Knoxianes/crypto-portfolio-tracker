import libsql_client
import os
from dotenv import load_dotenv

load_dotenv()


def ConnectDB():
    return libsql_client.create_client_sync(
        url=str(os.getenv("TURSODB_URL")),
        auth_token=str(os.getenv("TURSODB_TOKEN")))
