import React from "react";
import { Button, Form, Row, Col,Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const AddProperty = () => {
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
  


  return (
    <div>
      <h1>Add Property</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            {...register("title")}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <textarea className="form-control" {...register("description")}></textarea>
          {errors.description && <p>{errors.description.message}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            {...register("price")}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <textarea {...register("address")} className="form-control"></textarea>
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
                {
                    imageArray?.map((img, index) => {
                        return(
                        <Col key={index} md={3}>
                            <Image src={URL.createObjectURL(img)} thumbnail style={{height: "200px"}} />
                            <p>{img.name}</p>
                            <Button variant="danger" size="sm">Remove</Button>
                        </Col>
                    )})
                }
            </Row>


        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddProperty;
