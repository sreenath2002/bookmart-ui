import React from 'react';
import { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';
import axios from 'axios'; // Import your CSS file for styling
 // Replace 'logo.png' with your logo file
import { useSelector } from 'react-redux/es/hooks/useSelector';
const AdminNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const firstName=useSelector((state)=>state.user.firstName)
  const lastName=useSelector((state)=>state.user.lastName)
  const jwtToken = localStorage.getItem("jwt");
   const navigate=useNavigate();
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
            navigate('/AdminLogin');
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
<Navbar className='navbarMain' bg="light" expand="xl" expanded={expanded} style={{ width: '100%' , position: 'fixed', top: '0', left: '0', right: '0', zIndex: '1000'  }}>
      <Container fluid>
        <Navbar.Brand href="#home">Book Mart</Navbar.Brand>
        <Navbar.Toggle onClick={handleToggle} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Add user-related components/icons to the left side */}
            <Nav.Item className="d-flex align-items-center">
              <Image src="profile.jpg" roundedCircle width={30} height={30} />
             {jwtToken? <span className="user-name">{firstName}{lastName}</span>:<span className="user-name">Welcome User</span>}
            </Nav.Item>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="/AdminPage">Home</Nav.Link>
            {/* Add more Nav.Link components as needed */}
            <NavDropdown title="More" id="basic-nav-dropdown">
              {/* Add dropdown items if repquired */}
            </NavDropdown>
            {/* Logout button */}
            <Button className='btn btn-danger m-0' onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
