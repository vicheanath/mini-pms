import React from "react";
import { Button, Form, Card, Container, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const Login = () => {
  const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(20),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(LoginSchema) });

  const onSubmit = (data) => console.log(data);
  console.log(errors);
  return (
    <Container>
      <div className="text-center mt-5">
        <h1 className="h1">Property Management System</h1>
      </div>
      <Card
        style={{
          width: "18rem",
          margin: "auto",
          marginTop: "50px",
          padding: "10px",
        }}
      >
        <Card.Body>
          <Card.Title className="text-center mb-5">
            <h2>Login</h2>
          </Card.Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control {...register("email")} placeholder="Enter email" />
              <Form.Text className="text-danger">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control {...register("password")} placeholder="Password" />
              <Form.Text className="text-danger">
                {errors.password?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ width: "100%" }}>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
