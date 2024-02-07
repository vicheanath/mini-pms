import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const RequestOffer = ({
  show,
  handleClose,
  propertyId,
  requestOfferMutation,
}) => {
  const RequestOfferSchema = z.object({
    remark: z.string().min(3).max(20),
    price: z.string(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(RequestOfferSchema) });

  const onSubmit = (data) => {
    data.propertyId = propertyId;
    requestOfferMutation.mutate(data);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Request Offer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="remark">
            <Form.Label>Remark</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Remark"
              {...register("remark")}
            />
            <Form.Text className="text-danger">
              {errors.remark?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Price"
              {...register("price")}
            />
            <Form.Text className="text-danger">
              {errors.price?.message}
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Request Offer
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RequestOffer;
