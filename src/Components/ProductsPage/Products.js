import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Dropdown, Form } from 'react-bootstrap';
import './Products.css'; // Import a CSS file for custom styles

const Products = () => {
  // Sample book data (can be fetched from an API or database)
  const [books, setBooks] = useState([
    // Sample book data
    {
      id: 1,
      bookName: 'Book 1',
      courseName: 'Course A',
      universityName: 'University X',
      semester: 'Semester 1',
      price: 50,
      image:'Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg',
      discountedPrice: 40,
      category: 'Category 1',
    },
    {
        id: 1,
        bookName: 'Book 1',
        courseName: 'Course A',
        universityName: 'University X',
        semester: 'Semester 1',
        price: 50,
        image:'Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg',
        discountedPrice: 40,
        category: 'Category 1',
      },
      {
        id: 1,
        bookName: 'Book 1',
        courseName: 'Course A',
        universityName: 'University X',
        semester: 'Semester 1',
        price: 50,
        image:'Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg',
        discountedPrice: 40,
        category: 'Category 1',
      },
      {
        id: 1,
        bookName: 'Book 1',
        courseName: 'Course A',
        universityName: 'University X',
        semester: 'Semester 1',
        price: 50,
        image:'Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg',
        discountedPrice: 40,
        category: 'Category 1',
      },
      {
        id: 1,
        bookName: 'Book 1',
        courseName: 'Course A',
        universityName: 'University X',
        semester: 'Semester 1',
        price: 50,
        image:'Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg',
        discountedPrice: 40,
        category: 'Category 1',
      },
      {
        id: 1,
        bookName: 'Book 1',
        courseName: 'Course A',
        universityName: 'University X',
        semester: 'Semester 1',
        price: 50,
        image:'Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg',
        discountedPrice: 40,
        category: 'Category 1',
      },
    // Add more book data here
  ]);

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
    <Container fluid className="p-0"> {/* Use fluid and p-0 to make the container full-screen */}
      <Row className="mt-5">
        <Col md={3}>
          {/* Filter options */}
          <h4>Filters</h4>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            {/* Add options for categories */}
            {/* ... (existing category checkboxes) */}
          </Form.Group>
          <Form.Group>
            <Form.Label>Course</Form.Label>
            {/* Add options for courses */}
            {/* ... (existing course checkboxes) */}
          </Form.Group>
          <Form.Group>
            <Form.Label>University</Form.Label>
            {/* Add options for universities */}
            {/* ... (university checkboxes) */}
          </Form.Group>
          <Form.Group>
            <Form.Label>Semester</Form.Label>
            {/* Add options for semesters */}
            {/* ... (semester checkboxes) */}
          </Form.Group>
          {/* Add other filter options */}
        </Col>
        <Col md={9}>
          {/* Sort options */}
          <div className="d-flex justify-content-between align-items-center mb-3">
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
            {sortedBooks.map((book) => (
              <Col key={book.id} md={4} className="mb-3">
                <Card>
                  <Card.Img variant="top" src={book.image} />
                  <Card.Body>
                    <Card.Title>{book.bookName}</Card.Title>
                    <Card.Text>
                      <p>Course: {book.courseName}</p>
                      <p>University: {book.universityName}</p>
                      <p>Price: ${book.price}</p>
                      <p>Discounted Price: ${book.discountedPrice}</p>
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

