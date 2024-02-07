import React from 'react'
import {Card, Button, Row, Col,Badge} from 'react-bootstrap'

const Dashboard = () => {
  return (
    <div className="mt-4">
      <h3>Dashboard</h3>
      <Row>
        <Col md={4}>
          <Card bg="success" text="white">
            <Card.Body>
              <Card.Title>Properties</Card.Title>
              <Card.Text>
                10
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="primary" text="white">
            <Card.Body>
              <Card.Title>Users</Card.Title>
              <Card.Text>
                10
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="danger" text="white">
            <Card.Body>
              <Card.Title>Offers</Card.Title>
              <Card.Text>
                10
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard