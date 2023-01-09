import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useAuthState } from "react-firebase-hooks/auth";

import { app_background } from "./data/markdown";

import Button from "react-bootstrap/Button";

import db from "./data/services/database";
import fb from "./data/services/firebase_config";

import Reminder from "./Reminder";
import Login from "./Login";

const App = () => {
  const [edit, setEdit] = useState(false);
  const [reminders, setReminders] = useState(null);
  const [currReminderId, setCurrReminderId] = useState("");
  const [user] = useAuthState(fb.auth);

  const login = (email, password) => {
    fb.auth
      .signInWithEmailAndPassword(email, password)
      .catch((e) => console.log(e));
  };

  const logout = () => {
    fb.auth.signOut();
  };

  const changeEditStatus = (id) => {
    setCurrReminderId(id);
    if (id !== currReminderId) {
      setEdit(!edit);
    }
  };

  const saveReminder = (id, reminder) => {
    setEdit(!edit);
    if (id) {
      // a.k.a if this reminder already exists in the database & it's being edited
      // TODO: using the "db" variable, call the updateReminder function
      // pass it id, reminder, and a new date object like so: new Date().getTime()
    } else {
      // a.k.a a completely new reminder
      const date = new Date().getTime();
      const savedReminder = { reminder, date };
      const key = db.createReminder(savedReminder); // returns the key from our createReminder function
      if (reminders) {
        // a.k.a if this is not the first reminder ever created in the database
        // TODO: using the spread operator, call setReminders & pass it an array
        // containing what was already in reminders as well as an object containing
        // an id (with the value of the key variable), reminder and date
      } else {
        // a.k.a if this is the first reminder ever made
        // TODO: pass setReminders an array with a single object, containing the same info
        // as the object described in the if block above
      }
    }
  };

  const addReminder = () => {
    // TODO: call saveReminder passing in a null id & empty string
  };

  useEffect(() => {
    // TODO: check if reminders is null. if so, call the getAllReminders method using the variable "db"
    // make sure to pass the setter function for the reminders state variable to getAllReminders
  }, [reminders]);

  return (
    <div className="home">
      <div id="content">
        <ReactMarkdown className="background" source={app_background} />
        <div className="container">
          <div className="justify-content-md-center">
            {user ? (
              <Button onClick={logout}>Logout</Button>
            ) : (
              // TODO: pass the login function as prop called "onLogin" to the Login component
              <Login onLogin={login} />
            )}
          </div>
          <div className="row justify-content-md-center">
            {reminders &&
              reminders.map(({ id, reminder, date }) => (
                /** TODO: pass a whole lot of props to the Reminder component
                 * pass the value of id to the key & id prop
                 * pass the value of reminder, currReminderId, changeEditStatus, edit, saveReminder
                 * the disabled prop will turn off editing when the user isn't logged in
                 */
                <Reminder date={new Date(date)} disabled={!user} />
              ))}
          </div>
          {/**TODO: use the double amperstand (&&) to show a button only if the user variable is not null
           * pass the addReminder function to the Button when clicked
           * This is the Add Reminder button :)
           * TIP: there's an example of how to do this on line 85
           */}
        </div>
      </div>
    </div>
  );
};

export default App;
