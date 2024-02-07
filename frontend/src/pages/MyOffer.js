import React from "react";
import { useQuery } from "react-query";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Table, Badge } from "react-bootstrap";
import { api } from "../libs/api";
import { formatMoney } from "../utils/money";
import { Link } from "react-router-dom";

const MyOffer = () => {
  const query = new URLSearchParams(window.location.search);
  const { data, isLoading, isError, refetch } = useQuery(
    `offers/customer?${query.toString()}`
  );
  const navigate = useNavigate();

  const handleCancel = (id) => {
    api.put(`offers/cancel/${id}`).then((res) => {
      refetch();
    });
  };

  if (isLoading) return <Loading />;
  return (
    <div className="mt-4">
      <h3>My Offers</h3>
      <Row className="mt-4">
        <Col md={12}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Property</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              
              {data?.data.map((offer, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/property/${offer.property.id}`}>
                      {offer.property.title}
                    </Link>
                  </td>
                  <td>{formatMoney(offer.price)}</td>
                  <td>
                    <Badge bg="primary">{offer.status}</Badge>
                  </td>
                  <td>
                    {offer.status !== "CANCELLED" ? (
                      <Button
                        variant="danger"
                        onClick={() => handleCancel(offer.id)}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <Button variant="secondary" disabled>
                        Cancel
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default MyOffer;
