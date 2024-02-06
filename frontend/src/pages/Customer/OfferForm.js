import React, { useState } from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';

const OfferForm = () => {

    // to be removed later: we need to use CSS or the bootstraping :) 
    const formContainerStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      };
    
      const formStyles = {
        width: '400%', // Adjust the width as needed
        maxWidth: '1000px', // Set a maximum width to control the form width
      };
    // 
  const [offerData, setOfferData] = useState({
    propertyDetails: '',
    offerAmount: '',
    moveInDate: '',
    contingencyPeriod: '',
    contactInformation: '',
  });

  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    setOfferData({
      ...offerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation for user input
    const newErrors = {};
    if (!offerData.propertyDetails) {
      newErrors.propertyDetails = 'Property details are required';
    }
    if (!offerData.offerAmount) {
      newErrors.offerAmount = 'Offer amount is required';
    } else if (isNaN(offerData.offerAmount) || +offerData.offerAmount <= 0) {
      newErrors.offerAmount = 'Invalid offer amount';
    }

    if (Object.keys(newErrors).length === 0) {
      // Simulate submitting data to the backend
      console.log('Offer submitted:', offerData);
      // Clear form fields
      setOfferData({
        propertyDetails: '',
        offerAmount: '',
        moveInDate: '',
        contingencyPeriod: '',
        contactInformation: '',
      });
      // Display success message
      setSubmitSuccess(true);
      // Reset errors
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div style={formContainerStyles} className="offer-form-container">
      <h2>Submit Your Offer</h2>
      
      {submitSuccess && (
        <Alert variant="success" onClose={() => setSubmitSuccess(false)} dismissible>
          Offer submitted successfully! {/* You can customize this message */}
        </Alert>
      )}

      <Form style={formStyles} onSubmit={handleSubmit}>
        {/* Property Information */}
        <Form.Group as={Row} controlId="propertyDetails">
          <Form.Label column sm={3}>
            Property Details:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="propertyDetails"
              value={offerData.propertyDetails}
              onChange={handleInputChange}
              isInvalid={!!errors.propertyDetails}
            />
            <Form.Control.Feedback type="invalid">{errors.propertyDetails}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* Offer Amount */}
        <Form.Group as={Row} controlId="offerAmount">
          <Form.Label column sm={3}>
            Offer Amount ($):
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="offerAmount"
              value={offerData.offerAmount}
              onChange={handleInputChange}
              isInvalid={!!errors.offerAmount}
            />
            <Form.Control.Feedback type="invalid">{errors.offerAmount}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* Preferred Move-in Date */}
        <Form.Group as={Row} controlId="moveInDate">
          <Form.Label column sm={3}>
            Preferred Move-in Date:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="date"
              name="moveInDate"
              value={offerData.moveInDate}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        {/* Contingency Period */}
        <Form.Group as={Row} controlId="contingencyPeriod">
          <Form.Label column sm={3}>
            Contingency Period (days):
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              name="contingencyPeriod"
              value={offerData.contingencyPeriod}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        {/* Contact Information */}
        <Form.Group as={Row} controlId="contactInformation">
          <Form.Label column sm={3}>
            Contact Information:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              as="textarea"
              name="contactInformation"
              value={offerData.contactInformation}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        {/* Submission Button */}
        <Button type="submit">Submit Offer</Button>
      </Form>
    </div>
  );
};

export default OfferForm;
