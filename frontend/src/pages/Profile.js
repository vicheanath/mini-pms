import React from "react";
import { useQuery } from "react-query";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  FormControl,
  Image,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import Loading from "../components/Loading";
import { api } from "../libs/api";
const Profile = () => {
  const { data, isLoading, isError, refetch } = useQuery("users/profile");
  const ProfileSchema = z.object({
    phone: z.string().min(3).max(20),
    address: z.string().min(3).max(20),
    city: z.string().min(3).max(20),
    zip: z.string().min(3).max(20),
  });

  const ChangePasswordSchema = z
    .object({
      oldPassword: z.string().min(3).max(20),
      newPassword: z.string().min(3).max(20),
      confirmPassword: z.string().min(3).max(20),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(ProfileSchema) });

  const {
    register: registerChangePassword,
    handleSubmit: handleSubmitChangePassword,
    formState: { errors: errorsChangePassword },
  } = useForm({ resolver: zodResolver(ChangePasswordSchema) });

  const updateProfile = useMutation((data) => {
    return api.put("users/profile", data);
  });

  const changePassword = useMutation((data) => {
    return api.put("users/change-password", data);
  });

  const onSubmit = (data) => {
    updateProfile.mutate(data);
    // refetch();
  };

  const onChangePassword = (data) => {
    changePassword.mutate(data);
  };

  if (isError) return <div>Error loading profile</div>;
  if (isLoading) return <Loading />;
  return (
    <div className="mt-3">
      <h3>Profile</h3>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Image src="https://via.placeholder.com/150" roundedCircle />
              <Card.Title>Username</Card.Title>
              <Card.Text>Email: {data.email}</Card.Text>
              <Card.Text>Phone: {data.phone}</Card.Text>
              <Card.Text>Address: {data.address}</Card.Text>
              <Card.Text>City:{data.city}</Card.Text>
              <Card.Text>State:{data.state}</Card.Text>
              <Card.Text>Zip:{data.zip}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Update Profile</Card.Title>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formBasicPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone"
                    {...register("phone")}
                  />
                  <Form.Text className="text-danger">
                    {errors.phone?.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    {...register("address")}
                  />
                  <Form.Text className="text-danger">
                    {errors.address?.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter city"
                    {...register("city")}
                  />
                  <Form.Text className="text-danger">
                    {errors.city?.message}
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter state"
                    {...register("state")}
                  />
                  <Form.Text className="text-danger">
                    {errors.state?.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicZip" className="mb-3">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter zip"
                    {...register("zip")}
                  />
                  <Form.Text className="text-danger">
                    {errors.zip?.message}
                  </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Change Password</Card.Title>
              <Form onSubmit={handleSubmitChangePassword(onChangePassword)}>
                <Form.Group controlId="formBasicOldPassword">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter old password"
                    {...registerChangePassword("oldPassword")}
                  />
                  <Form.Text className="text-danger">
                    {errorsChangePassword.oldPassword?.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicNewPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    {...registerChangePassword("newPassword")}
                  />
                  <Form.Text className="text-danger">
                    {errorsChangePassword.newPassword?.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group
                  controlId="formBasicConfirmPassword"
                  className="mb-3"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter confirm password"
                    {...registerChangePassword("confirmPassword")}
                  />
                  <Form.Text className="text-danger">
                    {errorsChangePassword.confirmPassword?.message}
                  </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Change
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
