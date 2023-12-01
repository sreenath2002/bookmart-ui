import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Dropdown, Form } from 'react-bootstrap';
import './Products.css'; // Import a CSS file for custom styles
import { useEffect } from 'react';
import NavBar from '../NavBar/Navbar';
import { getNewArrivals } from '../../axios/service/productsService';
const Products = () => {
  // Sample book data (can be fetched from an API or database)
  const [books, setBooks] = useState([])
    
  useEffect(() => {
    
    featchData()
    console.log("fdsj")
    async function featchData(){
      console.log("-------fist start-------")
      const allbooks= await  getNewArrivals();
      console.log("--------------------------------------------------")
      console.log("-----------hai--------");
      console.log("ejfsld")
          
      if(allbooks.statuscode ==='200 OK')
      {
        console.log("jfsd")
        console.log(allbooks.result)
        setBooks(allbooks.result)
        console.log(allbooks)
        console.log("----books------");
      }
    }
    
  },[]);
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  // State for sorting
  const [sortOrder, setSortOrder] = useState('');

  // Apply filters based on selections
  const filteredBooks = books.filter(book => {
    return (
      (selectedCategory === '' || book.category === selectedCategory) &&
      (selectedCourse === '' || book.courseName === selectedCourse) &&
      (selectedUniversity === '' || book.universityName === selectedUniversity) &&
      (selectedSemester === '' || book.semester === selectedSemester) &&
      (selectedSubject === '' || book.subject === selectedSubject)
    );
  });

  // Apply sorting based on price
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOrder === 'lowToHigh') {
      return a.price - b.price;
    } else if (sortOrder === 'highToLow') {
      return b.price - a.price;
    }
    return 0;
  });

  // Handle filter and sort changes
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Add handlers for other filter options

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  return (
    <Container fluid className="p-0 w-50 mt-80">
      <NavBar/> {/* Use fluid and p-0 80to make the container full-screen */}
      <Row className="mt-2">
        
        <Col md={10}>
          {/* Sort options */}
          <div className="d-flex justify-content-between w-100 align-items-center mb-3">
            <h4>Sort By Price</h4>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Sort
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSortChange('lowToHigh')}>
                  Low to High
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange('highToLow')}>
                  High to Low
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {/* Display Books */}
          <Row>
            {books.map((book) => (
              <Col key={book.id} md={5} className="mb-4">
                <Card className='w-xl'>
                  <Card.Img variant="top" src={book.images[1].imageUrl} />
                  <Card.Body className='p-1 w-'>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>
                      <p>Course: {book.course.courseName} {book.subject.subjectName}</p>
                      <p>University: {book.university.universityName}</p>
                      <p className='price'> ${book.discountedPrice}</p>
                      <p className='discounted'> <s>${book.price}</s></p>
                      <p className='discount'>{book.discountPresent} %OFF</p>
                    </Card.Text>
                    <Button variant="primary">Add to Wishlist</Button>
                    <Button variant="success" className="ml-2">Add to Cart</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Products;

