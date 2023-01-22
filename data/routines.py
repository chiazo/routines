import requests
import os
from os import environ as env
from dotenv import load_dotenv
from enum import Enum
from .routine import Routine
from .reminder import Reminder
from datetime import datetime


class Routines:
    def __init__(self) -> None:
        self.routine_data = {}
        self.reminder_data = {}
        self.definition_data = {}
        self.cadence_data = {}
        self.contact_info = {}
        self.cadence_enum = None
        self.getContactInfo()
        self.getRoutines()
        self.getReminders()
        self.getDefinitions()
        self.getCadenceEnum()

    def updateRoutines(self):
        updated_routines = []
        for routine in self.routine_data:
            r = Routine(routine, self.cadence_enum)

            updated = r.update(self.contact_info)
            if updated:
                updated_routines.append(updated)
        self.postUpdatedRoutines(updated_routines)
        self.postCronLog(updated_routines, 'Routines')

    def updateReminders(self):
        sent_reminders = []
        updated_reminders = []
        for reminder in self.reminder_data:
            r = Reminder(reminder, self.cadence_enum,
                         self.contact_info["notificationDay"])

            reminded = r.remind(self.contact_info)
            if r.finishedOn:
                updated_reminders.append(r)
            if reminded:
                sent_reminders.append(reminded)

        self.postUpdatedReminders(updated_reminders)
        self.postCronLog(
            list(set(updated_reminders + sent_reminders)), 'Reminders')

    def postUpdatedRoutines(self, updates):
        for r in updates:
            body = {"routine": {
                'lastDate': r.lastDate.strftime('%m/%d/%Y'), }}
            self.call_endpoint(f"routines/{r.id}", body)

    def postUpdatedReminders(self, updates):
        for r in updates:
            if r.finishedOn:
                body = {"reminder": {
                    'finishedOn': r.finishedOn.strftime('%m/%d/%Y'), }}
                self.call_endpoint(f"reminders/{r.id}", body)

    def postCronLog(self, updates, type):
        ids = ','.join([str(r.id) for r in updates])
        names = ','.join([r.name for r in updates])
        body = {"cron": {
                'timestamp': datetime.now().strftime("%c"),
                'type': type,
                'ids': ids if len(ids) > 0 else "N/A",
                "deliverySuccess": True,
                "names": names if len(names) > 0 else "N/A"}}
        self.call_endpoint("cron", body)

    def getRoutines(self):
        data = self.call_endpoint("routines")
        self.routine_data = data["routines"]
        return self.routine_data

    def getReminders(self):
        data = self.call_endpoint("reminders")
        self.reminder_data = data["reminders"]
        return self.reminder_data

    def getDefinitions(self):
        data = self.call_endpoint("definitions")
        self.definition_data = data["definitions"]
        return self.definition_data

    def getCadenceEnum(self):
        data = self.call_endpoint("cadence")
        self.cadence_data = data["cadence"]
        self.cadence_enum = Enum('Cadence', [(c["cadence"], (c["days"], c["delay"]))
                                             for c in self.cadence_data], module=__name__)
        return self.cadence_enum

    def getContactInfo(self):
        data = self.call_endpoint("contact")
        self.contact_info = data["contact"][0]

    def call_endpoint(self, endpoint, body=None):
        path = f"{os.path.dirname(os.path.dirname(os.path.abspath(__file__)))}/.env"
        load_dotenv(path)

        try:
            if body:
                if endpoint == "cron":
                    res = requests.post(f"{env['URL']}/{endpoint}", json=body,
                                        headers={'Authorization': f"Bearer {env['TOKEN']}"})
                    print(f"res: {res.json()} + endpoint: {endpoint}")
                    return res.status_code
                else:
                    res = requests.put(f"{env['URL']}/{endpoint}", json=body,
                                       headers={'Authorization': f"Bearer {env['TOKEN']}"})
                    print(f"res: {res.json()} + endpoint: {endpoint}")
                    return res.status_code
            else:
                r = requests.get(f"{env['URL']}/{endpoint}",
                                 headers={'Authorization': f"Bearer {env['TOKEN']}"})
                return r.json()
        except requests.exceptions.RequestException as e:
            print(
                f"Unable to retrieve Google Sheet data from /{endpoint}")
            raise SystemExit(e)
