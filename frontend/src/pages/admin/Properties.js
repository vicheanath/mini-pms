import React from "react";
import { Row, Col, Table, Button, Form, Badge, Image } from "react-bootstrap";
import { useQuery } from "react-query";
import Loading from "../../components/Loading";
import { formatMoney } from "../../utils/money";
import { useNavigate } from "react-router-dom";
const Properties = () => {
  const query = new URLSearchParams(window.location.search);
  const { data, isLoading, isError } = useQuery(
    `properties?${query.toString()}`
  );
  const navi = useNavigate();
  if (isLoading) return <Loading />;
  return (
    <div>
      <h2>Properties</h2>
      <Row>
        <Col>
          <Form 
            className="d-flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const search = e.target[0].value;
              if (search) {
                query.set("search", search);
              } else {
                query.delete("search");
              }
              navi("/admin/properties?" + query.toString());
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Search" />
              <Form.Text className="text-muted">
                Search by location or title
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Button">
            <Button variant="primary" type="submit">
              Search
            </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Type</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Rooms</th>
                <th>Picture</th>
                <th>Price</th>
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
                    <td>
                      <Badge
                        bg={property.type === "SELL" ? "danger" : "primary"}
                      >
                        {property.type}
                      </Badge>
                    </td>
                    <td>{property.category}</td>
                    <td>{property.subCategory}</td>
                    <td>{property.numberOfRoom} Room(s)</td>
                    <td>
                      <Image
                        src={property.pictures[0]}
                        alt={property.title}
                        width="100"
                        className="img-fluid rounded"
                      />
                    </td>
                    <td className="text-end">{formatMoney(property.price)}</td>
                    <td>
                      <Badge bg="primary">{property.status}</Badge>
                    </td>
                    <td>
                      <span className="d-flex gap-2">
                        <Button
                          variant="primary"
                          onClick={() => navi(`/property/${property.id}`)}
                        >
                          View
                        </Button>
                      </span>
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
