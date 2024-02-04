import React from "react";
import { Button, Form, Card, Container } from "react-bootstrap";
const Login = () => {
  return (
    <Container>
      <Card
        style={{
          width: "18rem",
          margin: "auto",
          marginTop: "50px",
          padding: "20px",
        }}
      >
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ width: "100%" }}>
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
