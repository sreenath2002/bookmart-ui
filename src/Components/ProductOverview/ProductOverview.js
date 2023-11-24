import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './ProductOverview.css'; // Import a CSS file for custom styles

const ProductOverview = () => {
  // Sample product data
  const product = {
    id: 1,
    mainImage: 'Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg',
    additionalImages: [
      'Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg',
      'Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg',
      'Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg',
      'Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg',
    ],
    productName: 'Book Title',
    courseName: 'Course Name',
    universityName: 'University Name',
    semester: 'Semester Name',
    author: 'Author Name',
    realPrice: '$60',
    discountedPrice: '$50',
    description: 'Product description goes here. Add any relevant information about the product.',
  };

  return (
    <Container>
      <Row>
        {/* Main product image */}
        <Col md={6}>
          <img src={product.mainImage} alt="Main Product" className="main-product-image" />
          <Row className="additional-images">
            {/* Additional product images */}
            {product.additionalImages.map((image, index) => (
              <Col key={index} xs={3}>
                <img src={image} alt={`Product ${index + 1}`} className="additional-image" />
              </Col>
            ))}
          </Row>
        </Col>
        {/* Product details */}
        <Col md={6}>
          <div className="product-details">
            <h2 className="product-name">{product.productName}</h2>
            <p className="product-info">{product.courseName}</p>
            <p className="product-info">{product.universityName}</p>
            <p className="product-info">{product.semester}</p>
            <p className="product-info">Author: {product.author}</p>
            <p className="product-price">
              <span className="real-price">{product.realPrice}</span>
              <span className="discounted-price">{product.discountedPrice}</span>
            </p>
            <div className="action-buttons">
              <Button variant="primary" className="add-to-cart-button">
                Add to Cart
              </Button>
              <Button variant="success" className="buy-now-button">
                Buy Now
              </Button>
            </div>
          </div>
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductOverview;
