import React from "react";
import { useQuery } from "react-query";
import { Row, Col, Card, Button, Form, Image, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import Loading from "../components/Loading";
import { api } from "../libs/api";
import avatar from "../images/avatar.jpg";
const Profile = () => {
  const { data, isLoading, isError, refetch } = useQuery("users/profile");
  const ProfileSchema = z.object({
    phone: z.string().nullable(),
    address: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    zip: z.string().nullable(),
  });

  const ChangePasswordSchema = z
    .object({
      oldPassword: z.string().min(3).max(20),
      newPassword: z.string().min(3).max(20),
      confirmNewPassword: z.string().min(3).max(20),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(ProfileSchema) });

  if (data) {
    setValue("phone", data.phone);
    setValue("address", data.address);
    setValue("city", data.city);
    setValue("zip", data.zip);
    setValue("state", data.state);
  }

  const {
    register: registerChangePassword,
    handleSubmit: handleSubmitChangePassword,
    formState: { errors: errorsChangePassword },
  } = useForm({ resolver: zodResolver(ChangePasswordSchema) });

  const updateProfile = useMutation((data) => {
    return api.put("users/profile", data);
  });

  const changePassword = useMutation((data) => {
    return api
      .put("users/change-password", data)
      .then((res) => res.data)
      .catch((err) => {
        alert(err.response.data.message);
      });
  });

  const onSubmit = (data) => {
    updateProfile.mutate(data);
    refetch();
  };

  const onChangePassword = (data) => {
    changePassword
      .mutate(data)
      
  };

  console.log(changePassword);

  if (isError) return <div>Error loading profile</div>;
  if (isLoading) return <Loading />;



  return (
    <div className="mt-3">
      <h3>Profile</h3>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Image src={avatar} roundedCircle width="100" height="100" />
              <Card.Title>{data.name}</Card.Title>
              <Card.Text>Email: {data.email || "N/A"}</Card.Text>
              <Card.Text>Phone: {data.phone || "N/A"}</Card.Text>
              <Card.Text>Address: {data.address || "N/A"}</Card.Text>
              <Card.Text>City:{data.city || "N/A"}</Card.Text>
              <Card.Text>State:{data.state || "N/A"}</Card.Text>
              <Card.Text>Zip:{data.zip || "N/A"}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Update Profile</Card.Title>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Alert
                  variant="success"
                  show={updateProfile.isSuccess}
                  onClose={() => updateProfile.reset()}
                  dismissible
                >
                  Profile updated successfully
                </Alert>

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
                <Alert
                  variant="success"
                  show={changePassword.isSuccess}
                  onClose={() => changePassword.reset()}
                  dismissible
                >
                  Password changed successfully
                </Alert>
                <Alert
                  variant="danger"
                  show={changePassword.isError}
                  onClose={() => changePassword.reset()}
                  dismissible
                >
                  {changePassword.error?.message}
                </Alert>

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
                    {...registerChangePassword("confirmNewPassword")}
                  />
                  <Form.Text className="text-danger">
                    {errorsChangePassword.confirmNewPassword?.message}
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
