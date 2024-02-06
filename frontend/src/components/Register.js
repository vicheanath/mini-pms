import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import { login, setUser } from "../features/authSlice";
import { jwtDecode } from "jwt-decode";
import { apiBaseUrl } from "../libs/constants";
import { accessTokenKey, refreshTokenKey } from "../libs/api";
const Register = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const RegisterSchema = z
    .object({
      role: z.enum(["Customer", "Owner"]),
      email: z.string().email(),
      password: z.string().min(3).max(20),
      repeatPassword: z.string().min(3).max(20),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: "Passwords do not match",
      path: ["repeatPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(RegisterSchema) });

  const doRegister = (url, data) => {
    fetch(apiBaseUrl + url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        handleClose();
        
      });
  };

  const registerMutation = useMutation((data) => {
    switch (data.role) {
      case "Customer":
        doRegister("auth/customer/register", data);
        break;
      case "Owner":
        doRegister("auth/owner/register", data);
        break;
      default:
        break;
    }
  });

  const onSubmit = (data) => {
    registerMutation.mutate(data);
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rigister</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group
              className="mb-3 d-flex gap-3"
              controlId="formBasicEmail"
              htmlFor="role"
            >
              <Form.Label>
                <input
                  {...register("role")}
                  value="Customer"
                  type="radio"
                  className="me-2 form-check-input"
                  checked
                />
                Customer
              </Form.Label>
              <Form.Label>
                <input
                  {...register("role")}
                  value="Owner"
                  type="radio"
                  className="me-2 form-check-input"
                />
                Owner
              </Form.Label>
              <Form.Text className="text-danger">
                {errors.role?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control {...register("email")} placeholder="Enter email" />
              <Form.Text className="text-danger">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...register("password")}
                placeholder="Password"
                type="password"
              />
              <Form.Text className="text-danger">
                {errors.password?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                {...register("repeatPassword")}
                placeholder="Repeat Password"
                type="password"
              />
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
};

export default Register;
