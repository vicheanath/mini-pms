import React from "react";
import { Row, Col, Image, Button, Badge, Card } from "react-bootstrap";
import { MdOutlineLocalOffer } from "react-icons/md";
const DumpProperty = {
  id: 1,
  price: 100.0,
  numberOfRooms: 2,
  location: "1007 W Stone Ave, Fairfield, IA 52556",
  image:
    "https://photos.zillowstatic.com/fp/8352ff644b62e323d9697de553de11c7-cc_ft_768.webp",
  status: "active",
  latitude: 41.0072,
  longitude: -91.9634,
  description:
    "CHECK OUT THE VIDEO! Location Location Location! Fantastic living area throughout w/views to the course all along the back--1 of only 10 homes fronting the Golf Course. Relax/entertain in the very spacious Great Room w/ windows, fireplace, & built-ins.  Adjacent is the Kitchen w/Quartz counters, stainless appliances: Double oven, refrigerator, double-drawer dishwasher, microwave, veg sink/island, dining area & French door to the covered composite deck.  You will spend hours in the 24'x16' enclosed porch area w/vaulted ceilings, heated tile floors & floor-to-ceiling windows.  Add'l living room, formal dining, office w/built-in shelves & covered veranda, 3/4 bath, & large laundry room w/cabinetry & sink.  Large front entry w/closets leads up to the 2nd level. Hardwood floors, primary bedrm w/private full bath, 3 add'l bedrms, & hall bath.  Lower recreation area, 3/4 bath, & storage. Three-car attached garage, large parking apron, covered front porch & a multi-level deck along the back.",
};

const PropertyDetail = () => {
  const position = [51.505, -0.09];

  return (
    <React.Fragment>
      <Row className="mt-4">
        <Col md={6}>
          <Image src={DumpProperty.image} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={8}>
          <h3>{DumpProperty.price}$</h3>
          <p>{DumpProperty.location}</p>
          <p> Rooms: {DumpProperty.numberOfRooms}</p>
          Status :<Badge bg="success">{DumpProperty.status}</Badge>
        </Col>
        <Col md={4}>
          <Button variant="secondary">
            <MdOutlineLocalOffer /> Request Offer
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <h4>Description</h4>
          <p>{DumpProperty.description}</p>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PropertyDetail;
