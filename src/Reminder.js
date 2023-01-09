import { useState } from "react";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

const Reminder = ({
  id,
  reminder,
  date,
  changeEditStatus,
  edit,
  currReminderId,
  saveReminder,
  disabled,
}) => {
  const [currReminder, setCurrReminder] = useState(reminder);

  const editReminder = (e) => {
    if (currReminderId !== id) {
      changeEditStatus(id);
    }
    setCurrReminder(e.target.value);
  };

  const save = () => {
    // TODO: call saveReminder with id & the currReminder state variable
  };

  const isCurrReminder = currReminderId === id;

  return (
    <div className="col-3 reminder" key={id}>
      <Form>
        <Form.Group>
          {/** TODO: pass a couple important props to each Reminder component
           * pass reminder to the defaultValue prop
           * pass the editReminder function to the onChange prop
           * pass disabled to the disabled prop
           */}
          <FormControl as="textarea" rows={5} />
          <InputGroup.Append>
            {edit && isCurrReminder && (
              // TODO: pass the save function to the onClick prop of Button
              <Button className="save-btn">Save</Button>
            )}
          </InputGroup.Append>
        </Form.Group>
      </Form>
      {/**For fun: figure out other ways to display the date */}
      <div className="date">{date.toLocaleString()}</div>
    </div>
  );
};

export default Reminder;
