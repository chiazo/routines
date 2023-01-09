import firebase from "./firebase_config";

const db = firebase.db.ref("reminders");

const getAllReminders = (setReminders) => {
  return db.on("value", function (snapshot) {
    const dto = snapshot.val();

    // TODO: if dto is null, pass an empty array to setReminders & return early

    // firebase returns an object full of objects, with the unique id as each inner object's key
    // this manipulates that data so each inner object contains this unique id as a property
    const result = Object.keys(dto).map((id) => ({
      id,
      reminder: dto[id].reminder,
      date: dto[id].date,
    }));

    setReminders(Object.values(result));
  });
};

const createReminder = (data) => {
  // this generates a unique id for any data that's about to be sent to the database
  const newReminder = db.push();
  // this passes the data to the database
  newReminder.set(data);
  // we return the generated key to store it locally :)
  return newReminder.key;
};

const updateReminder = (id, reminder, date) => {
  // TODO: using db.child & chaining on the .update method, finish the code to update a reminder already in the database
  // this is meant to be challenging, so you'll need to google how to use .update
  // tip: db is already equal to firebase.database.ref("reminders")
};

/**CHALLENGE: create a function called removeReminder that takes in an id and deletes a reminder in the database
 *
 */

const methods = {
  getAllReminders,
  createReminder,
  updateReminder,
  // don't forget to export removeReminder if you write it
};

export default methods;
