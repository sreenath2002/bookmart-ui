import React, { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './BookCards.css'; // Import a CSS file for custom styles
import { getNewArrivals } from '../../axios/service/productsService';
import { getScienceBooks,getCommerceBooks,getLanguageBooks } from '../../axios/service/productsService';
import ProductOverview from '../ProductOverview/ProductOverview';
import { useEffect } from 'react';
import { useState } from 'react';
import ReactImageZoom from 'react-image-zoom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const BookCards = () => {

  const [newArrivalbooks, setNewArrivalBooks] = useState([]);
  const[scienceBooks,setScienceBooks]=useState([]);
  const[commerceBooks,setCommerceBooks]=useState([]);
  const[languageBooks,setLanguageBooks]=useState([]);

  // Dummy data for book cards
  const navigate = useNavigate();
  const scrollingWrapperRef = useRef(null);
  const scrollLeft = () => {
    if (scrollingWrapperRef.current) {
      scrollingWrapperRef.current.scrollLeft -= 200; // Adjust the scroll distance as needed
    }
  };

  const scrollRight = () => {
    if (scrollingWrapperRef.current) {
      scrollingWrapperRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
    }
  };

  useEffect(() => {

    featchData()
    console.log("fdsj")
    async function featchData() {
      console.log("-------fist start-------")
      const newArrivals = await getNewArrivals();
      const scienceProducts=await getScienceBooks ();
      const commerceProducts=await getCommerceBooks();
      const languageProducts=await getLanguageBooks();
      console.log("--------------------------------------------------")
      console.log("-----------hai--------");
      console.log("ejfsld")

      if (newArrivals.statuscode === '200 OK' && scienceProducts.statuscode === '200 OK'  && commerceProducts.statuscode === '200 OK'  && languageProducts.statuscode === '200 OK' ) {
        console.log("jfsd")
        console.log(newArrivals.result)
        console.log(scienceBooks.result)
        setNewArrivalBooks(newArrivals.result)
        setScienceBooks(scienceProducts.result)
        setCommerceBooks(commerceProducts.result);
        setLanguageBooks(languageProducts.result)
        console.log(newArrivalbooks)
        console.log("----books------");
      }
    }

  }, []);

  const handleShopNow = (id) => {
    // Navigate to the ProductOverview component with the provided ID
    navigate(`/ProductDetails/${id}`);
  };


  return (
   
    <Container >
      <Row className="justify-content-center" >
        <Col xs={12} className='main'>
          <h2 className='newarriwal-heading'>New Arrivals</h2>
          <h5 className='view-all'>View All</h5>
          <div className="scrolling-wrapper" ref={scrollingWrapperRef}>
            {newArrivalbooks.filter((newArrivalbook)=>newArrivalbook.status!='false').map((newArrivalbook) => (
              <Card key={newArrivalbook.id} className="book-card">
                <div className='cardss'>
               
                  <div className="zoom-image-container">
                    <ReactImageZoom
                      img={newArrivalbook.images[1].imageUrl}
                      zoomWidth={400} // Set the zoom width (if needed)
                      className="zoom-img"
                      imgStyle={{ width: '150px', height: '150px' }} // Set the width and height of the image
                    />
                  </div>
                  <div class="cards-header">
                                  <FaShoppingCart className="cart-icon" />
                                  <FaHeart className="wishlist-icon" />
                                </div>

                  <div >
                    <Card.Body className='body_card'>
                      <Card.Title className="book-name">{newArrivalbook.title}</Card.Title>
                      <Card.Text>
                        <p className='course'>{newArrivalbook.course.courseName}  {newArrivalbook.subject.subjectName}</p>
                        <p className='university'>{newArrivalbook.university.universityName}</p>
                        <p className='semester'>{newArrivalbook.semester.name}</p>
                        <p className='price'>
                                    <span className='discounted-price'>${newArrivalbook.discountedPrice}</span>
                                     <s className='real'>${newArrivalbook.price}</s>
                                    <span className='discount'>{newArrivalbook.discountPresent}% OFF</span>
                                  </p>
                      </Card.Text>

                      <Button className='mybutton' variant="primary" onClick={() => handleShopNow(newArrivalbook.id)}>Shop Now</Button>
                    </Card.Body>
                  </div>
                </div>
       
              </Card>
              
            ))}
          </div>
          <button className="scroll-btn left" onClick={scrollLeft}>
        &lt;
      </button>
      <button className="scroll-btn right" onClick={scrollRight}>
        &gt;
      </button>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12}>
          <h2 className='newarriwal-heading'>Science </h2>
          <h5 className='view-all'>View All</h5>
          <div className="scrolling-wrapper">
            {scienceBooks.filter((scienceBook)=>scienceBook.status!='false').map((scienceBook) => (
              <Card key={scienceBook.id} className="book-card">
                <div className='cardss'>
             
                  <div className="zoom-image-container">
                    <ReactImageZoom
                      img={scienceBook.images[1].imageUrl}
                      zoomWidth={400} // Set the zoom width (if needed)
                      className="zoom-img"
                      imgStyle={{ width: '150px', height: '150px' }} // Set the width and height of the image
                    />
                  </div>
                  <div class="cards-header">
                                  <FaShoppingCart className="cart-icon" />
                                  <FaHeart className="wishlist-icon" />
                                </div>

                  <div >
                    <Card.Body className='body_card'>
                      <Card.Title className="book-name">{scienceBook.title}</Card.Title>
                      <Card.Text>
                        <p className='course'>{scienceBook.course.courseName}  {scienceBook.subject.subjectName}</p>
                        <p className='university'>{scienceBook.university.universityName}</p>
                        <p className='semester'>{scienceBook.semester.name}</p>
                        <p className='price'>
                                    <span className='discounted-price'>${scienceBook.discountedPrice}</span>
                                     <s className='real'>${scienceBook.price}</s>
                                    <span className='discount'>{scienceBook.discountPresent}% OFF</span>
                                  </p>
                      </Card.Text>

                      <Button className='mybutton' variant="primary" onClick={() => handleShopNow(scienceBook.id)}>Shop Now</Button>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12}>
          <h2 className='newarriwal-heading'>Commerce</h2>
          <h5 className='view-all'>View All</h5>
          <div className="scrolling-wrapper">
            {commerceBooks.filter((commerceBook)=>commerceBook.status!='false').map((commerceBook) => (
              <Card key={commerceBook.id} className="book-card">
                <div className='cardss'>
                
                  <div className="zoom-image-container">
                    <ReactImageZoom
                      img={commerceBook.images[1].imageUrl}
                      zoomWidth={400} // Set the zoom width (if needed)
                      className="zoom-img"
                      imgStyle={{ width: '150px', height: '150px' }} // Set the width and height of the image
                    />
                  </div>
                  <div class="cards-header">
                                  <FaShoppingCart className="cart-icon" />
                                  <FaHeart className="wishlist-icon" />
                                </div>
                  <div >
                    <Card.Body className='body_card'>
                      <Card.Title className="book-name">{commerceBook.title}</Card.Title>
                      <Card.Text>
                        <p className='course'>{commerceBook.course.courseName}  {commerceBook.subject.subjectName}</p>
                        <p className='university'>{commerceBook.university.universityName}</p>
                        <p className='semester'>{commerceBook.semester.name}</p>
                        <p className='price'>
                                    <span className='discounted-price'>${commerceBook.discountedPrice}</span>
                                     <s className='real'>${commerceBook.price}</s>
                                    <span className='discount'>{commerceBook.discountPresent}% OFF</span>
                                  </p>
                      </Card.Text>

                      <Button className='mybutton' variant="primary" onClick={() => handleShopNow(commerceBook.id)}>Shop Now</Button>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12}>
          <h2 className='newarriwal-heading'>Language </h2>
          <h5 className='view-all'>View All</h5>
          <div className="scrolling-wrapper">
            {languageBooks.filter((languageBook)=>languageBook.status!='false').map((languageBook) => (
              <Card key={languageBook.id} className="book-card">
                <div className='cardss'>
                <div className="zoom-image-container">
                    <ReactImageZoom
                      img={languageBook.images[1].imageUrl}
                      zoomWidth={400} // Set the zoom width (if needed)
                      className="zoom-img"
                      imgStyle={{ width: '150px', height: '150px' }} // Set the width and height of the image
                    />
                  </div>
                  <div class="cards-header">
                                  <FaShoppingCart className="cart-icon" />
                                  <FaHeart className="wishlist-icon" />
                                </div>
                  <div >
                    <Card.Body className='body_card'>
                      <Card.Title className="book-name">{languageBook.title}</Card.Title>
                      <Card.Text>
                        <p className='course'>{languageBook.course.courseName}  {languageBook.subject.subjectName}</p>
                        <p className='university'>{languageBook.university.universityName}</p>
                        <p className='semester'>{languageBook.semester.name}</p>
                        <p className='price'>
                                    <span className='discounted-price'>${languageBook.discountedPrice}</span>
                                     <s className='real'>${languageBook.price}</s>
                                    <span className='discount'>{languageBook.discountPresent}% OFF</span>
                                  </p>
                      </Card.Text>

                      <Button className='mybutton' variant="primary" onClick={() => handleShopNow(languageBook.id)}>Shop Now</Button>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
   
  );
};

export default BookCards;
