import React, { useState } from 'react';
import './UserReviewSection.css' 
const UserReviewSection = () => {
  const [reviews, setReviews] = useState([
    { id: 1, user: 'John Doe', comment: 'This book is amazing!', rating: 5 },
    { id: 2, user: 'Jane Smith', comment: 'Great content and very informative.', rating: 4 },
    // Add more reviews as needed
  ]);

  const [newReview, setNewReview] = useState({
    user: '',
    comment: '',
    rating: 1, // Default rating
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const addReview = () => {
    if (newReview.user && newReview.comment) {
      const newId = reviews.length + 1;
      setReviews([...reviews, { ...newReview, id: newId }]);
      setNewReview({ user: '', comment: '', rating: 1 });
    } else {
      alert('Please enter both user and comment.');
    }
  };

  return (
    <div className="user-reviews">
      <h2> Reviews</h2>
      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review.id} className="review">
            <p><strong>{review.user}</strong></p>
            <p>Rating: {review.rating}/5</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
      <div className="add-review">
        <h3>Add a Review</h3>
        <form onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            name="user"
            placeholder="Your Name"
            value={newReview.user}
            onChange={handleInputChange}
          />
          <textarea
            name="comment"
            placeholder="Your Comment"
            value={newReview.comment}
            onChange={handleInputChange}
          ></textarea>
          <select name="rating" value={newReview.rating} onChange={handleInputChange}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button onClick={addReview}>Add Review</button>
        </form>
      </div>
    </div>
  );
};

export default UserReviewSection;
