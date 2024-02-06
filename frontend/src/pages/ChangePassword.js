import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { apiBaseUrl } from "../libs/constants";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
const ChangePassword = () => {
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");

  const ChangePasswordSchema = z
    .object({
      newPassword: z.string().min(3).max(20),
      confirmNewPassword: z.string().min(3).max(20),
      token: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: { token },
  });

  const changePasswordMutation = useMutation(async (data) => {
    fetch(apiBaseUrl + "auth/change-password", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  });
  const onSubmit = (data) => {
    console.log(data);
    changePasswordMutation.mutate(data);
  };

  return (
    <div>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="mt-5">
            <Card.Body>
              <Card.Title className="text-center">Change Password</Card.Title>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    {...register("newPassword")}
                  />
                  <Form.Text className="text-danger">
                    {errors?.newPassword?.message}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    {...register("confirmNewPassword")}
                  />
                  {errors.confirmNewPassword && (
                    <Form.Text className="text-danger">
                      {errors.confirmNewPassword.message}
                    </Form.Text>
                  )}
                </Form.Group>
                <Button variant="primary" type="submit">
                  Change Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ChangePassword;
