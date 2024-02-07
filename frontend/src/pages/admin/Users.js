import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { Row, Col, Button, Table, Badge } from "react-bootstrap";
import { useQuery } from "react-query";
import UpdateUser from "./UpdateUser";

const Users = () => {
  const { data, isLoading, isError, refetch } = useQuery("users");
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <Row className="mt-4">
      <UpdateUser
        show={openUpdate}
        setOpen={setOpenUpdate}
        user={selectedUser}
        refetch={refetch}
        handleClose={() => setOpenUpdate(false)}
      />
      <Col md={12}>
        <h3>Users</h3>
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
            {data?.map((user, index) => {
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
                      variant="danger"
                      onClick={() => {
                        setSelectedUser(user);
                        setOpenUpdate(true);
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        refetch();
                      }}
                    >
                      Set Password
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        refetch();
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default Users;
