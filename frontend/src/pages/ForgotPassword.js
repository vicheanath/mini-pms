import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import { apiBaseUrl } from '../libs/constants';
import { Link } from 'react-router-dom';
import{Row , Col, Form, Button,Card} from 'react-bootstrap';

const ForgotPassword = () => {

  const ForgotPasswordSchema = z.object({
    email: z.string().email(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(ForgotPasswordSchema) });

  const forgotPasswordMutation = useMutation(async (data) => {
    fetch(apiBaseUrl + "auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  } );
  return (
    <div>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="mt-5">
            <Card.Body>
              <Card.Title className="text-center">Forgot Password</Card.Title>
              <Form onSubmit={handleSubmit(forgotPasswordMutation.mutate)}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <Form.Text className="text-danger">
                      {errors.email.message}
                    </Form.Text>
                  )}
                </Form.Group>
                <Button variant="primary" type="submit">
                  Reset Password
                </Button>
                <Link to="/login" className="btn btn-link">
                  Login
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ForgotPassword