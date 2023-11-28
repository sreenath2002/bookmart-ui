import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Image, Button } from 'react-bootstrap';
import './NavBar.css'; // Import a CSS file for custom styles
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useSelector } from 'react-redux/es/hooks/useSelector';
const NavBar = () => {
  const [expanded, setExpanded] = useState(false);
 
  const firstName=useSelector((state)=>state.user.firstName)
  const lastName=useSelector((state)=>state.user.lastName)
  const jwtToken = localStorage.getItem("jwt");
  const navigate=useNavigate()
  const handleToggle = () => {
    setExpanded(!expanded);
  };
  const handleLogout = async () => {
   
    
    try {

      if(jwtToken)
      {
        
       await  axios.post("http://localhost:8084/api/auth/logout",{},{
          
       headers: {
        Authorization: `Bearer ${jwtToken}` // Include the token in the headers
      }
         
        }).then((res)=>{
          
          console.log("rfghjk")
         
          if(res.data.statuscode=='200 OK'){
            localStorage.removeItem('jwt');
            navigate('/');
          }
      
        }).catch((error)=>{

          console.error(error)
        })
      }
     
      
    } catch (error) {
     
      console.error(error);
    }
  }

  return (
    <Navbar bg="light" expand="xl" width="20%" expanded={expanded}>
      <Container>
        <Navbar.Brand href="#home">E-Commerce App</Navbar.Brand>
        <Navbar.Toggle onClick={handleToggle} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Add user-related components/icons to the left side */}
            <Nav.Item className="d-flex align-items-center">
              <Image src="profile.jpg" roundedCircle width={30} height={30} className="me-2" />
             {jwtToken? <span className="user-name">{firstName}{lastName}</span>:<span className="user-name">Welcome User</span>}
            </Nav.Item>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#products">Products</Nav.Link>
            <Link to="/UserLogin" className="nav-link">SignIn</Link>
            <Nav.Link href="#cart">Cart</Nav.Link>
            {/* Add more Nav.Link components as needed */}
            <NavDropdown title="More" id="basic-nav-dropdown">
              {/* Add dropdown items if required */}
            </NavDropdown>
            {/* Logout button */}
            <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;




// import React, { useState } from 'react';
// import { Navbar, Container, Nav, NavDropdown, Image, Button } from 'react-bootstrap';
// import './NavBar.css'; // Import a CSS file for custom styles

// import { Link } from 'react-router-dom';

// const NavBar = () => {
//   const [expanded, setExpanded] = useState(false);

//   const handleToggle = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <Navbar bg="light" expand="xl" expanded={expanded} className="custom-navbar">
//       <Container fluid className='nav-container'>
//         {/* Use fluid prop to make the Container full-width */}
//         <Navbar.Brand className='logo' href="#home">E-Commerce App</Navbar.Brand>
//         <Navbar.Toggle onClick={handleToggle} aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             {/* Add user-related components/icons to the left side */}
//             <Nav.Item className="d-flex align-items-center">
//               <Image src="profile.jpg" roundedCircle width={30} height={30} className="me-2" />
//               <span className="user-name">John Doe</span>
//             </Nav.Item>
//           </Nav>
//           <Nav className="ms-auto">
//             <Nav.Link href="#home">Home</Nav.Link>
//             <Nav.Link href="#products">Products</Nav.Link>
            
//             <Nav.Link href="#cart">Cart</Nav.Link>
//             <Link to="/UserLogin" className="nav-link">SignIn</Link>
//             {/* Add more Nav.Link components as needed */}
//             <NavDropdown title="More" id="basic-nav-dropdown">
//               {/* Add dropdown items if required */}
//             </NavDropdown>
//             {/* Logout button */}
//             <Button variant="outline-danger">Logout</Button>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavBar;
