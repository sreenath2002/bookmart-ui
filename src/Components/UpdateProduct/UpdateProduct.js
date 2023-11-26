import React, { useState } from 'react';
import { useEffect } from 'react';
import './UpdateProduct.css'; // Import your CSS file for styling
import imageCompression from 'browser-image-compression';
import { getCourses, getSubjects, getUniversities, getcategory, getsemester, getsubcategory } from '../../axios/service/adminServices';
import { updateProduct } from '../../axios/service/adminServices';
import { useSelector } from 'react-redux/es/hooks/useSelector';
const UpdateProduct = (props) => {
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
  const [errorMessage, seterrorMessage] = useState('')
  const [success, setsuccess] = useState(false)
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
  const updateProductId=props.productId;
  const id = useSelector((state) => state.user.id);

  useEffect(() => {
    featchData(jwtToken)
    async function featchData(token) {
      console.log(id);
      const course = await getCourses(token);
      const University = await getUniversities(token);
      const subcategory = await getsubcategory(token);
      const category = await getcategory(token);
      console.log(course)

      if (course?.statuscode && University?.statuscode && subcategory.statuscode && category.statuscode === '200 OK') {
        setCourseOptions(course.result);
        setUniversityOptions(University.result)
        setCategoryOptions(category.result);
        console.log(setCategoryOptions)
        setSubcategoryOptions(subcategory.result);
      }
    }


  }, []);

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
  const handlCCancel=()=>{
    props.handleBack();
  }

  // const handleAddProduct = (e) => {
  //   e.preventDefault();
  //   // Logic to add product with the form data (bookName, subjectName, courseName, etc.)
  //   const productData = {
  //     bookName,
  //     subjectName,
  //     courseName,
  //     universityName,
  //     authorName,
  //     semesterName,
  //     images // Handle images as needed
  //   };
  //   console.log('New Product Data:', productData);
  //   // Implement add product functionality
  // };

  async function updateproduct(event) {
    event.preventDefault();
    // if (validateForm()) {
    try {

      const updatedproductDetails = {

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
        subcategory: subcategory,
        semester: semester,
        imageUrls: images,
      }
      console.log("productDetails===", updatedproductDetails)
      const updateDetails = await updateProduct(jwtToken, updateProductId,updatedproductDetails)
      console.log("lsdhgck")
      console.log("addDetails", updateDetails)

      if (updateDetails.statuScode === '200 OK') {
        setsuccess(true)
        setTimeout(()=>{
          setsuccess(false)
        },3000)
      } else {
        seterrorMessage(updateDetails.message)
      }

    }

    catch (err) {
      console.log("error", err)
      seterrorMessage('Internal Server Error.')
    }
    // }
  }

  return (
    <div className="add-product-form">
      <h2>Update Product</h2>
      <form >
        {success ? <div style={{ color: "blue" }}>Product Successfully Updated.</div> :
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
          <div className="registration-error">{authorError}</div>

        </div>
        <div className='flex'>
          <label htmlFor="course">Course</label>
          <select id="course" name="course" value={course} onChange={(e) => getsubject(e.target.value)} required>
            <option value="">Select Course</option>
            {courseOptions.map(course => (
              <option key={course.id} value={course.courseName}>
                {course.courseName}
              </option>
            ))}
          </select>
          <div className="registration-error">{courseError}</div>
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

          {/* Add similar dropdowns for subject, university, category, subcategory, semester */}

        </div>
        <div className='flex'>
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
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={category} onChange={(e) => getsemeste(e.target.value)} required>
            <option value="">Select Category</option>
            {categoryOptions.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="registration-error">{categoryError}</div>

          {/* Add similar dropdowns for subject, university, category, subcategory, semester */}

        </div>
        <div className='flex'>

          <label htmlFor="subcategory">Subcategory</label>
          <select id="subcategory" name="subcategory" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} required>
            <option value="">Select Subcategory</option>
            {subcategoryOptions.map(subcategory => (
              <option key={subcategory.id} value={subcategory.name}>
                {subcategory.name}
              </option>
            ))}
          </select>
          <div className="registration-error">{subcategoryError}</div>
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






        <button onClick={updateproduct}>Update</button>
        <button onClick={handlCCancel}>Cancel</button>
      </form >
    </div >
  );
};

export default UpdateProduct;
