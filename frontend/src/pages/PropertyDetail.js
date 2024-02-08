import React from "react";
import {
  Row,
  Col,
  Image,
  Button,
  Badge,
  Carousel,
  Alert,
} from "react-bootstrap";
import { MdOutlineLocalOffer } from "react-icons/md";
import { Link, Navigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../components/Loading";
import { formatMoney } from "../utils/money";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { icon } from "../utils/map";
import { useNavigate } from "react-router-dom";
import RequestOffer from "./RequestOffer";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { api } from "../libs/api";

const PropertyDetail = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const isOwner = user?.roles.map((role) => role.role).includes("Owner");
  console.log(isOwner);
  const { data, isLoading, isError } = useQuery(`properties/${id}`);
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const requestOfferMutation = useMutation(async (data) => {
    api.post("offers/submit", data).then((res) => {
      setShow(false);
    });
  });
  if (isLoading) return <Loading />;

  return (
    <React.Fragment>
      <Row className="mt-4">
        <Alert
          variant="danger"
          show={requestOfferMutation.isError}
          onClose={() => requestOfferMutation.reset()}
          dismissible
        >
          Error while fetching data
        </Alert>
        <Alert
          variant="success"
          show={requestOfferMutation.isSuccess}
          onClose={() => requestOfferMutation.reset()}
          dismissible
        >
          Offer requested successfully
        </Alert>

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
                    img-fluid
                    height={500}
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
            Status :<Badge bg={
              data.offerStatus === "PENDING"
                ? "warning"
                : data.offerStatus === "APPROVED"
                ? "success"
                : "danger"
            }>{data.offerStatus}</Badge>

            <div className="mt-4">
              {
                isOwner ?  (
                      <Link to={"/update-property"}>
                  <Button className="w-25" variant="primary">
                      Edit
                    </Button>
                  </Link>
                ): (
                  <Button
                    variant="primary"
                    onClick={() => {
                      setShow(true);
                    }}
                  >
                    <MdOutlineLocalOffer /> Request Offer
                  </Button>
                )
              }
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
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[data.latitude, data.longitude]} icon={icon}>
            <Popup>{data.location}</Popup>
          </Marker>
        </MapContainer>
        <RequestOffer
          show={show}
          handleClose={() => setShow(false)}
          propertyId={id}
          requestOfferMutation={requestOfferMutation}
        />
      </Row>
    </React.Fragment>
  );
};

export default PropertyDetail;
