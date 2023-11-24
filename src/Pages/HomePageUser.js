import React from 'react'
import NavBar from '../Components/NavBar/Navbar'
import HomeCurosel from '../Components/HoemCurosel/HomeCurosel'
import MiddleCards from '../Components/MiddleCards/MiddleCards'
import BookCards from '../Components/MainBooks/BookCards'
import Footer from '../Components/Footer/Footer'

function HomePageUser() {
  return (
    <div>
       
        <NavBar/>
       <HomeCurosel/>
      <MiddleCards/> 
      <BookCards/>
     
      {/* <BookCards/>
      <BookCards/>
      <BookCards/>
      <Footer/> */}
    </div>
  )
}

export default HomePageUser
