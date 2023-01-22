import smtplib
import sys
from datetime import datetime
from operator import itemgetter


class DeliveryMethod:
    carriers = {
        "att": "@mms.att.net",
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
        self.delivery_method = itemgetter('deliveryMethod')(routine)
        self.details = {itemgetter(
            'name', 'cadence', 'nextDate')(routine)}
        self.delivered = datetime.now()
        self.send()

    def send(self):
        date = self.details.nextDate.strftime('%a %b %d %Y')
        message = f"Hi! Here's you reminder that there's {self.details.cadence[1]} days until you should {self.details.name}. Upcoming date - {date}"

        if self.delivery_method == "Phone":
            self.sendText(message)
        else:
            self.sendEmail(message)

    def sendText(self, message):
        return None

    def sendEmail(self, message):
        return None
