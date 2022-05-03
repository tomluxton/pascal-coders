import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from "react-bootstrap";
import {useAuthStatus} from "../hooks/useAuthStatus"

function PCNavbar () {

  const {loggedIn, checkingStatus} = useAuthStatus()

  if (checkingStatus) {
    return <h2>Loading</h2>
  }

  if(loggedIn){
    return(
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">Pascal Coders</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/my-learning">My Learning</Nav.Link>
              <Nav.Link href="/my-account">My Account</Nav.Link>
              <Nav.Link href="/teaching-portal">Teaching Portal</Nav.Link>
              <Nav.Link href="/shopping-cart">Shopping Cart</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      )
  } else {
    return(
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">Pascal Coders</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Button href = '/sign-in'>Login</Button>
              <Button href = '/sign-up'>Sign Up</Button>
              <Nav.Link href="/shopping-cart">Shopping Cart</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      )
  }

  
}
export default PCNavbar;