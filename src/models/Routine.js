import { Cadence, Category, DeliveryMethod } from ".";

class Routine {
  static default_limit = 3;
  #_id;
  #_name;
  #_category;
  #_delivery_method;
  #_cadence;
  #_limit;
  #_created;
  #_start_date;
  #_next_date;
  #_iterations;

  constructor(name) {
    this.#_name = name;
    this.#_created = new Date();
    this.#_category = Category.Life;
    this.#_iterations = 0;
    this.#_limit = Routine.default_limit;
    this.#_delivery_method = DeliveryMethod.Email;
    this.#_cadence = Cadence.Weekly;
    this.#_start_date = this.#_cadence._start_date;
    this.#_next_date = this.#_cadence.next_date;
  }

  // METHODS
  increment_iterations() {
    this.#_iterations++;
  }

  reset_iterations() {
    this.#_iterations = 0;
    this.#_start_date = new Date();
  }

  reset_cadence() {
    this.#_cadence = Cadence.Weekly;
  }

  snooze(freq, measure_of_time) {
    this.#_cadence.snooze(freq, measure_of_time);
  }

  change_category(category) {
    this.#_category = category;
  }

  // SETTERS
  set id(id) {
    this.#_id = id;
  }
  set name(name) {
    this.#_name = name;
  }
  set category(category) {
    this.#_category = category;
  }
  set delivery_method(delivery_method) {
    this.#_delivery_method = delivery_method;
  }
  set cadence(cadence) {
    this.#_cadence = cadence;
  }
  set limit(limit) {
    this.#_limit = Math.min(limit, Routine.limit);
  }
  set start_date(start_date) {
    this.#_start_date = start_date;
  }
  set next_date(next_date) {
    this.#_next_date = next_date;
  }

  // GETTERS
  get name() {
    return this.#_name;
  }

  get category() {
    return this.#_category;
  }

  get delivery_method() {
    return this.#_delivery_method;
  }

  get cadence() {
    return this.#_cadence;
  }

  get limit() {
    return this.#_limit;
  }

  get start_date() {
    return this.#_start_date;
  }

  get next_date() {
    return this.#_next_date;
  }

  get iterations() {
    return this.#_iterations;
  }

  get created() {
    return this.#_created;
  }
}

export default Routine;
