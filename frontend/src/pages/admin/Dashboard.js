import React from "react";
import { Card, Button, Row, Col, Badge, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const { data: properties, isLoading: propertiesLoading } = useQuery(
    "properties?size=10&sort=createdAt,desc"
  );
  const { data: users, isLoading: usersLoading } = useQuery(
    "admins/users?size=10&sort=createdAt,desc"
  );
  const { data: offers, isLoading: offersLoading } = useQuery(
    "offers?size=10&sort=createdAt,desc"
  );
  const navigate = useNavigate();
  return (
    <div className="mt-4">
      <h3>Dashboard</h3>
      {/* <Row>
        <Col md={4}>
          <Card bg="success" text="white">
            <Card.Body>
              <Card.Title>Properties</Card.Title>
              <Card.Text>10</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="primary" text="white">
            <Card.Body>
              <Card.Title>Users</Card.Title>
              <Card.Text>10</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="danger" text="white">
            <Card.Body>
              <Card.Title>Offers</Card.Title>
              <Card.Text>10</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <h5>Recent 10 Properties</h5>
              <Button
                variant="primary"
                size="sm"
                className="float-right"
                onClick={() => navigate("/admin/properties")}
              >
                View All
              </Button>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {propertiesLoading ? (
                    <tr>
                      <td colSpan="4">Loading...</td>
                    </tr>
                  ) : (
                    properties?.data.map((property, index) => (
                      <tr key={property.id}>
                        <td>{index + 1}</td>
                        <td>{property.title}</td>
                        <td>{property.price}</td>
                        <td>
                          <Badge variant="primary">
                            {property.status}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <h5>Recent Offers</h5>
              <Button
                variant="primary"
                size="sm"
                className="float-right"
                onClick={() => navigate("/admin/offers")}
              >
                View All
              </Button>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Property</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {offers?.data.map((offer, index) => (
                    <tr key={offer.id}>
                      <td>{offer.id}</td>
                      <td>{offer.property.title}</td>
                      <td>{offer.price}</td>
                      <td>
                      <Badge bg={offer.status === "PENDING" ? "warning" : offer.status === "APPROVED" ? "success" : "danger"}>{offer.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <h5>Recent 10 Users</h5>
              <Button
                variant="primary"
                size="sm"
                className="float-right"
                onClick={() => navigate("/admin/users")}
              >
                View All
              </Button>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {usersLoading ? (
                    <tr>
                      <td colSpan="4">Loading...</td>
                    </tr>
                  ) : (
                    users?.data.map((user, index) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <Badge variant={user.status === "ACTIVE" ? "success" : "danger"}>
                            {user.status}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
