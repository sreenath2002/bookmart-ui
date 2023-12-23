import React, { useState, useEffect } from 'react';
import './CardComponent.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';
import { getCourses } from '../../axios/service/adminServices';

const CardComponent = () => {
  const [categoryShow, setCategoryShow] = useState(false);
  const[listShow,setListShow]=useState(true);
  const [courseShow, setCourseShow] = useState(false);
  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const navigate = useNavigate();

  const jwtToken = localStorage.getItem("jwt");

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
          <div className="small-card" onClick={() => navigate('/UserDetails')}>
            <img src="Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg" alt="Small Image 1" className="card-image" />
            <p>Users</p>
          </div>
          <div className="small-card" onClick={handleShowProductTable}>
            <img src="Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg" alt="Small Image 2" className="card-image" />
            <p>Products</p>
          </div>
        </div>
        <div className="row">
          <div className="small-card" onClick={() => navigate('/ordersdetails')}>
            <img src="Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg" alt="Small Image 1" className="card-image" />
            <p>Orders</p>
          </div>
          <div className="small-card" onClick={handleShowProductTable}>
            <img src="Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg" alt="Small Image 2" className="card-image" />
            <p>Products</p>
          </div>
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
