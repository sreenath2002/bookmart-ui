import React from 'react'
import NavBar from '../Components/NavBar/Navbar'
import HomeCurosel from '../Components/HoemCurosel/HomeCurosel'
import MiddleCards from '../Components/MiddleCards/MiddleCards'
import BookCards from '../Components/MainBooks/BookCards'
import Footer from '../Components/Footer/Footer'

function HomePageUser() {
  return (
    <div>
      
       
       <HomeCurosel/>
      
      <MiddleCards/> 
      <BookCards/>
      
      {/* <BookCards/>
      <BookCards/>
      <BookCards/>*/}
    
    </div>
  )
}

export default HomePageUser
