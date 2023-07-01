import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo192.png';
import {useLocation, useNavigate} from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';

const Header = (props) => {
  const {logout, user} = useContext(UserContext)

  const location  = useLocation();
  const navigate = useNavigate()
  const handleLogOut = () => {
    logout()
    navigate("/")
    toast.error("logout success")

  }
    return (<>

    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img 
              src={logoApp}
              width="30"
              height="30"
              className='d-inline-block align-top'
              alt="React Boostrap logo"

          />
          <span>React-Bootstrap</span>
          
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {(user && user.auth || window.location.pathname === '/' ) && <>
          <Nav className="me-auto">
              <NavLink to="/" className="nav-link">Home</NavLink>             
              <NavLink to="/users" className="nav-link" >Manage Users</NavLink>    
          </Nav>     
          <Nav> 
          {user && user.email &&<span className='nav-link'>Welcome {user.email} </span> }
            <NavDropdown title="Setting">
              {user && user.auth === true 
              ? <NavDropdown.Item onClick={()=> handleLogOut()} >LogOut</NavDropdown.Item>
              :  <NavLink to="/login" className="dropdown-item">LogIn</NavLink> 
              }
            </NavDropdown>
          </Nav>
          </>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  
    </>)

}

export default Header;