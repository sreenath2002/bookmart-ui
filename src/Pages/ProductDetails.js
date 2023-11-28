import React from 'react'
import ProductOverview from '../Components/ProductOverview/ProductOverview'
import NavBar from '../Components/NavBar/Navbar'
import { useParams } from 'react-router-dom';
function ProductDetails() {
  const { id } = useParams();
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
