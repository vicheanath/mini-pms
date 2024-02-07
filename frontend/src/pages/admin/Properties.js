import React from "react";
import { Row, Col, Table, Button, Form, Badge } from "react-bootstrap";
import { useQuery } from "react-query";
import Loading from "../../components/Loading";
const Properties = () => {
  const { data, isLoading, isError } = useQuery(`properties`);
  if (isLoading) return <Loading />;
  return (
    <div>
      <h2>Properties</h2>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Search" />
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <div className="d-flex gap-2">
            <Button variant="primary">Add Property</Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Price</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((property) => {
                return (
                  <tr key={property.id}>
                    <td>{property.id}</td>
                    <td>{property.title}</td>
                    <td>{property.price}</td>
                    <td>{property.location}</td>
                    <td>
                      <Badge bg="primary">{property.status}</Badge>
                    </td>
                    <td>
                      <Button variant="primary">Edit</Button>
                      <Button variant="danger">Delete</Button>
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

export default Properties;
