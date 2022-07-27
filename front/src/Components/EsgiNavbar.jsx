import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Navbar, Nav } from 'react-bootstrap'

export default function EsgiNavbar(props) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">ESGI</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href="#pricing">Posts</Nav.Link>
          </Nav>
          {props.isLogged ? (
          <Nav>
            <Nav.Link href="/profile" className="justify-content-end">{props.name}</Nav.Link>
            <Nav.Link href="/logout" className="justify-content-end">Logout</Nav.Link>
          </Nav>
          ) : (
            <Nav>
              <Nav.Link href="/login" className="justify-content-end">Login</Nav.Link>
              <Nav.Link href="/register" className="justify-content-end">Register</Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  )
}
