import React from 'react'
import Products from '../Components/ProductsPage/Products'
import NavBar from '../Components/NavBar/Navbar'
import { Navbar } from 'react-bootstrap'
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar'

function ProductsPage() {
  return (
    <div>
      <AdminNavbar/>
      <Products/>
    </div>
  )
}

export default ProductsPage
