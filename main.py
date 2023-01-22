from data.routines import Routines


def main():
    sheet = Routines()
    sheet.updateRoutines()


# TODO:
# - add daily chron job
# - add reminders (based on cadence)
# - BONUS: add reminders (not routine, just like a to do list)

if __name__ == "__main__":
    main()
