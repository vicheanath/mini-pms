import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { Row, Col, Button, Table, Badge } from "react-bootstrap";
import { useQuery } from "react-query";
import UpdateUser from "./UpdateUser";
import { useNavigate } from "react-router-dom";
import {FiCheck,FiEdit,FiEdit2} from "react-icons/fi";
import { api } from "../../libs/api";

const Users = () => {
  const query = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useQuery(
    `admins/users?${query.toString()}`
  );

  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleApprove = (id) => {
   api.post(`admins/users/${id}/approve`).then((res) => {
      refetch();
    });
  };
  return (
    <div>
      <h1>Users</h1>
      <Row className="mt-4">
        <Col md={2}>
          <select
            className="form-select"
            onChange={(e) => {
              if (e.target.value === "") {
                query.delete("role");
              } else
              query.set("role", e.target.value);
              navigate("/admin/users?" + query.toString());
            }}
          >
            <option value="">All</option>
            <option value="Admin">Admin</option>
            <option value="Customer">Customer</option>
            <option value="Owner">Owner</option>
          </select>
        </Col>
      </Row>
      <Row className="mt-4">
        <UpdateUser
          show={openUpdate}
          setOpen={setOpenUpdate}
          user={selectedUser}
          refetch={refetch}
          handleClose={() => setOpenUpdate(false)}
        />
        <Col md={12}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((user, index) => {
                const isCustomer = user.roles.find(
                  (role) => role.role === "Owner"
                ) && user.status === "INACTIVE";
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.roles.map((role) => {
                        return <Badge bg="primary">{role.role}</Badge>;
                      })}
                    </td>
                    <td>{user.address}</td>
                    <td>{user.phone}</td>
                    <td>
                      <Badge bg="primary">{user.status}</Badge>
                    </td>
                    <td className="d-flex gap-2">
                      <Button
                        variant="primary"
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenUpdate(true);
                        }}
                      >
                        <FiEdit /> Update
                      </Button>
                      {isCustomer ? (
                        <Button variant="success" onClick={ () => handleApprove(user.id)}>
                          <FiCheck /> Approve
                        </Button>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default Users;
