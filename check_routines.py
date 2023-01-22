import os
import sys


from data.routines import Routines


def main():
    sheet = Routines()
    sheet.updateRoutines()


# TODO:
# - BONUS: add reminders (not routine, just like a to do list)

if __name__ == "__main__":
    main()
