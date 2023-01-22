import smtplib
from email.message import EmailMessage
from os import environ as env
from dotenv import load_dotenv
from datetime import datetime
from operator import itemgetter
from .PyMessenger import Email, SMS, Messenger


class DeliveryMethod:
    carriers = {
        "att": "@txt.att.net",
        "tmobile": "@tmomail.net",
        "verizon": "@vtext.com",
        "sprint": "@messaging.sprintpcs.com"
    }

    def __init__(self, contact_info, routine) -> None:
        email, phone, carrier = itemgetter(
            'email', 'phone', 'carrier')(contact_info)
        self.email = email
        self.phone = phone
        self.carrier = carrier
        self.delivery_method = routine.deliveryMethod
        self.msg_name = routine.name
        self.msg_cadence = routine.cadence
        self.msg_next_date = routine.nextDate
        self.delivered = datetime.now()
        self.send()

    def send(self):
        load_dotenv(".env")
        date = self.msg_next_date.strftime('%a %b %d %Y')
        subject = f'You have a reminder for {date}!'
        message = f"Hi! Here's your reminder that there's {self.msg_cadence.value[1]} day(s) until you should {self.msg_name}. Upcoming date: {date}"

        if self.delivery_method == "Phone":
            self.send_text(message, subject)
        else:
            self.send_email(message, subject)

    def send_text(self, content, subject):
        my_messenger = Messenger(env['GMAIL_USER'], env['GMAIL_PASSWORD'])

        # Build the message
        number = str(self.phone)
        gateway = DeliveryMethod.carriers[self.carrier]
        msg = SMS(number, gateway, subject, content)

        # Send the message
        my_messenger.send_sms(msg, one_time=True)
        return None

    def send_email(self, content, subject):
        my_messenger = Messenger(env['GMAIL_USER'], env['GMAIL_PASSWORD'])
        to = self.email
        msg = Email(to, subject, content, is_HTML=False)
        my_messenger.send_email(msg, one_time=True)
        return None
