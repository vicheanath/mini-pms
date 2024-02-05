import React from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Image,
  Nav,
  Card,
  InputGroup,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SELLER_TYPES = ["Rent", "Sale"];
const PROPERTY_TYPES = ["House", "Apartment", "Condo"];
const HOUSE_TYPES = ["Single Family", "Multi Family", "Townhouse"];
const APARTMENT_TYPES = ["Studio", "Loft", "Duplex"];
const CONDO_TYPES = ["High Rise", "Low Rise", "Mid Rise"];

const AddProperty = () => {
  const [propertyType, setPropertyType] = React.useState(HOUSE_TYPES);
  const handleChangePropertyType = (type) => {
    switch (type) {
      case "House":
        setPropertyType(HOUSE_TYPES);
        break;
      case "Apartment":
        setPropertyType(APARTMENT_TYPES);
        break;
      case "Condo":
        setPropertyType(CONDO_TYPES);
        break;
      default:
        setPropertyType(HOUSE_TYPES);
        break;
    }
  };
  const PropertySchema = z.object({
    title: z.string().min(3).max(50),
    description: z.string().min(3).max(200),
    price: z.number(),
    address: z.string().min(3).max(200),
    image: z.string().url(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ resolver: zodResolver(PropertySchema) });

  const onSubmit = (data) => {
    console.log(data);
  };

  const watchImage = watch("image") || {};
  const imageArray = Object.keys(watchImage).map((key) => watchImage[key]);
  const sellerType = watch("sellerType");
  return (
    <div className="mt-4">
      <Card className="mt-4">
        <Card.Header>
          <h3>Add Property</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3 d-flex align-items-center gap-3">
                  <Form.Label>Seller Type</Form.Label>
                  <input
                    type="radio"
                    {...register("sellerType")}
                    value="Rent"
                    className="form-check-input me-2"
                  />
                  <label for="Rent">Rent</label>
                  <input
                    type="radio"
                    {...register("sellerType")}
                    value="Sale"
                    className="form-check-input me-2"
                  />
                  <label for="Sale">Sale</label>
                  {errors.sellerType && <p>{errors.sellerType.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    {...register("title")}
                  />
                  {errors.title && <p>{errors.title.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="numberOfRooms">
                  <Form.Label>Number of Rooms</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter number of rooms"
                    {...register("numberOfRooms")}
                  />
                  {errors.numberOfRooms && (
                    <p>{errors.numberOfRooms.message}</p>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>Price</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      placeholder="Enter price"
                      {...register("price")}
                    />
                    {errors.price && <p>{errors.price.message}</p>}
                    <InputGroup.Text>{
                        sellerType === "Rent" ? "$ / month" : "$"
                    }</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <textarea
                    rows="5"
                    className="form-control"
                    {...register("description")}
                  ></textarea>
                  {errors.description && <p>{errors.description.message}</p>}
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="type">
                  <Form.Label>Property Type</Form.Label>
                  <select
                    {...register("type")}
                    onChange={(e) => handleChangePropertyType(e.target.value)}
                    className="form-control"
                  >
                    {HOUSE_TYPES.map((type, index) => {
                      return (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      );
                    })}
                  </select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="houseType">
                  <Form.Label>House Type</Form.Label>
                  <Form.Control as="select" {...register("houseType")}>
                    <option value="">Select House Type</option>
                    {propertyType.map((type, index) => {
                      return (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <textarea
                {...register("address")}
                className="form-control"
              ></textarea>
              {errors.address && <p>{errors.address.message}</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                multiple
                type="file"
                placeholder="Enter image url"
                {...register("image")}
              />
              {errors.image && <p>{errors.image.message}</p>}

              <Row className="mt-3">
                {imageArray?.map((img, index) => {
                  return (
                    <Col key={index} md={3}>
                      <Image
                        src={URL.createObjectURL(img)}
                        thumbnail
                        style={{ height: "200px" }}
                      />
                      <p>{img.name}</p>
                      <Button variant="danger" size="sm">
                        Remove
                      </Button>
                    </Col>
                  );
                })}
              </Row>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddProperty;
