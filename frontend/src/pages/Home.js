import React from "react";
import dumpProperties from "../dump/property.json";
import { Row, Col ,Button} from "react-bootstrap";
import Property from "../components/Property";
import { Link } from "react-router-dom";
import { CiFilter } from "react-icons/ci";

const Home = () => {
  return (
    <>
      <Row className="mt-4">
        <Col>
          <div className="d-flex gap-2">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <Button variant="outline-primary">
              Search
            </Button>
          </div>
        </Col>
        <Col>
          <div className="d-flex gap-2">
            <select className="form-select" aria-label="Default select example" defaultValue={0}>
              <option selected>Sort By</option>
              <option value="1">Price</option>
              <option value="2">Location</option>
              <option value="3">Rooms</option>
            </select>

            <select className="form-select" aria-label="Default select example" defaultValue={0}>
              <option selected>Filter By</option>
              <option value="1">Price</option>
              <option value="2">Location</option>
              <option value="3">Rooms</option>
            </select>

            <Button variant="outline-primary">
            Filter
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        {dumpProperties.map((property, index) => {
          return (
            <Col key={index} md={4} className="mb-4">
              <Link to={`/property/${index}`} key={index}>
                <Property key={index} {...property} />
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Home;
