import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../Components/NavBar/Navbar';
import ProductTable from '../Components/ProductTable/ProductTable';

function ProductTableDetails() {
  const { selectedCourse } = useParams(); // Retrieve selectedCourse from route parameters

  return (
    <div>
      {/* <NavBar/> */}
      <ProductTable courseName={selectedCourse} /> {/* Pass selectedCourse as a prop */}
    </div>
  );
}

export default ProductTableDetails;
