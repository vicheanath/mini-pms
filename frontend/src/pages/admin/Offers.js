import React from 'react'
import { useQuery } from 'react-query'
import { Row, Col, Button, Table, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { api } from "../../libs/api";
import Loading from '../../components/Loading';

const Offers = () => {
  const query = new URLSearchParams(window.location.search);
  const { data, isLoading, isError, refetch } = useQuery(
    `offers?${query.toString()}`
  );
  const navigate = useNavigate();

  if (isLoading) return <Loading />;
  return (
    <div>
      <h1>Offers</h1>
      <Row className="mt-4">
        <Col md={2}>
          <select
            className="form-select"
            onChange={(e) => {
              if (e.target.value === "") {
                query.delete("status");
              } else
              query.set("status", e.target.value);
              navigate("/admin/offers?" + query.toString());
            }}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Property</th>
                <th>Offer</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((offer, index) => (
                <tr key={offer.id}>
                  <td>{index + 1}</td>
                  <td>{offer.remark}</td>
                  <td>{offer.amount}</td>
                  <td>
                    <Badge bg={offer.status === "Pending" ? "warning" : offer.status === "Approved" ? "success" : "danger"}>{offer.status}</Badge>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        api.post(`admins/offers/${offer.id}/approve`).then((res) => {
                          refetch();
                        });
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        api.post(`admins/offers/${offer.id}/reject`).then((res) => {
                          refetch();
                        });
                      }}
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  )
}

export default Offers