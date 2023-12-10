from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib
import ssl
import os
from dotenv import load_dotenv


load_dotenv()


def SendVerificationMail(email, token):
    sender_email = os.getenv("SENDEREMAIL")
    password = os.getenv("EMAILPASS")

    message = MIMEMultipart("alternative")
    message["Subject"] = "Email verification"
    message["From"] = sender_email
    message["To"] = email
    text = f"""
        Email verification
        Go to https://portfolio-tracker-jfyq.onrender.com/verify/{token} for verification
    """
    html = f"""
        <html>
            <body>
                 <h2>Email verification</h2>
                 <p>Cick <a href="https://portfolio-tracker-jfyq.onrender.com/verify/{token}" target="_blank">here</a> to verify email.
            </body>
        </html>
    """

    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    message.attach(part1)
    message.attach(part2)

    context = ssl.SSLContext(ssl.PROTOCOL_TLS)
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls(context=context)
        server.login(sender_email, password)
        server.sendmail(
            sender_email, email, message.as_string()
        )


def SendResetMail(email, token):
    sender_email = os.getenv("SENDEREMAIL")
    password = os.getenv("EMAILPASS")

    message = MIMEMultipart("alternative")
    message["Subject"] = "Password Reset"
    message["From"] = sender_email
    message["To"] = email
    text = f"""
        Password reset
        Go to https://portfolio-tracker-jfyq.onrender.com/forgotpassword/{token} for password reset
    """
    html = f"""
        <html>
            <body>
                 <h2>Email verification</h2>
                 <p>Cick <a href="https://portfolio-tracker-jfyq.onrender.com/forgotpassword/{token}" target="_blank">here</a> to reset password.
            </body>
        </html>
    """

    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    message.attach(part1)
    message.attach(part2)

    context = ssl.SSLContext(ssl.PROTOCOL_TLS)
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls(context=context)
        server.login(sender_email, password)
        server.sendmail(
            sender_email, email, message.as_string()
        )
