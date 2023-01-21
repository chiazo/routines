import { useState } from "react";

import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const updatePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const authenticate = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };
  return (
    <Form onSubmit={authenticate}>
      <Form.Group>
        <Row>
          <Col>
            <FormControl
              type="email"
              placeholder="Enter email"
              onChange={updateEmail}
            />
          </Col>
          <Col>
            <FormControl
              type="password"
              placeholder="Password"
              onChange={updatePassword}
            />
          </Col>
          <Col>
            <Button className="save-btn" type="submit">
              Login
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
};

export default Login;
