import React from "react";
import { useQuery } from "react-query";
import Loading from "../components/Loading";
import Property from "../components/Property";
import { Row, Col } from "react-bootstrap";
const Favorite = () => {
  const { data, isLoading, isError ,refetch} = useQuery(`favorites`);

  
  if (isLoading) return <Loading />;
  return (
    <div className="container">
      <h2 className="mt-4">Favorite</h2>
      <Row>
        {data.map((property) => {
          return (
            <Col md={4} key={property.id} className="mb-4">
              <Property key={property.id} {...property} refetch={refetch} unFav={true} />
            </Col>
          )
        })}
      </Row>
    </div>
  );
};

export default Favorite;
