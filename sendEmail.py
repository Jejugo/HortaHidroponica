import sys
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


class emailSending:

    def __init__(self, sendTo):
        self.sendTo = sendTo

    def sendEmail(self):
        try:
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.connect("smtp.gmail.com", 587)
            server.starttls()
            #Next, log in to the server
            server.login("goes.jeffjulian@gmail.com", "uhyU{]Y6U7u!5;WH*")
            #Send the mail
            msg = MIMEMultipart()
            msg['From']="goes.jeffjulian@gmail.com"
            msg['To']="goes.jeffjulian@gmail.com"
            msg['Subject']="This is TEST"
            server.send(msg)
            server.quit()
        except:
            print("erro")

send = emailSending(sys.argv[0])
send.sendEmail()

