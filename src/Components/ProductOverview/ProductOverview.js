import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getProductSelectedProductDetails } from '../../axios/service/productsService';
import ReactImageZoom from 'react-image-zoom';
import StarIcon from '../Star/StarIcon';
import { useNavigate } from 'react-router-dom';
import { getallreviews, addReviewRequest,getwalletamt,addToCart,getProductIdFromCart} from '../../axios/service/userService.s';
import './ProductOverview.css';

const ProductOverview = (props) => {
  const [selecteddBookDetails, setNewArrivalBookDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
   const navigate =useNavigate();
  const [error, setError] = useState(null);
  const [cartproductIds, setcartproductProdutIds] = useState([]);
  const jwtToken = localStorage.getItem("jwt");
  const userid = localStorage.getItem("id")
  const [newReview, setNewReview] = useState();
  const [comment, setComment] = useState();
  const [ratingofbook, setRatingOfbook] = useState();
  const [refresh, setRefresh] = useState(false)
  const [reviewAddedSucces, setReviewAddedMessage] = useState();
  const [reviewAddedFailed, setReviewAddedFailedMessage] = useState();
  const[ratingavg,setAvg]=useState()
  const[walletamount,setWalletAmount]=useState(0);
  const[errorserver,setServerError]=useState();
  const [reviews, setReviews] = useState([

    // Add more reviews as needed
  ]);

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) {
      return 0; // Return 0 if there are no reviews or reviews array is empty
    }
  
    const totalRatings = reviews.reduce((accumulator, review) => {
      return accumulator + review.rating; // Summing up all the ratings
    }, 0);
  
    const averageRating = totalRatings / reviews.length; // Calculating average
       setAvg(averageRating);
     console.log(averageRating)
  };
  useEffect(() => {
    async function fetchData(jwtToken, id) {
      try {

        const newArrivalsDetails = await getProductSelectedProductDetails(jwtToken, id);
          const cartProdutIds = await getProductIdFromCart(userid);
          if(cartProdutIds.statuscode === '200 OK' && cartProdutIds.result.length >0)
          {
            setcartproductProdutIds(cartProdutIds.result)
          }
          else{
            setcartproductProdutIds([])
          }
           
        if (newArrivalsDetails.statuscode === '200 OK') {
          setNewArrivalBookDetails(newArrivalsDetails.result);

          setIsLoading(false);
        }
        const reviewsofthebook = await getallreviews(jwtToken, id)
        if (reviewsofthebook.statuscode === '200 OK') {
          setReviews(reviewsofthebook.result)
          calculateAverageRating(reviews);

        }

        
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }
    fetchData(jwtToken, props.id);
  }, [!refresh]);

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
  


  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewReview({ ...newReview, [name]: value });
  };

  // const addReview = () => {
  //   if (newReview.user && newReview.comment) {
  //     const newId = reviews.length + 1;
  //     setReviews([...reviews, { ...newReview, id: newId }]);
  //     setNewReview({ user: '', comment: '', rating: 1 });
  //   } else {
  //     alert('Please enter both user and comment.');
  //   }
  // };


  const handleaddnewreview = async (e) => {


    try {
      const reviewDetails = {
        review: comment,
        userId: userid,
        rating: ratingofbook
      }

      const responseofreviewadd = await addReviewRequest(jwtToken, props.id, reviewDetails);

      if (responseofreviewadd.statuscode === '200 OK') {
        setRefresh(!refresh)
        setReviewAddedMessage(true)
        setTimeout(() => {
          setReviewAddedMessage(false);

        }, 2000)

      }
    }
    catch {
      setReviewAddedFailedMessage(true)
      setTimeout(() => {
        setReviewAddedFailedMessage(false);

      }, 2000)

    }

  }
  const handleAddToCart = async (bookId) => {
    if (jwtToken) {
      try {

        const productInfo = {

          userId: userid,
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
  return (
    <div className='overview'>
      <div className="product-row">
        {errorserver && <div>{errorserver}</div>}
        {/* Main product image */}
        <div md={6} className="d-flex justify-content-center align-items-center">
          <div>
            <ReactImageZoom
              width={300}
              height={300}
              zoomWidth={300}

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
              {cartproductIds && cartproductIds.includes(selecteddBookDetails.id) ? 
               (<Button variant="primary" className="add-to-cart-button" >
               Added to Cart
             </Button>) :  (<Button variant="primary" className="add-to-cart-button" onClick={()=>handleAddToCart(selecteddBookDetails.id)}>
                Add to Cart
              </Button>)}
             
              {/* <Button variant="success" className="buy-now-button">
                Buy Now
              </Button> */}
            </div>

            <p className="product-info">Description</p>
            <p className='description'>{selecteddBookDetails.description}</p>

          </div>

        </div>

      </div>
      <div className='smallsubdiv'>
      <div className="user-reviews">
        <h2> Reviews</h2>
        {reviews.length > 0 ? (
  <div className="reviews-list">
    {reviews.map((review) => {
      const date = new Date(review.createdAt);
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

      return (
        <div key={review.id} className="review">
          <p>
            <strong>
              {review.userfirstname} {review.userlastname}
            </strong>
          </p>
          <p>{review.review}</p>
          <p>
            {' '}
            {Array.from({ length: review.rating }, (_, index) => (
              <StarIcon key={index} />
            ))}
          </p>
          <p>
            {formattedDate} at {formattedTime}
          </p>
        </div>
      );
    })}
  </div>
) : (
  <p>No reviews available</p>
)}


        <div className="add-review">
          <h3>Add a Review</h3>
          <form >

            <textarea
              name="comment"
              placeholder="Your Comment"
              value={comment}
              onChange={(e) => { setComment(e.target.value) }}
            ></textarea>
            <select name="rating" onChange={(e) => { setRatingOfbook(e.target.value) }}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            {reviewAddedFailed && <div className='errorreview'>Internal Server Error</div>}
            {reviewAddedSucces && <div className='succesReview'>Thanks For Your Review</div>}
            <button className="userreviewbtn" onClick={() => { handleaddnewreview() }}>Add Review</button>
          </form>
        </div>
      </div>
      {/* <div class='ratingsdiv'>
  <div class='circle-rating'>
    <h1 className='valuerating'>{ratingavg}</h1>
  </div>
  <span>Ratings</span>
  <h5>{reviews.length} Reviews</h5>
</div> */}

      </div>
    </div>
  );
};

export default ProductOverview;

