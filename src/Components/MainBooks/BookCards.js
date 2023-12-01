import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './BookCards.css'; // Import a CSS file for custom styles
import { getNewArrivals } from '../../axios/service/productsService';
import ProductOverview from '../ProductOverview/ProductOverview';
import { useEffect } from 'react';
import { useState } from 'react';
import ReactImageZoom from 'react-image-zoom';
import { useNavigate } from 'react-router-dom';
const BookCards = () => {

  const [newArrivalbooks, setNewArrivalBooks] = useState([]);
  
  // Dummy data for book cards
  const navigate = useNavigate();

  useEffect(() => {
    
    featchData()
    console.log("fdsj")
    async function featchData(){
      console.log("-------fist start-------")
      const newArrivals= await  getNewArrivals();
      console.log("--------------------------------------------------")
      console.log("-----------hai--------");
      console.log("ejfsld")
          
      if(newArrivals.statuscode ==='200 OK')
      {
        console.log("jfsd")
        console.log(newArrivals.result)
        setNewArrivalBooks(newArrivals.result)
       
        console.log(newArrivalbooks)
        console.log("----books------");
      }
    }
    
  },[]);
  
  const handleShopNow = (id) => {
    // Navigate to the ProductOverview component with the provided ID
    navigate(`/ProductDetails/${id}`);
  };
  

return (
    <Container >
      <Row className="justify-content-center">
        <Col xs={12} className='main'>
          <h2 className='newarriwal-heading'>New Arrivals</h2>
          <div className="scrolling-wrapper">
            {newArrivalbooks.map((newArrivalbook) => (
              <Card key={newArrivalbook.id} className="book-card">
                <div className='cardss'>
               <div className="zoom-image-container">
                  <ReactImageZoom
                    {...{
                     
                      zoomWidth: 400,
                      img: newArrivalbook.images[1].imageUrl,
                      className: 'zoom-img',
                    }}
                  />
                </div>
                <div >
                <Card.Body className='body_card'>
                  <Card.Title className="book-name">{newArrivalbook.title}</Card.Title>
                  <Card.Text>
                    <p className='course'>{newArrivalbook.course.courseName}  {newArrivalbook.subject.subjectName}</p>
                    <p className='university'>{newArrivalbook.university.universityName}</p>
                    <p className='semester'>{newArrivalbook.semester.name}</p>
                    <p className='price'>Rs.{newArrivalbook.discountedPrice}</p>
                    <p className="real-price">{newArrivalbook.price}</p>
                    <p className="discount">{newArrivalbook.discountPresent}%OFF</p>
                  </Card.Text>
                 
                  <Button className='mybutton' variant="primary" onClick={()=>handleShopNow(newArrivalbook.id)}>Shop Now</Button>
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
          <h2 className='newarriwal-heading'>Calicut Universiry </h2>
          <div className="scrolling-wrapper">
            {newArrivalbooks.map((newArrivalbook) => (
              <Card key={newArrivalbook.id} className="book-card">
                <div className='cardss'>
               <div className="zoom-image-container">
                  <ReactImageZoom
                    {...{
                     
                      zoomWidth: 400,
                      img: newArrivalbook.images[1].imageUrl,
                      className: 'zoom-img',
                    }}
                  />
                </div>
                <div >
                <Card.Body className='body_card'>
                  <Card.Title className="book-name">{newArrivalbook.title}</Card.Title>
                  <Card.Text>
                    <p className='course'>{newArrivalbook.course.courseName}  {newArrivalbook.subject.subjectName}</p>
                    <p className='university'>{newArrivalbook.university.universityName}</p>
                    <p className='semester'>{newArrivalbook.semester.name}</p>
                    <p className='price'>Rs.{newArrivalbook.discountedPrice}</p>
                    <p className="real-price">{newArrivalbook.price}</p>
                    <p className="discount">{newArrivalbook.discountPresent}%OFF</p>
                  </Card.Text>
                 
                  <Button className='mybutton' variant="primary" onClick={()=>handleShopNow(newArrivalbook.id)}>Shop Now</Button>
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
          <h2 className='newarriwal-heading'>Kerala Universiry</h2>
          <div className="scrolling-wrapper">
            {newArrivalbooks.map((newArrivalbook) => (
              <Card key={newArrivalbook.id} className="book-card">
                <div className='cardss'>
               <div className="zoom-image-container">
                  <ReactImageZoom
                    {...{
                     
                      zoomWidth: 400,
                      img: newArrivalbook.images[1].imageUrl,
                      className: 'zoom-img',
                    }}
                  />
                </div>
                <div >
                <Card.Body className='body_card'>
                  <Card.Title className="book-name">{newArrivalbook.title}</Card.Title>
                  <Card.Text>
                    <p className='course'>{newArrivalbook.course.courseName}  {newArrivalbook.subject.subjectName}</p>
                    <p className='university'>{newArrivalbook.university.universityName}</p>
                    <p className='semester'>{newArrivalbook.semester.name}</p>
                    <p className='price'>Rs.{newArrivalbook.discountedPrice}</p>
                    <p className="real-price">{newArrivalbook.price}</p>
                    <p className="discount">{newArrivalbook.discountPresent}%OFF</p>
                  </Card.Text>
                 
                  <Button className='mybutton' variant="primary" onClick={()=>handleShopNow(newArrivalbook.id)}>Shop Now</Button>
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
          <h2 className='newarriwal-heading'>Recommended </h2>
          <div className="scrolling-wrapper">
            {newArrivalbooks.map((newArrivalbook) => (
              <Card key={newArrivalbook.id} className="book-card">
                <div className='cardss'>
               <div className="zoom-image-container">
                  <ReactImageZoom
                    {...{
                     
                      zoomWidth: 400,
                      img: newArrivalbook.images[1].imageUrl,
                      className: 'zoom-img',
                    }}
                  />
                </div>
                <div >
                <Card.Body className='body_card'>
                  <Card.Title className="book-name">{newArrivalbook.title}</Card.Title>
                  <Card.Text>
                    <p className='course'>{newArrivalbook.course.courseName}  {newArrivalbook.subject.subjectName}</p>
                    <p className='university'>{newArrivalbook.university.universityName}</p>
                    <p className='semester'>{newArrivalbook.semester.name}</p>
                    <p className='price'>Rs.{newArrivalbook.discountedPrice}</p>
                    <p className="real-price">{newArrivalbook.price}</p>
                    <p className="discount">{newArrivalbook.discountPresent}%OFF</p>
                  </Card.Text>
                 
                  <Button className='mybutton' variant="primary" onClick={()=>handleShopNow(newArrivalbook.id)}>Shop Now</Button>
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
