import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Dropdown, Form } from 'react-bootstrap';
import './Products.css'; // Import a CSS file for custom styles
import { useEffect } from 'react';
import NavBar from '../NavBar/Navbar';
import ReactImageZoom from 'react-image-zoom';
import { getNewArrivals } from '../../axios/service/productsService';
import { getCatgoriesFilter, getUniversityFilter, getCoursefilter, getSubjcetFilter, getSemesterFilter } from '../../axios/service/productsService';
import FilterBox from '../FilterBox/FilterBox';
import { FaHeart, FaShoppingCart, FaRegHeart,FaTimes } from 'react-icons/fa';
import Footer from '../Footer/Footer';
import { useSelector } from 'react-redux';
import { addToCart, removeFromCart, addToWishlist, getProductIdFromCart, getProductIdFromWishlist } from '../../axios/service/userService.s';
import { useNavigate } from 'react-router-dom';
const Products = () => {
  // Sample book data (can be fetched from an API or database)
  const [books, setBooks] = useState([])
  const [bookcategories, setCategories] = useState([]);
  const [bookcourses, setCourses] = useState([]);
  const [bookSubject, setSubjcets] = useState([]);
  const [bookuniversities, setUniversities] = useState([]);
  const [booksemesters, setSemesters] = useState([]);
  const [wishlistproductIds, setwishlistproductProdutIds] = useState([]);
  const [cartproductIds, setcartproductProdutIds] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const id = useSelector((state) => state.user.id)
  const jwtToken = localStorage.getItem("jwt");
  const [serverError, setServerError] = useState();
  const navigate = useNavigate();
  useEffect(() => {

    featchData()
    console.log("fdsj")
    async function featchData() {
      console.log("-------fist start-------")
      const allbooks = await getNewArrivals();
      const categories = await getCatgoriesFilter();
      const universities = await getUniversityFilter();
      const cartProdutIds = await getProductIdFromCart(id);
      console.log(cartProdutIds);
      const wishlistIds = await getProductIdFromWishlist(id);

      setcartproductProdutIds(cartProdutIds.result)
      setwishlistproductProdutIds(wishlistIds.result)
      // const universities=await getUniversities(token);
      console.log("--------------------------------------------------")
      console.log("-----------hai--------");
      console.log("ejfsld")

      if (allbooks.statuscode === '200 OK' && categories.statuscode === '200 OK' && universities.statuscode === '200 OK') {
        console.log("jfsd")
        console.log(allbooks.result)

        setBooks(allbooks.result)
        setCategories(categories.result);
        setUniversities(universities.result);
        console.log(allbooks)
        console.log(categories);
        console.log(universities);
        console.log("----books------");
      }
    }

  }, [!refresh]);
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const[showRemoveFilter,setShowRemoveFilter]=useState('');
  // State for sorting
  const [sortOrder, setSortOrder] = useState('');

  // Apply filters based on selections


  // Apply sorting based on price


  // Handle filter and sort changes
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  // const addToWishlist=()=>{

  // }

  // Add handlers for other filter options
  async function getCourse(category) {
    console.log("dfghj")
    const sub = await getCoursefilter(category)
    console.log(sub);
    if (sub.statuscode === '200 OK') {
      setCourses(sub.result);
    }


  }
  async function getsubject(course) {

    const sub = await getSubjcetFilter(course)
    if (sub.statuscode === '200 OK') {
      setSubjcets(sub.result);
      console.log(bookSubject);
    }


  }
  async function getsemester(category) {

    const sems = await getSemesterFilter(category)
    if (sems.statuscode === '200 OK') {
      setSemesters(sems.result);
    }


  }

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleCategory = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    getCourse(selectedCategory);
    getsemester(selectedCategory);

  };
  const handleSubjcet = (selectedCourse) => {
    setSelectedCourse(selectedCourse);
    getsubject(selectedCourse);


  };
  
  const booksInSetsOfFour = [];
  for (let i = 0; i < books.length; i += 7) {
    {
      booksInSetsOfFour.push(books.slice(i, i + 7));
      console.log(booksInSetsOfFour);
      console.log("66666666")
    }

  }
  const handleAddToCart = async (bookId) => {
    if (jwtToken) {
      try {

        const productInfo = {

          userId: id,
          productId: bookId,
          quantity: 1,

        }
        console.log("productDetails===", productInfo)
        const addtocart = await addToCart(jwtToken, productInfo)
        console.log("lsdhgck")
        console.log("addDetails", addtocart)

        if (addtocart.statuscode === '200 OK') {
          setRefresh(!refresh)
          console.log("Added to cart")
        } else {
          setServerError("Internal Server Error")
          setTimeout(() => {
            setServerError(false)
          }, 2000)
        }

      }

      catch (err) {
        setServerError("Internal Server Error")
        setTimeout(() => {
          setServerError(false)
        }, 2000)

      }
    }
    else {
      navigate('/UserLogin')
    }

  }
  const handleAddToWishlist = async (bookId) => {
    if (jwtToken) {


      try {

        const productInfo = {

          userId: id,
          productId: bookId,
          quantity: 1,

        }
        console.log("productDetails===", productInfo)
        const addtowishlist = await addToWishlist(jwtToken, productInfo)
        console.log("lsdhgck")
        console.log("addDetails", addtowishlist)

        if (addtowishlist.statuscode === '200 OK') {
          setRefresh(!refresh)
          console.log("Added to cart")
        } else {
          setServerError("Internal Server Error")
          setTimeout(() => {
            setServerError(false)
          }, 2000)
        }

      }

      catch (err) {
        setServerError("Internal Server Error")
        setTimeout(() => {
          setServerError(false)
        }, 2000)

      }
    }
    else {
      navigate('/UserLogin')
    }

  }
  const filterProducts=(categoryofbook,courseofbook,subjcetofbook,semesterofbook,universityofbook)=>{
    const filteredBooks = books.filter(book => (book.parentCategory
      .name === categoryofbook) && (book.course.courseName === courseofbook) && (book.subject.subjectName === subjcetofbook) && (book.semester.name === semesterofbook) &&
      (book.university.universityName === universityofbook));

      setBooks(filteredBooks)
      if(filteredBooks.length !=0)
      {
        setShowRemoveFilter(true)
      }
     
    }
    const handleRemoveFilter=()=>{
     
      setRefresh(!refresh)
      setShowRemoveFilter(false)
      setSelectedCategory('')
      setSelectedCourse('')
      setSelectedSemester('')
      setSelectedSubject('')
      setSelectedUniversity('')
    }


  return (
    <Container fluid>
      <NavBar />

      <Row className="product-page">


        <div className='dropdown-container'>
          <div class="dropdown">
            <span>Category</span>
            <div class="dropdown-content">
              <label key="all">
                <input
                  type="radio"
                  name="category"
                  value="All"
                  onChange={() => handleSubjcet('All')}
                />
                All
              </label>
              {bookcategories.map((category) => (
                <label key={category.id}>
                  <input
                    type="radio"
                    name="category"
                    value={category.name}
                    onChange={() => handleCategory(category.name)}
                  />
                  {category.name}
                </label>
              ))}

            </div>
          </div>

          <div class="dropdown">
            <span>Course</span>
            <div class="dropdown-content">

              {selectedCategory ? (
                bookcourses.filter((course) => course.showStatus != 'false').map((course) => (
                  <label key={course.id}>
                    <input
                      type="radio"
                      name="course"
                      value={course.courseName}
                      onChange={() => handleSubjcet(course.courseName)}
                    />
                    {course.courseName}
                  </label>
                ))
              ) : (
                <span className='selectcategory'>Please select a Category</span>
              )}


            </div>
          </div>
          <div class="dropdown">
            <span>Subjcet</span>
            <div class="dropdown-content">
              {selectedCourse ? (
                bookSubject.filter((Subjcet) => Subjcet.showStatus != 'false').map((Subjcet) => (
                  <label key={Subjcet.id}>
                    <input
                      type="radio"
                      name="subjcet"
                      value={Subjcet.subjectName}
                      onChange={() => setSelectedSubject(Subjcet.subjectName)}
                    />
                    {Subjcet.subjectName}
                  </label>
                ))) : (<span className='selectcategory'>Please select a Course</span>)}
            </div>
          </div>

          <div class="dropdown">
            <span>Semester</span>
            <div class="dropdown-content">
              {selectedCategory ? (
                booksemesters.map((semester) => (
                  <label key={semester.id}>
                    <input
                      type="radio"
                      name="semester"
                      value={semester.name}
                      onChange={() => setSelectedSemester(semester.name)}
                    />
                    {semester.name}
                  </label>
                ))) : (<span className='selectcategory'>Please select a Category</span>)}

            </div>
          </div>
          <div class="dropdown">
            <span>University</span>
            <div class="dropdown-content">
              <label key="all">
                <input
                  type="radio"
                  name="university"
                  value="All"
                  onChange={() => handleSubjcet('All')}
                />
                All
              </label>
              <div class="dropdown-content">
                {bookuniversities.map((university) => (
                  <label key={university.id}>
                    <input
                      type="radio"
                      name="university"
                      value={university.name}
                      onChange={() => setSelectedUniversity(university.universityName)}
                    />
                    {university.universityName}
                  </label>
                ))}

              </div>

            </div>
          </div>

          <div class="dropdown1" onClick={() => filterProducts(selectedCategory, selectedCourse, selectedSubject, selectedSemester, selectedUniversity)}>
            <span>Filter</span>
            {/* <div class="dropdown-content">
              <label>
                <input type="radio" name="discountrange" value="lowToHigh" onclick="handleSortChange('lowToHigh')" />
                10%-15%
              </label>
              <label>
                <input type="radio" name="category" value="highToLow" onclick="handleSortChange('highToLow')" />
                15%-30%
              </label>

            </div> */}
          </div>
          {/* <!-- Price Range --> */}
         {showRemoveFilter && <div class="dropdown" >
            {/* <span>Remove Filter</span> */}
            <FaTimes className='removeflitericon' onClick={handleRemoveFilter} />
            {/* <div class="dropdown-content">
              <label>
                <input type="radio" name="pricerange" value="lowToHigh" onclick="handleSortChange('lowToHigh')" />
                Rs.99-Rs.299
              </label>
              <label>
                <input type="radio" name="category" value="highToLow" onclick="handleSortChange('highToLow')" />
                Rs.299-Rs.599
              </label>
            </div> */}
          </div>}
        </div>

       {books.length >0 ?(
        <div className='setCards'>

          <Col md={10} >
            {booksInSetsOfFour.map((setOfFour, index) => (
              <div className='booklist'>

                <div className='d-flex justify-content-evenly'>

                  <div key={index} className='booklist'>
                    <div className='d-flex justify-content-evenly'>
                      {setOfFour.filter((book) => book.status != 'false').map((book) => (
                        <Card key={book.id} className="book-card">
                          <div className='cardss'>
                            <div className="zoom-image-container">
                              <img
                                src={book.images[1].imageUrl}
                                alt={book.title}
                                className="zoom-img"
                                style={{ width: '150px', height: '150px' }}
                              />
                            </div>
                            <div>
                              <Card.Body className='body_card'>
                                <div class="card-header">
                                  {jwtToken && cartproductIds && cartproductIds.includes(book.id) ? (

                                    <FaShoppingCart className="addedcart-icon" />
                                    // <FaCheck className="check-icon" />

                                  ) : (
                                    <FaShoppingCart className="cart-icon" onClick={() => handleAddToCart(book.id)} />
                                  )}
                                  {jwtToken && wishlistproductIds && wishlistproductIds.includes(book.id) ? (
                                    <FaHeart className="wishlist-icon-blur" />
                                  ) : (
                                    <FaRegHeart className="wishlist-icon" onClick={() => handleAddToWishlist(book.id)} />
                                  )}
                                </div>
                                <Card.Title className="book-name">{book.title}</Card.Title>
                                <Card.Text>
                                  <p className='course'>{book.course.courseName}  {book.subject.subjectName}</p>
                                  <p className='university'>{book.university.universityName}</p>
                                  <p className='semester'>{book.semester.name}</p>

                                  <p className='price'>
                                    <span className='discounted-price'>${book.discountedPrice}</span>
                                    <s className='real'>${book.price}</s>
                                    <span className='discount'>{book.discountPresent}% OFF</span>
                                  </p>



                                </Card.Text>

                              </Card.Body>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            ))}


          </Col>
          {serverError && <div className="overlay" />}
          {serverError && (
            <div className='serverError'><h4 className='serverError'>{serverError}</h4></div>
          )}
        </div>) : <p className='nobooks'>No Books Available</p>}

      </Row>

    </Container>

  );
};

export default Products;








{/* Sort options */ }
{/* <div className="d-flex justify-content-between w-100 align-items-center mb-4 ml-xxl">
          
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
          </div> */}
{/* Display Books */ }