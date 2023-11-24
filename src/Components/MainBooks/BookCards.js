import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './BookCards.css'; // Import a CSS file for custom styles

const BookCards = () => {
  // Dummy data for book cards
  const bookData = [
    // Data for New Arrivals section
     {
       id: 1,
      bookImage: 'Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg',
       bookName: 'Book 1 Name',
       courseName: 'Course 1',
      university: 'University Name',
 semester: 'Semester 1',
        price: '$50',
       realPrice: '$60',
      discount: '20%',
    },
    {
        id: 1,
       bookImage: 'Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg',
        bookName: 'Book 1 Name',
        courseName: 'Course 1',
       university: 'University Name',
  semester: 'Semester 1',
         price: '$50',
        realPrice: '$60',
       discount: '20%',
     },
     {
        id: 1,
       bookImage: 'Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg',
        bookName: 'Book 1 Name',
        courseName: 'Course 1',
       university: 'University Name',
  semester: 'Semester 1',
         price: '$50',
        realPrice: '$60',
       discount: '20%',
     },
     {
        id: 1,
       bookImage: 'Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg',
        bookName: 'Book 1 Name',
        courseName: 'Course 1',
       university: 'University Name',
  semester: 'Semester 1',
         price: '$50',
        realPrice: '$60',
       discount: '20%',
     },
     {
        id: 1,
       bookImage: 'Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg',
        bookName: 'Book 1 Name',
        courseName: 'Course 1',
       university: 'University Name',
  semester: 'Semester 1',
         price: '$50',
        realPrice: '$60',
       discount: '20%',
     },
     {
        id: 1,
       bookImage: 'Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg',
        bookName: 'Book 1 Name',
        courseName: 'Course 1',
       university: 'University Name',
  semester: 'Semester 1',
         price: '$50',
        realPrice: '$60',
       discount: '20%',
     },
     {
        id: 1,
       bookImage: 'Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg',
        bookName: 'Book 1 Name',
        courseName: 'Course 1',
       university: 'University Name',
  semester: 'Semester 1',
         price: '$50',
        realPrice: '$60',
       discount: '20%',
     },
     {
        id: 1,
       bookImage: 'Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg',
        bookName: 'Book 1 Name',
        courseName: 'Course 1',
       university: 'University Name',
  semester: 'Semester 1',
         price: '$50',
        realPrice: '$60',
       discount: '20%',
     },
     {
        id: 1,
       bookImage: 'Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg',
        bookName: 'Book 1 Name',
        courseName: 'Course 1',
       university: 'University Name',
  semester: 'Semester 1',
         price: '$50',
        realPrice: '$60',
       discount: '20%',
     },
     {
        id: 1,
       bookImage: 'Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg',
        bookName: 'Book 1 Name',
        courseName: 'Course 1',
       university: 'University Name',
  semester: 'Semester 1',
         price: '$50',
        realPrice: '$60',
       discount: '20%',
     },
     {
      id: 1,
     bookImage: 'Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg',
      bookName: 'Book 1 Name',
      courseName: 'Course 1',
     university: 'University Name',
semester: 'Semester 1',
       price: '$50',
      realPrice: '$60',
     discount: '20%',
   },
     
  
    // ... More data for other sections
  ];

return (
    <Container >
      <Row className="justify-content-center">
        <Col xs={12}>
          <h2 className='newarriwal-heading'>New Arrivals</h2>
          <div className="scrolling-wrapper">
            {bookData.map((book) => (
              <Card key={book.id} className="book-card">
                <Card.Img variant="top" src={book.bookImage} />
                <Card.Body>
                  <Card.Title className="book-name">{book.bookName}</Card.Title>
                  <Card.Text>
                    <p>{book.courseName}</p>
                    <p>{book.university}</p>
                    <p>{book.semester}</p>
                    <p>{book.price}</p>
                    <p className="real-price">{book.realPrice}</p>
                    <p className="discount">{book.discount}</p>
                  </Card.Text>
                  <Button variant="primary">Shop Now</Button>
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
