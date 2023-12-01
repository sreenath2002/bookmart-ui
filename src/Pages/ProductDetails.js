import React, { useEffect } from 'react'
import ProductOverview from '../Components/ProductOverview/ProductOverview'
import NavBar from '../Components/NavBar/Navbar'
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const jwtToken = localStorage.getItem('jwt');
  
  const { id } = useParams();
  useEffect(()=>{
    console.log("here")
  },[])
  // if (!jwtToken) {
    
  //   return <div>Please log in to access the admin dashboard.</div>;
  // }
  return (
    <div>
      
        <NavBar/>
        <br></br>
        <br></br>
        <br></br>
        
      <ProductOverview id={id}/>
    </div>
  )
}

export default ProductDetails
