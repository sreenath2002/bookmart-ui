import React, { useState, useEffect } from 'react';
import './CardComponent.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';
import { getCourses,getUsersCount,getProductCount,getOrderCount } from '../../axios/service/adminServices';

const CardComponent = () => {
  const [categoryShow, setCategoryShow] = useState(false);
  const[listShow,setListShow]=useState(true);
  const [courseShow, setCourseShow] = useState(false);
  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const[totalusers,setTotalUsers]=useState();
  const[totalPRoduct,setTotalProduct]=useState();
  const[totalorders,setTotalOrders]=useState();
  const navigate = useNavigate();
  const[refresh,setRefresh]=useState(false);

  const jwtToken = localStorage.getItem("jwt");
  useEffect(() => {
    fetchData(jwtToken);

    async function fetchData(token) {
      try {
        const countofUser = await getUsersCount(token); // Ensure 'id' is defined or passed correctly
        const  countofProduct= await getProductCount(token)
        const countofOrders=await getOrderCount(token);
         setTotalUsers(countofUser.result);
         setTotalProduct(countofProduct.result)
         setTotalOrders(countofOrders.result)
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  }, [!refresh]);

  function handleCategoryShow() {
    setListShow(false)
    setCategoryShow(true);
  }

  async function getCourse(category) {
    const sub = await getCourses(jwtToken, category);
    if (sub.statuscode === '200 OK') {
      setCourseOptions(sub.result);
    }
  }

  function handleUGCourseShow() {
    setCategoryShow(false);
    setCourseShow(!courseShow);
    getCourse('UG');
  }

  function handlePGCourseShow() {
    setCategoryShow(false);
    setCourseShow(!courseShow);
    getCourse('PG');
  }
   function handleShowProductTable(){
    navigate(`/ProductTable/all`)

   }

 

  return (
    <div className="card-container">
      {listShow && (
        <div>
        <div className="row">
          <div className="small-card1" onClick={() => navigate('/UserDetails')}>
        
          
          <div className='admindiv'>
             {totalusers ? <h3>{totalusers}</h3> :<h3>0</h3>}
            <p>Users</p>
           </div>
           
            <img src="Images/users.jpg" alt="Small Image 1" className="card-image" />
            
           
          </div>
          <div className="small-card2" onClick={handleShowProductTable}>
            
          <div className='admindiv'>
             {totalPRoduct ? <h3>{totalPRoduct}</h3> :<h3>0</h3>}
            <p>Products</p>
           </div>
            <img src="Images/booksset.jpg" alt="Small Image 2" className="card-image" />
           
          </div>
        
          <div className="small-card3" onClick={() => navigate('/ordersdetails')}>
          <div className='admindiv'>
              {totalorders ? <h3>{totalorders}</h3> : <h3>0</h3>}
            <p>Orders</p>
           </div>

            <img src="Images/order2.jpg" alt="Small Image 1" className="card-image" />
            
          </div>
          {/* <div className="small-card4" onClick={handleShowProductTable}>
            
          <div className='admindiv'>
              <h3>60</h3>
            <p>Users</p>
           </div>
            <img src="Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg" alt="Small Image 2" className="card-image" />
           
          </div> */}
        </div>
        </div>
        
      )}
      {categoryShow && (
        <div className="row">
          <div className="small-card" onClick={handleUGCourseShow}>
            <img src="Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg" alt="Small Image 1" className="card-image" />
            <p>UG</p>
          </div>
          <div className="small-card" onClick={handlePGCourseShow}>
            <img src="Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg" alt="Small Image 2" className="card-image" />
            <p>PG</p>
          </div>
        </div>
      )}
      {courseShow && (
        <div>
          <label htmlFor="course">Select Course</label>
          <select id="course" name="course" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} required>
            <option value="">Select Course</option>
            {courseOptions.map(course => (
              <option key={course.id} value={course.courseName}>
                {course.courseName}
              </option>
            ))}
          </select>
        
          <button className='showtable' onClick={()=>handleShowProductTable()}>SHOW TABLE</button>
        </div>
      )}
    </div>
  );
};

export default CardComponent;
