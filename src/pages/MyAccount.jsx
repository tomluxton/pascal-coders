import { Button, Col, Container, Row , Card} from "react-bootstrap"
import {getAuth, updateProfile, sendEmailVerification} from 'firebase/auth'
import {useState, useEffect} from 'react'
import { useNavigate, Link } from "react-router-dom"
import {limitToLast, updateDoc, doc } from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'

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

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name)
      await updateProfile(auth.currentUser, {displayName: name})

      const userRef = doc(db, 'users', auth.currentUser.uid)
      await updateDoc(userRef, { name })

    } catch (error) {
      toast.error(error.code)
    }
  }
  
  const onVerifyEmail = () => {
    sendEmailVerification(auth.currentUser)
    toast.success("Email sent please check your email")
  }

  const onChangeDetails = () => {
    changeDetails && onSubmit()
    setChangeDetails((prevState)=> !prevState)
  }

  const onChange = (e) => {
    setFormData ((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
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
          <p>{auth.currentUser.emailVerified ? 'Email verified' : 'Email Not Verified'}</p>
          <Col>
            <Button variant="primary" onClick={onVerifyEmail} className ={auth.currentUser.emailVerified ?"invisible": "visable"}>Verify Email</Button>
          </Col>
        </Row>
        <Row> 

          <Col>{name ? <h3>Hi there {name}</h3> : 'not logged in'}</Col>

        </Row>
        <Row>
          <Col sm={4}><p>Personal Details</p></Col>
          <Col><Button variant="primary" onClick={onChangeDetails}>{changeDetails ? 'Done': 'Change'}</Button></Col>
        </Row>
        <Row>
          <Col>
            <Card style={{ width: '18rem' }}>
              <form>
                <input 
                  type='text'
                  id='name'
                  className={!changeDetails ? 'profileName' : 'profileNameActive'}
                  disabled={!changeDetails}
                  value = {name}
                  onChange = {onChange}
                />
                
              </form>
            </Card>
          </Col>
        </Row>
        </Container>
    </div>
  )
}

export default MyAccount