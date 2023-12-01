import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getProductSelectedProductDetails } from '../../axios/service/productsService';
import './ProductOverview.css'; // Import a CSS file for custom styles
import { useEffect } from 'react';
function Anandan(props) {
    const [selecteddBookDetails, setNewArrivalBookDetails] = useState([])


    useEffect(() => {
        console.log("object")
        async function fetchData(id) {
            try {
                console.log("-------first start-------")
                const newArrivalsDetails = await getProductSelectedProductDetails(id);
                console.log("--------------------------------------------------")
                console.log("-----------byeeeeee--------");
                console.log("ejfsld")

                if (newArrivalsDetails.statuscode === '200 OK') {
                    console.log("jfsd")
                    console.log(newArrivalsDetails.result)
                    setNewArrivalBookDetails(newArrivalsDetails.result)
                    console.log(newArrivalsDetails.result)
                    console.log("----books------");
                }else{
                    
                }
            } catch (err) {
                console.log("Errorrrrrrrrrrrrrrrrrrrrrrr:", err);
            }
        }
        fetchData(props.id);
        // Call the fetchData function with props.id
    }, [props.id]);
    // Sample product data

    return (
        <div>
            <Container>
                <Row>
                    {/* Main product image */}
                    <Col md={6}>

                        {/* <img src={selecteddBookDetails?.images[1]?.imageUrl} alt="Main Product" className="main-product-image" /> */}
                        <Row className="additional-images">
                            {/* Additional product images */}
                            {/* {selecteddBookDetails.images.map((image, index) => (
                                <Col key={index} xs={3}>
                                    <img src={image.imageUrl} alt={`Product ${index + 1}`} className="additional-image" />
                                </Col>
                            ))} */}
                        </Row>
                    </Col>
                    {/* Product details */}
                    <Col md={6}>
                        <div className="product-details">
                            {/* <h2 className="product-name">{selecteddBookDetails.title}</h2>

                            <p className="product-info">{selecteddBookDetails.course.courseName}</p>
                            <p className="product-info">{selecteddBookDetails.university.universityName}</p>
                            <p className="product-info">{selecteddBookDetails.semester.name}</p>
                            <p className="product-info">Author: {selecteddBookDetails.author}</p>
                            <p className="product-price">
                                <span className="real-price">{selecteddBookDetails.price}</span>
                                <span className="discounted-price">{selecteddBookDetails.discountedPrice}</span>
                                <span className="discounted-price">{selecteddBookDetails.discountPresent}</span>
                            </p> */}
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
                            {/* <p>{selecteddBookDetails.description}</p> */}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Anandan
