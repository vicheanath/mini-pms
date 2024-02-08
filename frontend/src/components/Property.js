import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import { formatMoney } from "../utils/money";
import { api } from "../libs/api";
import { FiEdit2, FiEye } from "react-icons/fi";
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
  updateProperty,
  unFav,
}) => {
  const addFavorite = async (id) => {
    api.post(`favorites/${id}`).then((res) => {
      refetch();
      setIsFav(true);
    });
  };
  const removeFavorite = (id) => {
    api.delete(`favorites/${id}`).then((res) => {
      refetch();
      setIsFav(false);
    });
  };

  const [isFav, setIsFav] = useState(favorite || unFav);

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
            <span className="me-3">Rooms: {numberOfRoom}</span>
            <Badge
              bg={
                offerStatus === "PENDING"
                  ? "warning"
                  : offerStatus === "APPROVED"
                  ? "success"
                  : "danger"
              }
            >
              {offerStatus}
            </Badge>
          </span>
          <div>
            <Button
              className="me-2"
              variant={isFav ? "danger" : "primary"}
              onClick={() => {
                isFav ? removeFavorite(id) : addFavorite(id);
                refetch();
              }}
            >
              {isFav ? <MdOutlineFavorite /> : <MdFavoriteBorder />}
            </Button>
            {updateProperty && (

              <Link to={`/update-property/${id}`} className="btn btn-warning me-2">
                <FiEdit2 />
              </Link>
            )}
            {viewOffer && (
              <Button 
                className="me-2"
              variant="secondary" onClick={() => viewOffer(id)}>
                <FiEye />   Offer
              </Button>
            )}
            
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Property;
