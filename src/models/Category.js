export class Category {
  static Life = new Category("Life");
  static Work = new Category("Work");
  static Home = new Category("Home");
  static Art = new Category("Art");
  static Social = new Category("Social");

  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  toString() {
    return `Category.${this._name}`;
  }
}

export class Categories {
  #categories;

  static defaults = [
    Category.Life,
    Category.Work,
    Category.Home,
    Category.Art,
    Category.Social,
  ];

  get categories() {
    return this.#categories;
  }

  addCategory(name) {
    this.#categories = [...Categories.defaults, new Category(name)];
  }

  removeCategory(name) {
    this.#categories = this.#categories.filter((c) => c.name() !== name);
  }

  from(category) {
    let foundCategory = Categories.defaults.find((x) => x.name === category);
    if (!foundCategory) return;
    return foundCategory;
  }
}
