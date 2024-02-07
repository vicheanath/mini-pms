import React from 'react'
import { useQuery } from 'react-query'
import { Row, Col, Button, Table, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loading from '../../components/Loading';
import { formatMoney } from '../../utils/money';

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
                <th>Remark</th>
                <th>Offer By</th>
                <th>Property</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((offer, index) => (
                <tr key={offer.id}>
                  <td>{index + 1}</td>
                  <td>{offer.remark}</td>
                  <td>{offer.customer.name}</td>
                  <td>{offer.property.title}</td>
                  <td className="text-right">{formatMoney(offer.price)}</td>
                  <td>
                    <Badge bg={offer.status === "Pending" ? "warning" : offer.status === "Approved" ? "success" : "danger"}>{offer.status}</Badge>
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