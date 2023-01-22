from datetime import datetime, timedelta
from operator import itemgetter
from .delivery_method import DeliveryMethod


class Routine:
    today = datetime.now()
    Cadence = None

    def __init__(self, routine, Cadence) -> None:
        Routine.Cadence = Cadence

        id, name, category, cadence, deliveryMethod, lastDate, nextDate, iterations, created = itemgetter(
            'id', 'name', 'category', 'cadence', 'deliveryMethod', 'lastDate', 'nextDate', 'iterations', 'created')(routine)

        self.id = id
        self.name = name
        self.category = category
        self.iterations = iterations
        self.deliveryMethod = deliveryMethod
        self.cadence = Cadence[cadence]
        self.created = datetime.strptime(created, '%m/%d/%Y')
        self.lastDate = datetime.strptime(
            lastDate, '%m/%d/%Y')
        self.nextDate = datetime.strptime(nextDate, '%m/%d/%Y')

    def update(self, contact_info={}, delay=None):
        today = Routine.today.date()
        upcoming = self.nextDate.date()

        sendReminder = (upcoming - today).days == self.cadence.value[1]

        if delay:
            self.nextDate = today + timedelta(days=self.cadence.value[1])
            return self
        elif sendReminder:
            self.remind(contact_info)
        elif upcoming == today:
            self.lastDate = today
            self.nextDate = today + timedelta(days=self.cadence.value[0])
            return self
        return False

    def remind(self, contact_info):
        DeliveryMethod(contact_info, self)

    def increment_iterations(self):
        self.iterations += 1

    def reset_iterations(self):
        self.iterations = 0
        self.lastDate = datetime.now()

    def reset_cadence(self):
        self.cadence = Routine.Cadence((1, 1)).name

    def snooze(self):
        self.update({}, True)

    def change_category(self, category):
        self.category = category
