import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { api } from "../libs/api";
const Register = ({ show, handleClose }) => {
  const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(20),
    repeatPassword: z.string().min(3).max(20),
  }).refine(data => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(LoginSchema) });

  const loginMutation = useMutation((data) => {
    api.post("/auth/register", data);
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rigister</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control {...register("repeatPassword")} placeholder="Repeat Password" />
              <Form.Text className="text-danger">
                {errors.repeatPassword?.message}
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" style={{ width: "100%" }}>
              Register 
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Register