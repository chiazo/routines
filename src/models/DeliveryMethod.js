class DeliveryMethod {
  static Email = new DeliveryMethod("Email");
  static Phone = new DeliveryMethod("Phone");

  constructor(name) {
    this.name = name;
  }
}

export default DeliveryMethod;
