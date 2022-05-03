import { Button, Col, Container, Row } from "react-bootstrap"
import {getAuth, updateProfile} from 'firebase/auth'
import {useState, useEffect} from 'react'
import { useNavigate, Link } from "react-router-dom"
import {updateDoc} from 'firebase/firestore'
import {db} from '../firebase.config'

function MyAccount() {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const {name, email} = formData;

  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = () => {
    console.log(123)
  }

  return (
    <div className="myAccount">
      <Container fluid>
        <Row>
          <Col sm={4}><h1>My Account</h1></Col>
          <Col>
            <Button variant="primary" onClick={onLogout}>Log out</Button>
          </Col>
        </Row>
        <Row> 
          {/*
          <Col>{name ? <p>Hi there {name}</p> : 'not logged in'}</Col>
  */}
        </Row>
        <Row>
          <Col><p>Personal Details</p></Col>
          <Col><p onClick={() => {
            changeDetails && onSubmit()
            setChangeDetails((prevState)=> !prevState)
          }}>{changeDetails ? 'done': 'change'}</p></Col>
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