import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { api } from "../../libs/api";

const UpdateUser = ({ show, handleClose, user, refetch }) => {
  const UserUpdateSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3).max(20),
    phone: z.string().min(3).max(20),
    address: z.string().min(3).max(20),
    city: z.string().min(3).max(20),
    zip: z.string().min(3).max(20),
    status: z.enum(["ACTIVE", "INACTIVE"]),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(UserUpdateSchema) });

  useEffect(() => {
    if (user) {
      setValue("email", user.email);
      setValue("name", user.name);
      setValue("phone", user.phone);
      setValue("address", user.address);
      setValue("city", user.city);
      setValue("zip", user.zip);
      setValue("status", user.status);
    }
  }, [user]);

  const updateUser = useMutation((data) => {
    return api.put("admins/users/" + user.id, data).then((res) => {
      refetch();
      handleClose();
    });
    
  });

  const onSubmit = (data) => {
    updateUser.mutate(data);
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("email")}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              <Form.Text className="text-danger">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                {...register("name")}
              />
              <Form.Text className="text-danger">
                {errors.name?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
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

            <Form.Group className="mb-3" controlId="formBasicAddress">
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

            <Form.Group className="mb-3" controlId="formBasicCity">
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

            <Form.Group className="mb-3" controlId="formBasicZip">
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

            <Form.Group className="mb-3" controlId="formBasicStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select {...register("status")}>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </Form.Select>
              <Form.Text className="text-danger">
                {errors.status?.message}
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UpdateUser;
