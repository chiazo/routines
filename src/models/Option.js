/**
 *  "View existing routines",
        "Add routine",
        "Edit routine",
        "Delete routine",
 */

export class Option {
  static View = new Option("View", "View existing routines");
  static Add = new Option("Add", "Add a routine");
  static Update = new Option("Update", "Update a routine");
  static Delete = new Option("Delete", "Delete a routine");

  constructor(name, description) {
    this._name = name;
    this._description = description;
  }

  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }

  toString() {
    return `Option.${this._name}`;
  }
}

export class Options {
  #options;

  static defaults = [Option.View, Option.Add, Option.Update, Option.Delete];

  constructor() {
    this.#options = Options.defaults;
  }

  get options() {
    return this.#options;
  }

  addOption(name) {
    this.#options = [...Options.defaults, new Option(name)];
  }

  removeOption(name) {
    if (this.#options) {
      this.#options = this.#options.filter((c) => c.name() !== name);
    }
  }

  from(option) {
    let foundOption = Options.defaults.find((x) => x._name === option);
    if (!foundOption) return;
    return foundOption;
  }
}
