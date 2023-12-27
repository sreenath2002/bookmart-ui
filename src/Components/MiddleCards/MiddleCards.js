import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './MiddleCards.css'; // Import a CSS file for custom styles

const MiddleCards = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        {/* Create three columns in a row */}
        <Col md={4}>
          <Card className="custom-card">
            <Card.Body className="d-flex align-items-center">
              <div className="card-image-container">
                <Card.Img  variant="top" src="Images/51rPW25OQAL._AC_UF894,1000_QL80_.jpg" className="card-image" />
              </div>
              <div className="card-content">
                <Card.Title className="card-title">UG Books</Card.Title>
                <Card.Text className="card-text">Show Now...</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="custom-card">
            <Card.Body className="d-flex align-items-center">
              <div className="card-image-container">
                <Card.Img variant="top" src="Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg" className="card-image" />
              </div>
              <div className="card-content">
                <Card.Title className="card-title">PG Books</Card.Title>
                <Card.Text className="card-text">Show Now...</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
       
        {/* Repeat the same structure for other columns */}
      </Row>
    </Container>
  );
};

export default MiddleCards;
