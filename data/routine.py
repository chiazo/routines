from datetime import datetime, timedelta


class Routine:
    today = datetime.now()
    Cadence = None

    def __init__(self, id, name, category, cadence, deliveryMethod, lastDate, nextDate, iterations, created, Cadence) -> None:
        Routine.Cadence = Cadence

        self.id = id
        self.name = name
        self.created = created
        self.category = category
        self.iterations = iterations
        self.deliveryMethod = deliveryMethod
        self.cadence = Cadence[cadence]
        self.lastDate = lastDate
        self.nextDate = nextDate

    def update(self):
        today = Routine.today.date()
        if self.nextDate.date() == today:
            self.lastDate = today
            self.nextDate = today + timedelta(days=self.cadence.value)
            return self
        return False

    def increment_iterations(self):
        self.iterations += 1

    def reset_iterations(self):
        self.iterations = 0
        self.lastDate = datetime.now()

    def reset_cadence(self):
        self.cadence = Routine.Cadence(1).name

    def snooze(self, freq, measure_of_time):
        self.cadence.snooze(freq, measure_of_time)

    def change_category(self, category):
        self.category = category
