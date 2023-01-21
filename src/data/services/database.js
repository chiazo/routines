import firebase from "./firebase_config";

const db = firebase.db.ref("routines");

const getAllRoutines = (setRoutines) => {
  return db.on("value", function (snapshot) {
    const dto = snapshot.val();

    if (!dto) {
      setRoutines([]);
      return;
    }

    const result = Object.keys(dto).map((id) => ({
      id,
      name: dto[id].name,
      category: dto[id].category,
      deliveryMethod: dto[id].deliveryMethod,
      cadence: dto[id].cadence,
      created: dto[id].created,
      startDate: dto[id].startDate,
      nextDate: dto[id].nextDate,
    }));

    setRoutines(Object.values(result));
  });
};

const createRoutine = (routine) => {
  // this generates a unique id for any data that's about to be sent to the database
  const newRoutine = db.push();
  console.log("newRoutine", newRoutine);
  // this passes the data to the database
  // newRoutine.set(
  //   {
  //     name: routine.name,
  //     category: routine.category,
  //     deliveryMethod: routine.delivery_method.name,
  //     cadence: routine.cadence.name,
  //     created: routine.created.getTime(),
  //     startDate: routine.start_date.getTime(),
  //     nextDate: routine.next_date.getTime(),
  //   },
  //   (error) => {
  //     if (error) {
  //       console.log("Data could not be saved." + error);
  //     } else {
  //       console.log("Data saved successfully.");
  //     }
  //   }
  // );
  console.log("key", newRoutine.key);
  // we return the generated key to store it locally :)
  return newRoutine.key;
};

const updateRoutine = (id, routine, date) => {
  // TODO: using db.child & chaining on the .update method, finish the code to update a routine already in the database
  // this is meant to be challenging, so you'll need to google how to use .update
  // tip: db is already equal to firebase.database.ref("routines")
};

/**CHALLENGE: create a function called removeRoutine that takes in an id and deletes a routine in the database
 *
 */

const methods = {
  getAllRoutines,
  createRoutine,
  updateRoutine,
  // don't forget to export removeRoutine if you write it
};

export default methods;
