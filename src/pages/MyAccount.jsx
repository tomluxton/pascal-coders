import { Button, Col, Container, Row } from "react-bootstrap"
import {getAuth} from 'firebase/auth'
import {useState, useEffect} from 'react'

function MyAccount() {
  const [user, setUser] = useState(null)

  const auth = getAuth()
  useEffect(()=>{

    setUser(auth.currentUser)
  }, [])

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
          <Col>{user ? <p>Hi there {user.displayName}</p> : 'not logged in'}</Col>
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