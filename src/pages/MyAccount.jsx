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
          
        </Row>
        </Container>
    </div>
  )
}

export default MyAccount