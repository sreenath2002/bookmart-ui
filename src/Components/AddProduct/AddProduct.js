import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './AddProduct.css';
import { getCourses, getUniversities } from '../../axios/service/authServices';

const AddProduct = ({ handleBack }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [discountPresent, setDiscountPresent] = useState('');
  const [quantity, setQuantity] = useState('');
  const [course, setCourse] = useState('');
  const [subject, setSubject] = useState('');
  const [university, setUniversity] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [semester, setSemester] = useState('');
  const [courseOptions, setCourseOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [universityOptions, setUniversityOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [semesterOptions, setSemesterOptions] = useState([]);

  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };
  const jwtToken = localStorage.getItem("jwt");

  useEffect(() => {
    featchData(jwtToken)
    async function featchData(token) {
      const course = await getCourses(token);
      const University = await getUniversities(token);
      setCourseOptions(course);
      setUniversityOptions(University)
      // if (course.status && University  === 200){
      //   setCourseOptions(course);
      // setUniversityOptions(University)
      // }
    }


  }, []);



  useEffect(() => {
    axios.get('http://localhost:8083/api/auth/subcategory', {
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Include the token in the headers
      },
    })
      .then(response => {
        setSubcategoryOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });

    // Fetch other dropdown options similarly for subject, university, category, subcategory, semester
    // Use useEffect and axios to fetch data for each dropdown
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8083/api/auth/category', {
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Include the token in the headers
      },
    })
      .then(response => {
        setCategoryOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });

    // Fetch other dropdown options similarly for subject, university, category, subcategory, semester
    // Use useEffect and axios to fetch data for each dropdown
  }, []);

  useEffect(() => {
    if (course) {
      axios.get(`http://localhost:8083/api/auth/subjects/${course}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the token in the headers
        },
      })
        .then(response => {
          setSubjectOptions(response.data);
        })
        .catch(error => {
          console.error('Error fetching subjects:', error);
        });
    }
  }, [course]);

  useEffect(() => {
    if (category) {
      axios.get(`http://localhost:8083/api/auth/semester/${category}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the token in the headers
        },
      })
        .then(response => {
          setSemesterOptions(response.data);
        })
        .catch(error => {
          console.error('Error fetching subjects:', error);
        });
    }
  }, [category]);








  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to add a new product with entered details and images
    // Use the form data and images to create a new product
    console.log('Add new product:', {
      title,
      description,
      price,
      discountedPrice,
      discountPresent,
      quantity,
      course,
      subject,
      university,
      author,
      category,
      subcategory,
      semester,

      images,
    });
    // Call an API or update state as needed
  };

  return (
    <div className="add-product-form">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex'>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <br />
        <div className='flex'>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label htmlFor="discountedPrice">Discounted Price</label>
          <input
            type="text"
            id="discountedPrice"
            name="discountedPrice"
            value={discountedPrice}
            onChange={(e) => setDiscountedPrice(e.target.value)}
            required
          />
        </div>
        <br />
        <div className='flex'>
          <label htmlFor="discountPresent">Discount Present</label>
          <input
            type="text"
            id="discountPresent"
            name="discountPresent"
            value={discountPresent}
            onChange={(e) => setDiscountPresent(e.target.value)}
            required
          />
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className='flex'>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />


        </div>
        <div className='flex'>
          <label htmlFor="course">Course</label>
          <select id="course" name="course" value={course} onChange={(e) => setCourse(e.target.value)} required>
            <option value="">Select Course</option>
            {courseOptions.map(course => (
              <option key={course.id} value={course.id}>
                {course.courseName}
              </option>
            ))}
          </select>
          <label htmlFor="subjcet">Subjcet</label>
          <select id="subjcet" name="subjcet" value={subject} onChange={(e) => setSubject(e.target.value)} required>
            <option value="">Select Subjcet</option>
            {subjectOptions.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.course.courseName}
              </option>
            ))}
          </select>

          {/* Add similar dropdowns for subject, university, category, subcategory, semester */}

        </div>
        <div className='flex'>
          <label htmlFor="university">University</label>
          <select id="university" name="university" value={university} onChange={(e) => setUniversity(e.target.value)} required>
            <option value="">Select University</option>
            {universityOptions.map(university => (
              <option key={university.id} value={university.id}>
                {university.universityName}
              </option>
            ))}
          </select>
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            {categoryOptions.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>


          {/* Add similar dropdowns for subject, university, category, subcategory, semester */}

        </div>
        <div className='flex'>

          <label htmlFor="subcategory">Subcategory</label>
          <select id="subcategory" name="subcategory" value={subcategory} onChange={(e) => setSubject(e.target.value)} required>
            <option value="">Select Subcategory</option>
            {subcategoryOptions.map(subcategory => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
          <label htmlFor="semester">Semester</label>
          <select id="semester" name="semester" value={semester} onChange={(e) => setSemester(e.target.value)} required>
            <option value="">Select Semester</option>
            {semesterOptions.map(semester => (
              <option key={semester.id} value={semester.id}>
                {semester.parentCategory.name}
              </option>
            ))}
          </select>

          {/* Add similar dropdowns for subject, university, category, subcategory, semester */}

        </div>


        {/* Add more input fields with their respective labels and onChange handlers */}

        {/* Input for multiple images */}
        <label htmlFor="productImages">Product Images:</label>
        <input
          type="file"
          id="productImages"
          name="productImages"
          accept="image/*"
          onChange={handleImageChange}
          multiple
        />

        {/* Display selected images */}
        <div className="selected-images">
          {images.map((image, index) => (
            <img key={index} src={URL.createObjectURL(image)} alt={`Product Image ${index + 1}`} />
          ))}
        </div>

        <button type="submit">Add</button>
        <button onClick={handleBack}>Cancel</button>
      </form>
    </div>
  );
};

export default AddProduct;

