import { Nav, Container, Ro, Navbar } from "react-bootstrap"

function Explore() {
  return(
  <div>
    <Navbar bg="white" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Nav
            className="me-auto my-2 my-lg-0 nav-fill w-100"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          <Nav.Link>Web Development</Nav.Link>
          <Nav.Link>Mobile Development</Nav.Link>
          <Nav.Link>Game Development</Nav.Link>
          <Nav.Link>Graphic Design</Nav.Link>
          <Nav.Link>Data Analytics</Nav.Link>
          <Nav.Link>Digital Marketing</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div>Explore</div>
</div>
  )
}

export default Explore