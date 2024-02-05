import React from "react";
import { Card, Button } from "react-bootstrap";
import { MdFavoriteBorder } from "react-icons/md";

const Property = ({
  price,
  numberOfRooms,
  type,
  location,
  image,
  addToFavorite,
}) => {
  return (
    <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{type}</Card.Title>
        <Card.Text>
          Price: {price} <br />
          Location: {location} <br />
          Rooms: {numberOfRooms} <br />
        </Card.Text>
        <Button variant="primary" onClick={addToFavorite}>
          <MdFavoriteBorder /> Add to favorite
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Property;
