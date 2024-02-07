import React from "react";
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
import { useForm } from "react-hook-form";

import { useQuery } from "react-query";
import Loading from "../components/Loading";
import { CATEGORY } from "./AddProperty";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
const Home = () => {
  const query = new URLSearchParams(window.location.search);
  const { data, isFetching, isLoading, refetch } = useQuery(
    `properties?${query.toString()}`
  );
  const navigate = useNavigate();
  const filterSchema = z.object({
    category: z.string().nullable(),
    minPrice: z.string().nullable(),
    maxPrice: z.string().nullable(),
    numberOfRoom: z.string().nullable(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(filterSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    for (const key in data) {
      if (data[key] === "") {
        query.delete(key);
      } else {
        query.set(key, data[key]);
      }
    }
    navigate(`/?${query.toString()}`);
  };

  return (
    <>
      <Row className="mt-4">
        <Col md={4}>
          <form
            className="d-flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (e.target.search.value === "") {
                query.delete("search");
                return;
              }
              query.set("search", e.target.search.value);
              navigate(`/?${query.toString()}`);
            }}
          >
            <Form.Group className="mb-3">
              <input
                className="form-control me-2"
                type="search"
                name="search"
                placeholder="Search"
              />
              <Form.Text className="text-muted">
                Search by property location
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Button variant="outline-primary" type="submit">
                Search
              </Button>
            </Form.Group>
          </form>
        </Col>
        <Col md={8}>
          <div className="d-flex gap-2">
            <Form.Group className="mb-3">
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
            </Form.Group>

            <Form className="d-flex gap-2" onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <select
                  name="category"
                  className="form-select"
                  aria-label="Default select example"
                  {...register("category")}
                >
                  <option value="">Type</option>
                  {CATEGORY.map((category, index) => {
                    return (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    );
                  })}
                </select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Min Price"
                  {...register("minPrice")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Max Price"
                  {...register("maxPrice")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Number of Room"
                  {...register("numberOfRoom")}
                />
              </Form.Group>
              <Form.Group className="mb-3 d-flex gap-2">
                <Button variant="outline-primary" type="submit">
                  Filter
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    query.delete("search");
                    navigate(`/?${query.toString()}`);
                  }}
                >
                  Clear
                </Button>
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>

      <Row className="mt-2">
        {isLoading ? <Loading /> : null}

        {data?.data.map((property, index) => {
          return (
            <Col key={property.id} md={4} className="mb-4">
              <Property key={index} {...property} refetch={refetch} />
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
