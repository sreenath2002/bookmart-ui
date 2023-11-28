import React, { useState } from 'react';
import { useEffect } from 'react';
import './ProductTable.css'; // Import your CSS file for styling
import AddProduct from '../AddProduct/AddProduct';
import UpdateProduct from '../UpdateProduct/UpdateProduct';
import { getProducts, deleteProduct } from '../../axios/service/adminServices';
const ProductTable = () => {
  const [books, setBooks] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductTitle, setSelectedProductTitle] = useState(null);
  const [selectedProductDescription, setSelectedProductDescription] = useState(null);
  const [selectedProductPrice, setSelectedProductPrice] = useState(null);
  const [selectedProductDiscountedPrice, setSelectedProductDisCountedPrice] = useState(null);
  const [selectedProductDiscountPresent, setSelectedProductDiscountPresent] = useState(null);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(null);
  const [selectedProductCourse, setSelectedProductCourse] = useState(null);
  const [selectedProductSubjcet, setSelectedProductSubjcet] = useState(null);
  const [selectedProductUniversity, setSelectedProductUniversity] = useState(null);
  const [selectedProductAuthor, setSelectedProductAuthor] = useState(null);
  const [selectedProductParentCategory, setSelectedProductParentCategory] = useState(null);
  
  const [selectedProductSemester, setSelectedProductSemester] = useState(null);
  const [deleteSuccesMessage,setDeleteSuccesMessage]=useState(false);
  const[updateSuccesMessage,setupdateSuccesMessage]=useState(false);
  const[addSuccesMessage,setaddSuccesMessage]=useState(false);
  const[wrongMessage,setWrongMessage]=useState(false);
  const [searchQuery, setSearchQuery] = useState("");
   console[refresh,setRefresh]=useState(false)
   
  const jwtToken = localStorage.getItem("jwt");
  useEffect(() => {
    
    featchData(jwtToken)
    console.log("fdsj")
    async function featchData(token){
      console.log("-------fist start-------")
      const products= await getProducts(token);
      console.log("--------------------------------------------------")
      console.log("-----------hai--------");
      console.log("ejfsld")
      
      if(products.statuscode ==='200 OK')
      {
        console.log("jfsd")
        console.log(products.result)
        setBooks(products.result)
        console.log("----books------");
      }
    }
    
  },[refresh]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUpdate = (id,bookTitle,bookDescription,bookPrice,bookDiscountedPrice,bookDiscountPresent,bookQuantity,bookCourse,bookSubjcet,bookUniversity,bookAuthor,bookParentCategory,bookSemester,books) => {
    // Logic to handle updating a product with 'id'
    console.log(`Update product with ID: ${id}`);
    setSelectedProductId(id);
     setSelectedProductTitle(bookTitle);
     setSelectedProductDescription(bookDescription);
     setSelectedProductPrice(bookPrice);
     setSelectedProductDisCountedPrice(bookDiscountedPrice);
     setSelectedProductDiscountPresent(bookDiscountPresent);
     setSelectedProductQuantity(bookQuantity);
     setSelectedProductCourse(bookCourse);
     setSelectedProductSubjcet(bookSubjcet);
     setSelectedProductUniversity(bookUniversity);
     setSelectedProductAuthor(bookAuthor);
     setSelectedProductParentCategory(bookParentCategory);
   
     setSelectedProductSemester(bookSemester);
    setShowUpdateProduct(true);
    // Implement update functionality
  };


    
     async function deleteBook(id){
        try{
          console.log(id)
           const deleteResponse=await  deleteProduct(jwtToken,id)
           console.log(deleteResponse.statuscode);
           console.log("-------DELETED------")
           if(deleteResponse.statuscode==='200 OK')
           {
               setDeleteSuccesMessage(true);
               setTimeout(()=>{
                setDeleteSuccesMessage(false)
               },3000)
               setBooks(books.filter((book) => book.id !== id));
           }
           else{
            setWrongMessage(true);
            setTimeout(()=>{
             setWrongMessage(false)
            },3000)

           }

        }
        catch(err){
          setWrongMessage(true);
          setTimeout(()=>{
           setWrongMessage(false)
          },3000)

        }
     }
    // Implement delete functionality
  
  const handleAddProduct = () => {
    setShowAddProduct(true);
  };

  const handleBack = () => {
    setShowAddProduct(false);
    setShowUpdateProduct(false);
    setRefresh(!refresh)
  };

  const handleProductUpdated = () => {
    
    setShowUpdateProduct(false);
    setupdateSuccesMessage(true);
    setTimeout(()=>{
      setupdateSuccesMessage(false)
    },2000)

  };
  const handleProductAdded = () => {
    
   setShowAddProduct(false)
    setaddSuccesMessage(true);
    setTimeout(()=>{
      setaddSuccesMessage(false)
    },2000)

  };
 

  return (
    <div className="product-table-container">
       
      {deleteSuccesMessage && <div className='deleteSucces'>Deleted SUccesFully</div>}
      {updateSuccesMessage && <div className='deleteSucces'>Updated SUccesFully</div>}
      {addSuccesMessage && <div className='deleteSucces'>Updated SUccesFully</div>}
      {wrongMessage && <div className='wrongMessage'>NOT FOUND</div>}
      { showAddProduct ? (
        <AddProduct  handleProductAdded={handleProductAdded} handleBack={handleBack} />
      ) : showUpdateProduct ? (
        <UpdateProduct productId={selectedProductId} handleProductUpdated={handleProductUpdated} bookTitle={selectedProductTitle} bookDescription={selectedProductDescription} bookPrice={selectedProductPrice} bookDiscountedPrice={selectedProductDiscountedPrice} bookDiscountPresent={selectedProductDiscountPresent} bookQuantity={selectedProductQuantity} bookCourse={selectedProductCourse} bookParentCategory={selectedProductParentCategory} bookSubjcet={selectedProductSubjcet} bookUniversity={selectedProductUniversity}
        bookAuthor={selectedProductAuthor} bookSemester={selectedProductSemester} handleBack={handleBack} />
      ) : (
        <div>
        <div className="search-bar">
            <input type="text" placeholder="Search by Book Name" value={searchQuery} onChange={handleSearchInputChange} />
          </div>
      <table className="product-table">
        <thead>
          <tr>
          <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Price</th>
            <th>Discounted Price</th>
            <th>Discount Present</th>
            <th>Quantity</th>
            <th>Type</th>
            <th>Author</th>
            <th>Product Category</th>
        
            <th>Course </th>
          
            <th>Subject </th>
            <th>University</th>
            <th>Semester Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase())).map((book) => (
            <tr key={book.name}>
                <td>{book.id}</td>
              <td>{book.title}</td>
                <td>{book.description}</td>
                <td>{book.price}</td>
                <td>{book.discountedPrice}</td>
                <td>{book.discountPresent}</td>
                <td>{book.quantity}</td>
                <td>{book.type}</td>
                <td>{book.author}</td>
               <td>{book.parentCategory.name}</td>
               {/* <td>{book.subCategory.name}</td> */}
              <td>{book.course.courseName}</td>
             
              <td>{book.subject.subjectName}</td>
              <td>{book.university.universityName}</td>
              <td>{book.semester.name}</td> 
              <td>
                <button onClick={() => handleUpdate (book.id,book.title,book.description,book.price,book.discountedPrice,book.discountPresent,book.quantity,book.author,book.parentCategory.name,book.course.courseName,book.subject.subjectName,book.university.universityName,book.semester.name,books)}>Update</button>
                <button onClick={() => deleteBook(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table></div>)}
      {books.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
      
          <div className="no-user-message">No Product Exists</div>
        )}
      {!showAddProduct && !showUpdateProduct && (
        <button className="add-product-btn" onClick={handleAddProduct}>
          Add Product
        </button>
      )}
    </div>
  );
};

export default ProductTable;
