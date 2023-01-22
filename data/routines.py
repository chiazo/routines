import requests
import os
from os import environ as env
from dotenv import load_dotenv
from enum import Enum
from .routine import Routine


class Routines:
    def __init__(self) -> None:
        self.routine_data = {}
        self.definition_data = {}
        self.cadence_data = {}
        self.contact_info = {}
        self.cadence_enum = None
        self.getRoutines()
        self.getDefinitions()
        self.getCadenceEnum()
        self.getContactInfo()

    def updateRoutines(self):
        updated_routines = []
        for routine in self.routine_data:
            r = Routine(routine, self.cadence_enum)

            updated = r.update(self.contact_info)
            if updated:
                updated_routines.append(updated)
        self.postUpdatedRoutines(updated_routines)

    def postUpdatedRoutines(self, updates):
        for r in updates:
            body = {"routine": {
                'lastDate': r.lastDate.strftime('%m/%d/%Y'), }}
            self.call_endpoint(f"routines/{r.id}", body)

    def getRoutines(self):
        data = self.call_endpoint("routines")
        self.routine_data = data["routines"]
        return self.routine_data

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
                res = requests.put(f"{env['URL']}/{endpoint}", json=body,
                                   headers={'Authorization': f"Bearer {env['TOKEN']}"})
                print(f"res: {res.json()}")
                return res.status_code
            else:
                r = requests.get(f"{env['URL']}/{endpoint}",
                                 headers={'Authorization': f"Bearer {env['TOKEN']}"})
                return r.json()
        except requests.exceptions.RequestException as e:
            print(
                f"Unable to retrieve Google Sheet data from /{endpoint}")
            raise SystemExit(e)
