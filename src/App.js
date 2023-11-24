import React from 'react';
import { Route,Router,Routes,BrowserRouter } from 'react-router-dom';
import './App.css';
// import Mainpage from './Pages/Mainpage';
// import OpeningPage from './Componente/OpnenigPage/OpeningPage';
// // 

// import HomePage from './Pages/HomePage';
// import ProductSection from './Pages/ProductSection';
// import ProductDetail from './Pages/ProductDetail';
import HomePageUser from './Pages/HomePageUser';
import ProductDetails from './Pages/ProductDetails';
import ProductsPage from './Pages/ProductsPage';
import AdminLogin from './Pages/AdminLogin';
import AdminDashBoard from './Pages/AdminDashBoard';
import UserDetails from './Pages/UserDetails';
import ProductTableDetails from './Pages/ProductTableDetails';
import UserLogin from './Components/UserLogin/UserLogin';
import UserRegister from './Components/UserRegister/UserRegister';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
function App() {
  return (
    <div className="App">
    <BrowserRouter> 
        <Routes>
          {/* <Route path='/' element={<OpeningPage/>} /> */}
          <Route path='/Home' element={<HomePageUser/>}/>
          <Route path='/ProductDetails' element={<ProductDetails/>}/>
          <Route path='/Products' element={<ProductsPage/>}/>
          <Route path='/AdminLogin' element={<AdminLogin/>}/>
          <Route path='/AdminPage' element={<AdminDashBoard/>}/>
          <Route path='/UserDetails' element={<UserDetails/>}/>
          <Route path='/ProductTable' element={<ProductTableDetails/>}/>
          <Route path='/UserLogin' element={<UserLogin/>}/>
          <Route path='/UserRegister' element={<UserRegister/>}/>
          <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
           {/* <Route path='/Product' element={<ProductSection />}/> 
          <Route path='/ProductDetails' element={<ProductDetail/>}/> */}
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
