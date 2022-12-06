import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import  Link from 'next/link';
import { useRouter } from 'next/router'

import authService from '../api/authService'

import { useAuth } from '../contexts/AuthContext'; //React Context

export default function NavBar() {

    const router = useRouter()
    const {user, logout, isLoggedIn} = useAuth()


    

    const logOut = () =>{
      authService.logout()
      logout()
      router.push('/')
    }


  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {isLoggedIn ? (
              <Nav.Link href="/login" onClick={logOut}>Logout</Nav.Link>
          ):(
          <>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </>
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
