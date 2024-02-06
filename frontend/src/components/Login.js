import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { accessTokenKey, refreshTokenKey } from "../libs/api";
import { useDispatch } from "react-redux";
import { login, setUser } from "../features/authSlice";
import { jwtDecode } from "jwt-decode";
import { apiBaseUrl } from "../libs/constants";

const Login = ({ show, handleClose }) => {
  const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(20),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(LoginSchema) });
  const dispatch = useDispatch();

  const loginMutation = useMutation(async (data) => {
    fetch(apiBaseUrl + "auth/token", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const { accessToken, refreshToken } = res;
        dispatch(
          login({
            accessToken: accessToken,
            refreshToken: refreshToken,
          })
        );
        const user = jwtDecode(accessToken);
        dispatch(setUser(user));
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem(accessTokenKey, accessToken);
        localStorage.setItem(refreshTokenKey, refreshToken);
        handleClose();
      });
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
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
              <Form.Control {...register("password")} type="password" placeholder="Password" />
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
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
