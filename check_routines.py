from data.routines import Routines


def main():
    sheet = Routines()
    sheet.updateRoutines()
    sheet.updateReminders()


if __name__ == "__main__":
    main()
