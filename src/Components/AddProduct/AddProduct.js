import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './AddProduct.css';
import imageCompression from 'browser-image-compression';
import { getCourses, getSubjects, getUniversities, getcategory, getsemester, getsubcategory } from '../../axios/service/adminServices';
import { Await } from 'react-router-dom';
import { createProduct } from '../../axios/service/adminServices';
import { colors } from '@mui/material';
import { addProductValidation } from '../../validation/validation';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const AddProduct = (props) => {
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

  const [semester, setSemester] = useState('');
  const [courseOptions, setCourseOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [universityOptions, setUniversityOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [semesterOptions, setSemesterOptions] = useState([]);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [discountedPriceError, setDiscountedPriceError] = useState(false);
  const [discountPresentError, setDiscountPresentError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);
  const [courseError, setCourseError] = useState(false);
  const [subjcetError, setSubjcetError] = useState(false);
  const [universityError, setUniversityError] = useState(false);
  const [authorError, setAuthorError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [subcategoryError, setSubcategoryError] = useState(false);
  const [semesterError, setSemesterError] = useState(false);
    const[imageError,setImageError]=useState(false)
  const [images, setImages] = useState([]);
  const [errorMessage, seterrorMessage] = useState('')
  const [success, setsuccess] = useState(false)


  const handleImageChange = async (e, index) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const options = {
          maxSizeMB: 0.5, // Max size in MB
          maxWidthOrHeight: 1920, // Maximum width or height of the image
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        const reader = new FileReader();
        reader.onload = () => {
          const newImages = [...images];
          newImages[index] = reader.result;
          setImages(newImages);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('Image compression error:', error);
      }
    }
  };


  const jwtToken = localStorage.getItem("jwt");
  const id = useSelector((state) => state.user.id);
  useEffect(() => {
    featchData(jwtToken)
    async function featchData(token) {
      console.log("dfghjkl")

      const University = await getUniversities(token);
      console.log("dfghjkl")
      const category = await getcategory(token);
      console.log(course) 
      console.log("dfghjkl")

      if (University?.statuscode && category.statuscode === '200 OK') {

        setUniversityOptions(University.result)
        setCategoryOptions(category.result);
        console.log(setCategoryOptions)

      }
    }


  }, []);

  async function getCourse(category) {
    console.log("dfghj")
    const sub = await getCourses(jwtToken, category)
    console.log(sub);
    if (sub.statuscode === '200 OK') {
      setCourseOptions(sub.result);
    }


  }

  async function getsubject(course) {
    setCourse(course)
    const sub = await getSubjects(jwtToken, course)
    if (sub.statuscode === '200 OK') {
      setSubjectOptions(sub.result);
    }


  }
  async function getsemeste(category) {
    setCategory(category)
    const sems = await getsemester(jwtToken, category)
    if (sems.statuscode === '200 OK') {
      setSemesterOptions(sems.result);
    }


  }
  const handlCCancel = () => {
    props.handleBack();
  }

  const handleCategoryOnChange=(category)=>{
    setCategory(category)
    getCourse(category)
    getsemeste(category)
    // getCourses(e.target.value)
    // getsemeste(e.target.value)
  }
  









  const handleValidation = async (event) => {
    event.preventDefault();
    // Logic to add a new product with entered details and images
    // Use the form data and images to create a new product
    try {
     console.log(author)
     console.log("+++++++++")
    
    await addProductValidation.validate(
      {
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
      semester,
      images,
      },
      { abortEarly: false }

    );
      
  
    // Call an API or update state as needed
 

 
    event.preventDefault();
    // if (validateForm()) {
    try {

      const productDetails = {

        title: title,
        description: description,
        price: price,
        userId: id,
        discountedPrice: discountedPrice,
        discountPresent: discountPresent,
        quantity: quantity,
        courses: course,
        subjects: subject,
        universitys: university,
        authors: author,
        parentCategory: category,
        semester: semester,
        imageUrls: images,
      }
      console.log("productDetails===", productDetails)
      const addDetails = await createProduct(jwtToken, productDetails)
      console.log("lsdhgck")
      console.log("addDetails", addDetails)

      if (addDetails.statuScode === '201 CREATED') {
        props.handleProductUpdated();
        setsuccess(true)
      } else {
        seterrorMessage(addDetails.message)
      }

    }

    catch (err) {
      console.log("error", err)
      seterrorMessage('Internal sever error.')
    }
  }
  catch (error){
    const errors = {};
 error.inner.forEach((e) => {
errors[e.path] = e.message;
});
console.log('Validation Errors:', errors);
console.log("dfghjklxcvbnmxcvbnxcvb")
setTitleError(errors.title || '');
setDescriptionError(errors.description || '');
setPriceError(errors.price || '');
setDiscountedPriceError(errors.discountedPrice || '');
setDiscountPresentError(errors.discountPresent || '');
setQuantityError(errors.quantity|| '');
setCourseError(errors.course || '');
setSubjcetError(errors.subject || ''); // Typo in 'subject' spelling
setUniversityError(errors.university || '');
setAuthorError(errors.author
  || '');

setCategoryError(errors.category
  || '');
setSemesterError(errors.semester || '');
 setImageError(errors.images || '')
console.log('Validation Errors:', errors);
   
  }
}

  return (
    <div className="add-product-form">
      <br></br>
      
      <form  className='addProduct'>
      <h2>Add Product</h2>
        {success ? <div classname="productadded">Product Successfully created.</div> :
          errorMessage ? <div style={{ color: "red" }}>{errorMessage}</div> : ""}


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
          <div className="registration-error">{titleError}</div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="registration-error">{descriptionError}</div>
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
          <div className="registration-error">{priceError}</div>
          <label htmlFor="discountedPrice">Discounted Price</label>
          <input
            type="text"
            id="discountedPrice"
            name="discountedPrice"
            value={discountedPrice}
            onChange={(e) => setDiscountedPrice(e.target.value)}
            required
          />
          <div className="registration-error">{discountedPriceError}</div>
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
          <div className="registration-error">{discountPresentError}</div>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <div className="registration-error">{quantityError}</div>
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
        <div className="registration-error">{authorError}</div>
        <div className='flex'>

          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={category} onChange={(e) => handleCategoryOnChange(e.target.value)} required>
            <option value="">Select Category</option>
            {categoryOptions.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="registration-error">{categoryError}</div>
          <label htmlFor="course">Course</label>
          <select id="course" name="course" value={course} onChange={(e) => getsubject(e.target.value)} required>
            <option value="">Select Course</option>
            {courseOptions.map(course => (
              <option key={course.id} value={course.courseName}>
                {course.courseName}
              </option>
              
            ))
            }
          </select>
          <div className="registration-error">{courseError}</div>


          {/* Add similar dropdowns for subject, university, category, subcategory, semester */}

        </div>
        <div className='flex'>
          <label htmlFor="subjcet">Subjcet</label>
          <select id="subjcet" name="subjcet" value={subject} onChange={(e) => setSubject(e.target.value)} required>
            <option value="">Select Subjcet</option>
            {subjectOptions.map(subject => (
              <option key={subject.id} value={subject.subjectName}>
                {subject.subjectName}
              </option>
            ))}

          </select>
          <div className="registration-error">{subjcetError}</div>
          <label htmlFor="university">University</label>
          <select id="university" name="university" value={university} onChange={(e) => setUniversity(e.target.value)} required>
            <option value="">Select University</option>
            {universityOptions.map(university => (
              <option key={university.id} value={university.universityName}>
                {university.universityName}
              </option>
            ))}
          </select>
          <div className="registration-error">{universityError}</div>


          {/* Add similar dropdowns for subject, university, category, subcategory, semester */}

        </div>
        <div className='flex'>


          <label htmlFor="semester">Semester</label>
          <select id="semester" name="semester" value={semester} onChange={(e) => setSemester(e.target.value)} required>
            <option value="">Select Semester</option>
            {semesterOptions.map(semester => (
              <option key={semester.id} value={semester.name}>
                {semester.name}
              </option>
            ))}
          </select>
          <div className="registration-error">{semesterError}</div>
          



        </div>



        <label htmlFor="productImages">Product Images:</label>
        <div className="registration-error">{imageError}</div>
        <input
          type="file"
          id="productImages1"
          name="productImages"
          accept="image/*"
          onChange={(e) => handleImageChange(e, 0)}
        />
        <input
          type="file"
          id="productImages2"
          name="productImages"
          accept="image/*"
          onChange={(e) => handleImageChange(e, 1)}
        />
        <input
          type="file"
          id="productImages3"
          name="productImages"
          accept="image/*"
          onChange={(e) => handleImageChange(e, 2)}
        />
        <input
          type="file"
          id="productImages4"
          name="productImages"
          accept="image/*"
          onChange={(e) => handleImageChange(e, 3)}
        />

        <input
          type="file"
          id="productImages5"
          name="productImages"
          accept="image/*"
          onChange={(e) => handleImageChange(e, 4)}
        />

        {images.map((image, index) => (
          <div key={index} className="selected-images">
            {image && <img src={image} alt={`Selected ${index}`} style={{ maxWidth: '50px' }} />}
          </div>
        ))}






        <button onClick={handleValidation}>Add</button>
        <button onClick={handlCCancel}>Back</button>
      </form >
    </div >
  );
};


export default AddProduct;

