from datetime import datetime, timedelta, date
from operator import itemgetter
from math import ceil
import calendar
from .delivery_method import DeliveryMethod


class Reminder:
    today = datetime.now()
    dayMap = dict(zip(calendar.day_name, range(7)))
    weekday = today.weekday() == 0
    Cadence = None

    def __init__(self, reminder, Cadence, notificationDay) -> None:
        Reminder.Cadence = Cadence

        id, name, complete, cadence, deliveryMethod = itemgetter(
            'id', 'name', 'complete', 'cadence', 'deliveryMethod')(reminder)

        self.id = id
        self.name = name
        self.complete = complete
        self.finishedOn = datetime.strptime(
            reminder["finishedOn"], '%m/%d/%Y') if "finishedOn" in reminder else None
        self.deliveryMethod = deliveryMethod
        self.cadence = Cadence[cadence]
        self.day = Reminder.dayMap[notificationDay]
        self.update()

    def update(self):
        # if the task was completed, set completion date to yesterday
        if self.complete and not self.finishedOn:
            today = Reminder.today.date()
            self.finishedOn = today - timedelta(days=1)

    def remind(self, contact_info={}):
        if self.complete:
            return False

        if self.cadence != Reminder.Cadence.Daily:
            # only send reminder on specified day and end of cadence time range
            # eg. end of week, end of month, end of year etc
            today = Reminder.today.date()
            reminderDay = today.weekday() == self.day
            weekOfMonth = self.week_of_month(today)
            if not reminderDay:
                return False
            if self.cadence == Reminder.Cadence.BiWeekly and weekOfMonth % 2 != 0:
                return False
            if self.cadence == Reminder.Cadence.Monthly and weekOfMonth != 4:
                return False
        self.remind(contact_info)
        return self

    def remind(self, contact_info):
        DeliveryMethod(contact_info, self)

    def reset_cadence(self):
        self.cadence = Reminder.Cadence((1, 1)).name

    def snooze(self):
        self.remind({}, True)

    def week_of_month(date):
        day_one = date.replace(day=1)
        return int(ceil((date.day + day_one.weekday())/7.0))
