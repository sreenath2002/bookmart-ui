import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; // Import a CSS file for custom styles

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col md={4} sm={6}>
            <h5>About Us</h5>
            <p>A brief description of your company and what you offer.</p>
          </Col>
          <Col md={4} sm={6}>
            <h5>Categories</h5>
            <ul className="list-unstyled">
              <li>Category 1</li>
              <li>Category 2</li>
              <li>Category 3</li>
              {/* Add more categories as needed */}
            </ul>
          </Col>
          <Col md={4} sm={12}>
            <h5>Contact Us</h5>
            <address>
              Email: example@example.com<br />
              Phone: +1234567890<br />
              Address: 123 Street, City, Country<br />
            </address>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={6} className="text-center text-md-start">
            <p>&copy; {new Date().getFullYear()} Your E-commerce. All Rights Reserved</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <ul className="list-inline">
              <li className="list-inline-item"><a href="#terms">Terms of Use</a></li>
              <li className="list-inline-item"><a href="#privacy">Privacy Policy</a></li>
              <li className="list-inline-item"><a href="#sitemap">Sitemap</a></li>
              {/* Add more footer links */}
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
