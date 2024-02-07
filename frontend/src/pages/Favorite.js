import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import Property from "../components/Property";
import { Row, Col } from "react-bootstrap";
import { api } from "../libs/api";
const Favorite = () => {
  const { data, isLoading, isError ,refetch} = useQuery(`favorites`);

  
  if (isLoading) return <Loading />;
  return (
    <div className="container">
      <h2 className="mt-4">Favorite</h2>
      <Row>
        {data.map((property) => {
          return (
            <Col md={4} key={property.id}>
              <Property key={property.id} {...property} refetch={refetch} />
            </Col>
          )
        })}
      </Row>
    </div>
  );
};

export default Favorite;
