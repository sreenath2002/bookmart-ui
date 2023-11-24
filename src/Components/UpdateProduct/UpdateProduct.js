import React, { useState } from 'react';
// import './AddProduct.css'; // Import your CSS file for styling

const UpdateProduct = () => {
  const [bookName, setBookName] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [semesterName, setSemesterName] = useState('');
  const [images, setImages] = useState([]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    // Logic to add product with the form data (bookName, subjectName, courseName, etc.)
    const productData = {
      bookName,
      subjectName,
      courseName,
      universityName,
      authorName,
      semesterName,
      images // Handle images as needed
    };
    console.log('New Product Data:', productData);
    // Implement add product functionality
  };

  return (
    <div className="add-product-container">
      <form onSubmit={handleAddProduct} className="add-product-form">
        <div className="form-group">
          <label htmlFor="bookName">Book Name</label>
          <input
            type="text"
            id="bookName"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subjectName">Subject Name</label>
          <input
            type="text"
            id="subjectName"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          {/* Other input fields (courseName, universityName, authorName, semesterName) */}
          {/* ... */}
        </div>
        <div className="form-group">
          <label htmlFor="images">Images</label>
          <input
            type="file"
            id="images"
            multiple
            onChange={(e) => setImages([...images, ...e.target.files])}
            accept="image/*"
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
