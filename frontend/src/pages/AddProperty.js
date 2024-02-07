import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { useSelector } from "react-redux";
import { apiBaseUrl } from "../libs/constants";
import { api } from "../libs/api";
import { useMutation } from "react-query";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getCurrLocation, icon, iconURL } from "../utils/map";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const CATEGORY = ["House", "Apartment", "Condo","Land"];
const LAND_TYPES = ["Residential", "Commercial", "Agricultural"];
const HOUSE_TYPES = ["Single Family", "Multi Family", "Townhouse"];
const APARTMENT_TYPES = ["Studio", "Loft", "Duplex"];
const CONDO_TYPES = ["High Rise", "Low Rise", "Mid Rise"];

const AddProperty = () => {
  const [propertyType, setPropertyType] = React.useState(HOUSE_TYPES);
  const { accessToken } = useSelector((state) => state.auth);
  const [images, setImages] = React.useState({});
  const [imageKeys, setImageKeys] = React.useState([]);
  const [latLong, setLatLong] = React.useState(null);
  const navigate = useNavigate();
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
      case "Land":
        setPropertyType(LAND_TYPES);
        break;
      default:
        setPropertyType(HOUSE_TYPES);
        break;
    }
  };
  const PropertySchema = z.object({
    type: z.string(),
    title: z.string().min(3).max(50),
    price: z.string().min(1),
    description: z.string().min(3).max(200),
    location: z.string().min(3).max(200),
    category: z.string().min(3).max(200),
    subCategory: z.string().min(3).max(200),
    numberOfRoom: z.string().min(1),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(PropertySchema),
    defaultValues: { type: "RENT" },
  });

  const propertyMutation = useMutation((data) => {
    api.post("properties", data).then((res) => {
      console.log(res);
      // navigate("/");
    }).catch((error) => {
      console.log(error);
    });
  });

  const onSubmit = (data) => {
    data.pictures = imageKeys;
    data.latitude = latLong.lat;
    data.longitude = latLong.lng;
    propertyMutation.mutate(data);
  };
  const type = watch("type");
  const category = watch("category");
  const handleRemoveImage = (index) => {
    setImages((prev) => {
      const temp = { ...prev };
      delete temp[index];
      return temp;
    });
  };

  const handleUploadImage = (files) => {
    setImages((prev) => {
      const temp = { ...prev };
      for (let i = 0; i < files.length; i++) {
        temp[i] = files[i];
      }
      return temp;
    });

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);

      fetch(apiBaseUrl + "files/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setImageKeys((prev) => {
            return [...prev, result.key];
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    const geo = getCurrLocation();
    console.log(geo);
  }, []);

  const imageArr = Object.keys(images).map((key) => images[key]);

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
                    {...register("type")}
                    value="RENT"
                    className="form-check-input me-2"
                  />
                  <label htmlFor="type">Rent</label>
                  <input
                    type="radio"
                    {...register("type")}
                    value="SALE"
                    className="form-check-input me-2"
                  />
                  <label htmlFor="type">Sale</label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    {...register("title")}
                  />
                  <Form.Text className="text-danger">
                    {errors.title?.message}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="numberOfRoom">
                  <Form.Label>Number of Rooms</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter number of rooms"
                    {...register("numberOfRoom")}
                  />
                  <Form.Text className="text-danger">
                    {errors.numberOfRoom?.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>Price</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      placeholder="Enter price"
                      {...register("price")}
                    />

                    <InputGroup.Text>
                      {type === "Rent" ? "$ / month" : "$"}
                    </InputGroup.Text>
                  </InputGroup>
                  <Form.Text className="text-danger">
                    {errors.price?.message}
                  </Form.Text>
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
                  <Form.Text className="text-danger">
                    {errors.description?.message}
                  </Form.Text>

                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>category</Form.Label>
                  <select
                    {...register("category")}
                    onChange={(e) => handleChangePropertyType(e.target.value)}
                    className="form-select"
                  >
                    {CATEGORY.map((type, index) => {
                      return (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      );
                    })}
                  </select>
                  <Form.Text className="text-danger">
                    {errors.category?.message}
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="subCategory">
                  <Form.Label>{category} Type</Form.Label>
                  <select {...register("subCategory")} className="form-select">
                    <option value="">Select {category} type</option>
                    {propertyType.map((type, index) => {
                      return (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      );
                    })}
                  </select>
                  <Form.Text className="text-danger">
                    {errors.subCategory?.message}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label>location</Form.Label>
              <textarea
                {...register("location")}
                className="form-control"
              ></textarea>
              <Form.Text className="text-danger">
                {errors.location?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                multiple
                type="file"
                placeholder="Enter image"
                {...register("pictures")}
                onChange={(e) => handleUploadImage(e.target.files)}
              />

              <Row className="mt-3">
                {imageArr?.map((img, index) => {
                  return (
                    <Col key={index} md={3}>
                      <Image
                        src={URL.createObjectURL(img)}
                        thumbnail
                        style={{ height: "200px" }}
                      />
                      <p>{img.name}</p>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveImage(index)}
                      >
                        Remove
                      </Button>
                    </Col>
                  );
                })}
              </Row>
              <Row className="mt-4">
                <Col md={12}>
                  <Map set={setLatLong} />
                </Col>
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

const Map = ({ set }) => {
  const [map, setMap] = useState(null);
  const [latLong, setLatLong] = useState(null);

  useEffect(() => {
    set(latLong);
  }, [latLong]);

  const displayMap = useMemo(
    () => (
      <div className="map-container">
        <div id="map-picker">
          <FaLocationDot size={30} color="#333" />
        </div>
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          style={{ height: "400px", width: "100%" }}
          ref={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    ),
    []
  );

  return (
    <div>
      {map ? <DisplayPosition map={map} setLatLong={setLatLong} /> : null}
      {displayMap}
    </div>
  );
};

const center = [41.023248, -91.966827];
const zoom = 15;

function DisplayPosition({ map, setLatLong }) {
  const [position, setPosition] = useState(() => map.getCenter());

  const onClick = useCallback(() => {
    map.setView(center, zoom);
  }, [map]);

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
    setLatLong(map.getCenter());
  }, [map]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  return (
    <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{" "}
      <button onClick={onClick}>reset</button>
    </p>
  );
}
