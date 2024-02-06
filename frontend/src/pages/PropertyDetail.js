import React from "react";
import { Row, Col, Image, Button, Badge, Carousel } from "react-bootstrap";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../components/Loading";
import { formatMoney } from "../utils/money";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { icon } from "../utils/map";

const PropertyDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(`properties/${id}`);
  console.log(data);

  if (isLoading) return <Loading />;

  return (
    <React.Fragment>
      <Row className="mt-4">
        <Col md={7}>
          <Carousel
            fade
            prevIcon={
              <span aria-hidden="true" className="carousel-control-prev-icon" />
            }
            nextIcon={
              <span aria-hidden="true" className="carousel-control-next-icon" />
            }
          >
            {data?.pictures.map((picture, index) => {
              return (
                <Carousel.Item key={index}>
                  <Image
                    className="d-block w-100"
                    src={picture}
                    alt="First slide"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
        <Col md={5}>
          <div>
            <h3>{formatMoney(data.price)}</h3>
            <p>{data.location}</p>
            <p> Rooms: {data.numberOfRoom}</p>
            Status :<Badge bg="success">{data.status}</Badge>
            <div className="mt-4">
              <Button variant="secondary">
                <MdOutlineLocalOffer /> Request Offer
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <h4>Description</h4>
          <p>{data.description}</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <MapContainer
          center={[data.latitude, data.longitude]}
          zoom={5}
          scrollWheelZoom={false}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[data.latitude, data.longitude]} icon={icon}>
            <Popup>
             {data.location}
            </Popup>
          </Marker>
        </MapContainer>
      </Row>
    </React.Fragment>
  );
};

export default PropertyDetail;
