import React from "react";
import { useQuery } from "react-query";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Table, Badge } from "react-bootstrap";
import { api } from "../libs/api";
import { formatMoney } from "../utils/money";
const Offers = () => {
  const query = new URLSearchParams(window.location.search);
  const { data, isLoading, isError, refetch } = useQuery(
    `offers?${query.toString()}`
  );
  const navigate = useNavigate();

  const handleAccept = (id) => {
    api.put(`offers/accept/${id}`).then((res) => {
      refetch();
    });
  };
  const handleCancel = (id) => {
    api.put(`offers/cancel/${id}`).then((res) => {
      refetch();
    });
  };

  const handleReject = (id) => {
    api.put(`offers/reject/${id}`).then((res) => {
      refetch();
    });
  };

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
              } else query.set("status", e.target.value);
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
                <th>Price</th>
                <th>Status</th>
                <th>Create At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((offer, index) => (
                <tr key={offer.id}>
                  <td>{index + 1}</td>
                  <td>{offer.remark}</td>
                  <td>{offer?.customer?.name}</td>
                  <td>{formatMoney(offer.price)}</td>
                  <td>
                    <Badge
                      bg={
                        offer.status === "PENDING"
                          ? "warning"
                          : offer.status === "APPROVED"
                          ? "success"
                          : "danger"
                      }
                    >
                      {offer.status}
                    </Badge>
                  </td>
                  <td>{new Date(offer.createdAt).toLocaleString()}</td>
                  <td className="d-flex gap-2">
                    {offer.status === "PENDING" && (
                      <>
                        <Button
                          variant="primary"
                          onClick={() => handleAccept(offer.id)}
                        >
                          Accept
                        </Button>

                        <Button
                          variant="danger"
                          onClick={() => handleReject(offer.id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {offer.status === "ACCEPTED" && (
                      <Button
                        variant="danger"
                        onClick={() => handleCancel(offer.id)}
                      >
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

export default Offers;
