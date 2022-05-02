import { Button, Col, Container, Row } from "react-bootstrap"


function MyAccount() {


  return (
    <div className="myAccount">
      <Container fluid>
        <Row>
          <Col sm={4}><h1>My Account</h1></Col>
          <Col>
            <Button variant="primary">Log out</Button>{' '}
          </Col>
        </Row>
        <Row>
          <Col><p>Personal Details</p></Col>
          <Col><Button varient= "primary">Change</Button>{' '}</Col>
        </Row>
        <Row>
          <Col>
            <form>

            </form>
          </Col>
        </Row>
        </Container>
    </div>
  )
}

export default MyAccount