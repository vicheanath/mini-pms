import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import axios from "axios";
const Users = () => {
  const [loading, setLoading] = useState(true);
  const { data, isLoading, isError, refetch } = useQuery("users");
  console.log(data);

  return (
    <div>
      <nav>
        <Row className="mt-4">
          <Col>
            <div className="d-flex gap-2">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search by Name"
                aria-label="Search"
                id="searchByName"
              />
              <Button variant="outline-primary">Search</Button>
            </div>
          </Col>
          <Col>
            <div className="d-flex gap-2">
              <select
                className="form-select"
                aria-label="Default select example"
                value="all"
              >
                <option value="all">All</option>
                <option value="owner">Owner</option>
                <option value="customer">Customer</option>
              </select>
            </div>
          </Col>
        </Row>
      </nav>

      <div>
        <h2>User List</h2>
        <p>Loading...</p> : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Id</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>{user.roles[0].name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        ) =
      </div>
    </div>
  );
};

export default Users;
