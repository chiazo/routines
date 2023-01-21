import { add, compareDesc } from "date-fns";

class Cadence {
  #_next_date;
  static #default_frequency = 1;
  static Daily = new Cadence("Daily", "days");
  static Weekly = new Cadence("Weekly", "weeks");
  static Monthly = new Cadence("Monthly", "months");
  static Yearly = new Cadence("Yearly", "years");

  constructor(name, property, start_date = new Date()) {
    this._name = name;
    this._property = property;
    this._frequency = Cadence.#default_frequency;
    this._start_date = start_date;
    this.addTime();
  }

  set frequency(freq) {
    this._frequency = freq < 5 ? Math.max(Cadence.#default_frequency, freq) : 4;
  }

  set start_date(date) {
    if (compareDesc(new Date(), date) === 1) {
      this._start_date = date;
    }
  }

  set next_date(date) {
    if (compareDesc(this._start_date, date) === 1) {
      this.#_next_date = date;
    }
  }

  get name() {
    return this._name;
  }

  get frequency() {
    return this._frequency;
  }

  get start_date() {
    return this._start_date;
  }

  get next_date() {
    return this.#_next_date;
  }

  snooze(frequency, length = this._property) {
    this.#_next_date = add(this._start_date, {
      [length]: frequency,
    });
  }

  addTime(frequency = 1) {
    this.#_next_date = add(this._start_date, {
      [this._property]: frequency,
    });
  }

  toString() {
    return `Cadence.${this._name}`;
  }
}

export default Cadence;
