import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import { formatMoney } from "../utils/money";
import { api } from "../libs/api";
const Property = ({
  price,
  numberOfRoom,
  type,
  location,
  pictures,
  id,
  offerStatus,
  favorite,
  refetch,
  viewOffer,
}) => {
  const addFavorite = async (id) => {
    api.post(`favorites/${id}`).then((res) => {
      console.log(res);
    });
  };
  const removeFavorite = (id) => {
    api.delete(`favorites/${id}`).then((res) => {
      console.log(res);
    });
  };
  return (
    <Card>
      <Card.Img variant="top" src={pictures[0]} height={300} img-fluid />
      <Card.Body>
        <Link to={`/property/${id}`}>
          <Card.Title>{formatMoney(price)}</Card.Title>
        </Link>
        <Card.Text className="d-flex justify-content-between">
          <span>Location: {location} </span>
         
        </Card.Text>
        <div className="d-flex justify-content-between">
          <span>
            <span className="me-3">
             Rooms: {numberOfRoom}</span> 
            <Badge bg={
              offerStatus === "PENDING"
                ? "warning"
                : offerStatus === "APPROVED"
                ? "success"
                : "danger"
            }>{offerStatus}</Badge>
          </span>
        
        <Button
          variant={favorite ? "danger" : "primary"}
          onClick={() => {
            favorite ? removeFavorite(id) : addFavorite(id);
            refetch();
          }}
        >
          {favorite ? <MdOutlineFavorite /> : <MdFavoriteBorder />}
        </Button>
        {
          viewOffer && (
            <Button
              variant="secondary"
              onClick={() => viewOffer(id)}
            >
              View Offer
            </Button>
          )
        }
        </div>
      </Card.Body>
    </Card>
  );
};

export default Property;
