import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useAuthState } from "react-firebase-hooks/auth";

import { app_background } from "./data/markdown";

import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import db from "./data/services/database";
import fb from "./data/services/firebase_config";

import Reminder from "./Reminder";
import Login from "./Login";
import { Routine } from "./models";

const App = () => {
  const [edit, setEdit] = useState(false);
  const [routines, setRoutines] = useState(null);
  const [currRoutineId, setCurrRoutineId] = useState("");
  const [routineName, setRoutineName] = useState("");
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
    setCurrRoutineId(id);
    if (id !== currRoutineId) {
      setEdit(!edit);
    }
  };

  const saveRoutine = (id, routineName) => {
    setEdit(!edit);
    if (id) {
      // db.updateRoutine(id, routine_name, new Date().getTime());
      console.log("UPDATE");
    } else {
      const savedRoutine = new Routine(routineName);
      const key = db.createRoutine(savedRoutine);
      savedRoutine.id = key;
      if (routines) {
        setRoutines([...routines, savedRoutine]);
      } else {
        setRoutines([saveRoutine]);
      }
      console.log(key, routines);
    }
  };

  const addRoutine = (e) => {
    e.preventDefault();
    saveRoutine(null, routineName);
  };

  useEffect(() => {
    if (!routines) {
      db.getAllRoutines(setRoutines);
    }
  }, [routines]);

  return (
    <div className="home">
      <div id="content">
        <h1>Test</h1>
        <ReactMarkdown className="background" source={app_background} />
        <div className="container">
          <div className="justify-content-md-center">
            {user ? (
              <Button onClick={logout}>Logout</Button>
            ) : (
              <Login onLogin={login} />
            )}
          </div>
          <div className="row justify-content-md-center">
            {routines &&
              routines.map(({ id, routine, date }) => (
                <Reminder
                  id={id}
                  key={id}
                  routine={routine}
                  currRoutineId={currRoutineId}
                  changeEditStatus={changeEditStatus}
                  edit={edit}
                  saveRoutine={saveRoutine}
                  date={new Date(date)}
                  disabled={!user}
                />
              ))}
          </div>
          {user && (
            <Form onSubmit={addRoutine}>
              <Form.Group>
                <Row>
                  <Col>
                    <FormControl
                      type="routine"
                      placeholder="Enter routine"
                      onChange={setRoutineName}
                    />
                  </Col>
                  <Col>
                    <Button className="save-btn" type="submit">
                      Add Routine
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
