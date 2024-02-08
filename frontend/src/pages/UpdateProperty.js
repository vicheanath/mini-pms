import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef } from "react";
import {
    Button,
    Card,
    Col,
    Form,
    Image,
    InputGroup,
    Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    CATEGORY,
    HOUSE_TYPES,
    Map,
    handleChangePropertyType,
} from "./AddProperty";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import { api } from "../libs/api";
import { useLocation, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../libs/constants";

function UpdateProperty() {
    const [propertyType, setPropertyType] = React.useState(HOUSE_TYPES);
    const { accessToken } = useSelector((state) => state.auth);
    const [images, setImages] = React.useState({});
    const [existingImages, setExistingImages] = React.useState({});
    const [imageKeys, setImageKeys] = React.useState([]);
    const [latLong, setLatLong] = React.useState(0);
    const location = useLocation();
    const id = 1;
    const navigate = useNavigate();

    const PropertySchema = z.object({
        type: z.string(),
        title: z.string().min(3).max(150),
        price: z.string().nullable(),
        description: z.string().min(3).max(255),
        location: z.string().min(3).max(255),
        category: z.string().min(3).max(255),
        subCategory: z.string().min(3).max(200),
        numberOfRoom: z.string().nullable(),
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

    const onSubmit = (data) => {
        data.pictures = imageKeys;
        data.latitude = latLong.lat || 0;
        data.longitude = latLong.lng || 0;
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

    const propertyMutation = useMutation((data) => {
        api.put("properties/" + id, data)
            .then((res) => {
                navigate("/my-properties", {
                    state: { message: "Property added successfully" },
                });
            })
            .catch((error) => {
                console.log(error);
            });
    });

    const [property, setProperty] = React.useState({});
    const propertyFetch = () => {
        api.get("properties/" + id)
            .then((res) => {
                console.log(res.data);
                setProperty(res.data);
                handleChangePropertyType(res.data.type, setPropertyType);
                // alert('ddd', res.data.latitude)
                setLatLong({ lat: res.data.latitude, lng: res.data.longitude });
                // setExistingImages(res.data.pictures)
                setImages(res.data.pictures.map((p) => p));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        propertyFetch();
    }, []);
    const propertyForm = useRef(property);

    const handleChangeProperty = (e) => {
        const { name, value } = e.target;
        setProperty({ ...property, [name]: value });
    };

    const handleUploadImage = (files) => {
        setImages((prev) => {
            const temp = { ...prev };
            for (let i = 0; i < files.length; i++) {
                temp[i + images.length] = files[i];
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

    const imageArr = Object.keys(images).map((key) => images[key]);

    return (
        <div className="mt-4">
            <Card className="mt-4">
                <Card.Header>
                    <h3>Update Property</h3>
                </Card.Header>
                <Card.Body>
                    <Form ref={propertyForm} onSubmit={handleSubmit(onSubmit)}>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group className="mb-3 d-flex align-items-center gap-3">
                                    <Form.Label>Seller Type</Form.Label>
                                    <input
                                        name="type"
                                        type="radio"
                                        {...register("type")}
                                        value="RENT"
                                        checked={property.type === "RENT"}
                                        className="form-check-input me-2"
                                    />
                                    <label htmlFor="type">Rent</label>
                                    <input
                                        type="radio"
                                        {...register("type")}
                                        value="SALE"
                                        checked={property.type === "SELL"}
                                        className="form-check-input me-2"
                                    />
                                    <label htmlFor="type">Sale</label>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        {...register("title")}
                                        type="text"
                                        placeholder="Enter title"
                                        value={property.title}
                                        onChange={(e) =>
                                            handleChangeProperty(e)
                                        }
                                    />
                                    <Form.Text className="text-danger">
                                        {errors.title?.message}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="numberOfRoom"
                                >
                                    <Form.Label>Number of Rooms</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter number of rooms"
                                        {...register("numberOfRoom")}
                                        value={property.numberOfRoom}
                                        onChange={(e) =>
                                            handleChangeProperty(e)
                                        }
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
                                            value={property.price}
                                            onChange={(e) =>
                                                handleChangeProperty(e)
                                            }
                                        />

                                        <InputGroup.Text>
                                            {type === "Rent"
                                                ? "$ / month"
                                                : "$"}
                                        </InputGroup.Text>
                                    </InputGroup>
                                    <Form.Text className="text-danger">
                                        {errors.price?.message}
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="description"
                                >
                                    <Form.Label>Description</Form.Label>
                                    <textarea
                                        rows="5"
                                        className="form-control"
                                        {...register("description")}
                                        value={property.description}
                                        onChange={(e) =>
                                            handleChangeProperty(e)
                                        }
                                    ></textarea>
                                    <Form.Text className="text-danger">
                                        {errors.description?.message}
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="category"
                                >
                                    <Form.Label>category</Form.Label>
                                    <select
                                        {...register("category")}
                                        onChange={(e) =>
                                            handleChangePropertyType(
                                                e.target.value,
                                                setPropertyType
                                            )
                                        }
                                        className="form-select"
                                    >
                                        {CATEGORY.map((type, index) => {
                                            return (
                                                <>
                                                    {type.toLocaleUpperCase() ==
                                                    `${property.category}`.toLocaleUpperCase() ? (
                                                        <option
                                                            key={index}
                                                            value={type}
                                                            selected
                                                        >
                                                            {type}
                                                        </option>
                                                    ) : (
                                                        <option
                                                            key={index}
                                                            value={type}
                                                        >
                                                            {type}
                                                        </option>
                                                    )}
                                                </>
                                            );
                                        })}
                                    </select>
                                    <Form.Text className="text-danger">
                                        {errors.category?.message}
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="subCategory"
                                >
                                    <Form.Label>{category} Type</Form.Label>
                                    <select
                                        {...register("subCategory")}
                                        className="form-select"
                                    >
                                        <option value="">
                                            Select {category} type
                                        </option>
                                        {propertyType.map((type, index) => {
                                            return (
                                                <>
                                                    {type.toLocaleUpperCase() ===
                                                    `${property.subCategory}`.toLocaleUpperCase() ? (
                                                        <option
                                                            key={index}
                                                            value={type}
                                                            selected
                                                        >
                                                            {type}
                                                        </option>
                                                    ) : (
                                                        <option
                                                            key={index}
                                                            value={type}
                                                        >
                                                            {type}
                                                        </option>
                                                    )}
                                                </>
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
                                value={property.location}
                                onChange={(e) => handleChangeProperty(e)}
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
                                onChange={(e) =>
                                    handleUploadImage(e.target.files)
                                }
                            />

                            <Row className="mt-3">
                                {imageArr?.map((img, index) => {
                                    return (
                                        <Col key={index} md={3}>
                                            <Image
                                                src={
                                                    img instanceof File
                                                        ? URL.createObjectURL(
                                                              img
                                                          )
                                                        : img
                                                }
                                                thumbnail
                                                style={{ height: "200px" }}
                                            />
                                            <p>{img.name}</p>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() =>
                                                    handleRemoveImage(index)
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </Col>
                                    );
                                })}
                            </Row>
                            <Row className="mt-4">
                                <Col md={12}>
                                    {/* <Map set={setLatLong} center={[latLong?.lat, latLong?.lng]} /> */}
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
}

export default UpdateProperty;
