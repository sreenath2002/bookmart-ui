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
import MainCategoryTable  from './Components/Category/MainCategoryTable'
import CourseCAtegory from './Components/CourseCategory/CourseCAtegory'
import Cart from './Components/Cart/Cart';
import UserProfile from './Components/UserProfile/UserProfile';
import Orders from './Components/Orders/Orders';
import OrderedProductDetails from './Components/OrderedProductDetails/OrderedProductDetails';
import UserCart from './Pages/UserCart';
import Checkout from './Components/CheckoutPage/Checkout';
import StockmanagementTable from './Components/StockManageMent/StockmangementTable';
import Allproducts from './Pages/Allproduts';
import CheckoutPage from './Pages/CheckoutPage';
import OrderDetailsTable from './Components/OrderDetailsTable/OrderDetailsTable';
function App() {
  return (
    <div className="App">
    <BrowserRouter> 
        <Routes>
          {/* <Route path='/' element={<OpeningPage/>} /> */}
          <Route path='/' element={<HomePageUser/>}/>
          <Route path='/ProductDetails/:id' element={<ProductDetails/>}/>
          <Route path='/Products' element={<Allproducts/>}/>
          <Route path='/AdminLogin' element={<AdminLogin/>}/>
           <Route path='/Category' element={<MainCategoryTable/>}/>
           <Route path='/CourseCategory' element={<CourseCAtegory/>}/>
           <Route path='/profile' element={<UserProfile/>}/>
           <Route path='/orders' element={<Orders/>}/>
           <Route path='/ordersdetails' element={<OrderDetailsTable/>}/>
          <Route path='/AdminPage' element={<AdminDashBoard/>}/>
          <Route path='/UserDetails' element={<UserDetails/>}/>
          <Route path='/cart' element={<UserCart/>}/>
          <Route path='/checkout/all' element={<CheckoutPage/>}/>
          <Route path='/checkout/:cartid' element={<CheckoutPage/>}/>
          <Route path='/ProductTable/all' element={<ProductTableDetails/>}/>
          <Route path='/UserLogin' element={<UserLogin/>}/>
          <Route path='/UserRegister' element={<UserRegister/>}/>
          <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
          <Route path='/stockmanagement' element={<StockmanagementTable/>}/>
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
