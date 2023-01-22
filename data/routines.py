import requests
from os import environ as env
from datetime import datetime
from dotenv import load_dotenv
from enum import Enum
from .routine import Routine


class Routines:
    def __init__(self) -> None:
        self.routine_data = {}
        self.definition_data = {}
        self.cadence_data = {}
        self.cadence_enum = None
        self.getRoutines()
        self.getDefinitions()
        self.getCadenceEnum()

    def updateRoutines(self):
        updated_routines = []
        for routine in self.routine_data:
            r = Routine(routine['id'], routine['name'], routine['category'], routine['cadence'], routine['deliveryMethod'], datetime.strptime(
                routine['lastDate'], '%m/%d/%Y'), datetime.strptime(routine['nextDate'], '%m/%d/%Y'), routine['iterations'], datetime.strptime(routine['created'], '%m/%d/%Y'), self.cadence_enum)
            updated = r.update()
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
        self.cadence_enum = Enum("C", [(c["cadence"], c["days"])
                                       for c in self.cadence_data])
        return self.cadence_enum

    def call_endpoint(self, endpoint, body=None):
        load_dotenv(".env")

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