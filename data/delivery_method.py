import os
from os import environ as env
from dotenv import load_dotenv
from datetime import datetime
from operator import itemgetter
from .PyMessenger import Email, Messenger
from etext import send_sms_via_email


class DeliveryMethod:
    carriers = {
        "att": "@txt.att.net",
        "tmobile": "@tmomail.net",
        "verizon": "@vtext.com",
        "sprint": "@messaging.sprintpcs.com"
    }

    def __init__(self, contact_info, obj) -> None:
        email, phone, carrier = itemgetter(
            'email', 'phone', 'carrier')(contact_info)
        self.obj = obj
        self.email = email
        self.phone = phone
        self.carrier = carrier
        self.delivery_method = obj.deliveryMethod
        self.msg_name = obj.name
        self.msg_cadence = obj.cadence
        self.msg_next_date = datetime.now()
        if hasattr(obj,  'nextDate'):
            self.msg_next_date = obj.nextDate
        self.send()

    def send(self):
        load_dotenv(
            f"{os.path.dirname(os.path.dirname(os.path.abspath(__file__)))}/.env")
        date = self.msg_next_date.strftime('%a %b %d %Y')
        subject = f'[{type(self.obj).__name__}] For {date}!'
        message = f"Hi! { self.msg_cadence.value[1] } day(s) until you should {self.msg_name}.\nUpcoming: {date}"

        if not hasattr(self.obj,  'nextDate'):
            message = f"Hi! { self.msg_cadence.name } reminder to {self.msg_name}!"

        if self.delivery_method == "Phone":
            self.send_text(message, subject)
        else:
            self.send_email(message, subject)

    def send_text(self, content, subject):
        sender_credentials = (env['GMAIL_USER'], env['GMAIL_PASSWORD'])

        return send_sms_via_email(
            self.phone, content, self.carrier, sender_credentials, subject=subject
        )

    def send_email(self, content, subject):
        my_messenger = Messenger(env['GMAIL_USER'], env['GMAIL_PASSWORD'])
        to = self.email
        msg = Email(to, subject, content, is_HTML=False)
        return my_messenger.send_email(msg, one_time=True)
