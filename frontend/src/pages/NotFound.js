import React from "react";
import { Container, Alert, Card,Button } from "react-bootstrap";
import { FiHome } from "react-icons/fi";
const NotFound = () => {
  return (
    <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>404 - Page Not Found</Alert.Heading>
          <p>The page you are looking for does not exist.</p>
        </Alert>
        <Button href="/" variant="primary"> <FiHome /> Go Home</Button>
    </Container>
  );
};

export default NotFound;
