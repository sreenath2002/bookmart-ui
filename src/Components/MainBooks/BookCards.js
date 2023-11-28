import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './BookCards.css'; // Import a CSS file for custom styles
import { getNewArrivals } from '../../axios/service/productsService';
import ProductOverview from '../ProductOverview/ProductOverview';
import { useEffect } from 'react';
import { useState } from 'react';
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
        <Col xs={12}>
          <h2 className='newarriwal-heading'>New Arrivals</h2>
          <div className="scrolling-wrapper">
            {newArrivalbooks.map((newArrivalbook) => (
              <Card key={newArrivalbook.id} className="book-card">
                 {newArrivalbook.images[1] && newArrivalbook.images[1].imageUrl && (
    <Card.Img variant="top" src={newArrivalbook.images[1].imageUrl} />
  )}
                <Card.Body>
                  <Card.Title className="book-name">{newArrivalbook.title}</Card.Title>
                  <Card.Text>
                    <p>{newArrivalbook.course.courseName}</p>
                    <p>{newArrivalbook.university.universityName}</p>
                    <p>{newArrivalbook.semester.name}</p>
                    <p>{newArrivalbook.price}</p>
                    <p className="real-price">{newArrivalbook.discountedPrice}</p>
                    <p className="discount">{newArrivalbook.discountPresent}</p>
                  </Card.Text>
                 
                  <Button variant="primary" onClick={()=>handleShopNow(newArrivalbook.id)}>Shop Now</Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BookCards;
