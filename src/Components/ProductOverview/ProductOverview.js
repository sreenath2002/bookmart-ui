import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getProductSelectedProductDetails } from '../../axios/service/productsService';
import ReactImageZoom from 'react-image-zoom';
import './ProductOverview.css';
import UserReviewSection from '../ReviewSection/UserReviewSection';
const ProductOverview = (props) => {
  const [selecteddBookDetails, setNewArrivalBookDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [error, setError] = useState(null);

  const jwtToken = localStorage.getItem("jwt");

  useEffect(() => {
    async function fetchData(jwtToken, id) {
      try {
        const newArrivalsDetails = await getProductSelectedProductDetails(jwtToken, id);
        if (newArrivalsDetails.statuscode === '200 OK') {
          setNewArrivalBookDetails(newArrivalsDetails.result);
      
          setIsLoading(false);
        }
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }
    fetchData(jwtToken, props.id);
  }, [props.id]);

  useEffect(() => {
    if (selecteddBookDetails.images && selecteddBookDetails.images.length > 0) {
      setMainImage(selecteddBookDetails.images[2].imageUrl);
    }
  }, [selecteddBookDetails]);

  const handleImageClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading state while data is fetched
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Render an error message if fetching data fails
  }

   return (
    <div className='overview'>
      <div className="product-row">
        {/* Main product image */}
        <div md={6} className="d-flex justify-content-center align-items-center">
          <div>
          <ReactImageZoom 
            width={300}
            height={300}
            zoomWidth={300 }
            
            img={mainImage}
            alt="Main Product"
          />
            <div className="additional-images">
              {/* Additional product images */}
              {selecteddBookDetails.images.map((image, index) => (
                <div key={index} xs={3} onClick={() => handleImageClick(image.imageUrl)}>
                  <img src={image.imageUrl} alt={`Product ${index + 1}`} className="additional-image" />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Product details */}
        <div md={6} className="d-flex justify-content-center align-items-center ">
          <div className="details">
            <h2 className="name"> {selecteddBookDetails.title}</h2>
            <p className="info">Course Name: {selecteddBookDetails.course.courseName} {selecteddBookDetails.subject.subjectName}</p>
            <p className="info">University Name: {selecteddBookDetails.university.universityName}</p>
            <p className="info">Semester: {selecteddBookDetails.semester.name}</p>
            <p className="info">Author: {selecteddBookDetails.author}</p>
            <p className="price">
              <span className="product-price ">${selecteddBookDetails.discountedPrice}</span>
              
              <span className="real-price"><s>${selecteddBookDetails.price}</s></span>
             
              <span className="discountedprice">{selecteddBookDetails.discountPresent}% OFF</span>
            </p>
            <div className="action-buttons">
              <Button variant="primary" className="add-to-cart-button">
                Add to Cart
              </Button>
              <Button variant="success" className="buy-now-button">
                Buy Now
              </Button>
            </div>
            
            <p className="product-info">Description</p>
            <p className='description'>{selecteddBookDetails.description}</p>
           
          </div>
         
        </div>
       
      </div>
      <UserReviewSection/>
    </div>
  );
};

export default ProductOverview;

