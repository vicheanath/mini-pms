import React from "react";
import dumpProperties from "../dump/property.json";
import {
  Row,
  Col,
  Button,
  Pagination,
  DropdownButton,
  Dropdown,
  Form,
} from "react-bootstrap";
import Property from "../components/Property";
import { Link, useNavigate } from "react-router-dom";

import { useQuery } from "react-query";
import Loading from "../components/Loading";
import { api } from "../libs/api";
const Home = () => {
  const query = new URLSearchParams(window.location.search);
  const { data, isFetching, isLoading, refetch } = useQuery(
    `properties?${query.toString()}`
  );
  const navigate = useNavigate();


  return (
    <>
      <Row className="mt-4">
        <Col>
          <div className="d-flex gap-2">
            <form
              className="d-flex"
              onSubmit={(e) => {
                e.preventDefault();
                query.set("search", e.target.search.value);
                navigate(`/?${query.toString()}`);
              }}
            >
              <input
                className="form-control me-2"
                type="search"
                name="search"
                placeholder="Search"
              />
              <Button variant="outline-primary" type="submit">
                Search
              </Button>
            </form>
          </div>
        </Col>
        <Col>
          <div className="d-flex gap-2">
            <select
              className="form-select"
              aria-label="Default select example"
              defaultValue="price,asc"
              onChange={(e) => {
                query.set("sort", e.target.value);
                navigate(`/?${query.toString()}`);
              }}
            >
              <option value="price,asc">Sort By</option>
              <option value="price,asc">Price Low to High</option>
              <option value="price,desc">Price High to Low</option>
            </select>

            <DropdownButton
              id="dropdown-basic-button"
              title="Price"
              variant="outline-primary "
            >
              <Dropdown.Item>
                <Form className="p-4">
                  <div className="d-flex justify-content-between">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Min Price</Form.Label>
                      <Form.Control type="number" placeholder="Min Price" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Max Price</Form.Label>
                      <Form.Control type="number" placeholder="Max Price" />
                    </Form.Group>
                  </div>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ width: "100%" }}
                  >
                    Apply
                  </Button>
                </Form>
              </Dropdown.Item>
            </DropdownButton>

            <Button variant="outline-primary">Filter</Button>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        {isLoading ? <Loading /> : null}

        {data?.data.map((property, index) => {
          return (
            <Col key={property.id} md={4} className="mb-4">
              <Property key={index} {...property}   refetch={refetch}  />
            </Col>
          );
        })}
      </Row>
      <Row>
        {/* pagination */}
        <Col>
          <Pagination></Pagination>
        </Col>
      </Row>
    </>
  );
};

export default Home;
