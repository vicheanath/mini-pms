import React from "react";
import { Card, Button } from "react-bootstrap";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
const Property = ({
  price,
  numberOfRooms,
  type,
  location,
  pictures,
  id,
  addFavorite,
  removeFavorite,
}) => {
  const [favorite, setFavorite] = React.useState(false);
  return (
    <Card>
      <Card.Img variant="top" src={pictures[0]} />
      <Card.Body>
        <Card.Title>{type}</Card.Title>
        <Card.Text>
          <Link to={`/property/${id}`}>
            Price: {price} <br />
          </Link>
          Location: {location} <br />
          Rooms: {numberOfRooms} <br />
        </Card.Text>
        {addFavorite && (
          <Button
            variant="primary"
            onClick={() => {
              setFavorite(true);
              addFavorite(id);
            }}
          >
            <MdFavoriteBorder /> Add to favorite
          </Button>
        )}
        {removeFavorite  && (
          <Button
            variant="danger"
            onClick={() => {
              removeFavorite(id);
              setFavorite(false);
            }}
          >
            <MdFavoriteBorder /> Remove from favorite
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Property;
