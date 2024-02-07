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
  status,
  favorite,
  refetch,
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
      <Card.Img variant="top" src={pictures[0]} />
      <Card.Body>
        <Link to={`/property/${id}`}>
          <Card.Title>{formatMoney(price)}</Card.Title>
        </Link>
        <Card.Text>
          <span>Location: {location} </span>
          <span>Rooms: {numberOfRoom}</span>
          <Badge bg="primary">{status}</Badge>
        </Card.Text>
        <Button
          variant={favorite ? "danger" : "primary"}
          onClick={() => {
            favorite ? removeFavorite(id) : addFavorite(id);
            refetch();
          }}
        >
          {favorite ? <MdOutlineFavorite /> : <MdFavoriteBorder />}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Property;
