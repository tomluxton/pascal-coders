import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import { Container, Row, Form } from 'react-bootstrap';
import { limitToLast } from 'firebase/firestore'
import {toast} from 'react-toastify'

function ForgotPassword() {

  const [email, setEmail] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("Email has been sent")
    } catch (error) {
      toast.error(error.code)
      console.log(error)
    }
  }

  const onChange = e => setEmail(e.target.value)
  

  return (
    <Container fluid>
      <Row>
        <h1>Forgot Password</h1>
      </Row>
      <Row>
        <main>
        <form onSubmit = {onSubmit} >
          <input  
          type= "email"
          className = "emailInput"
          placeholder = "email"
          id = "email"
          value = {email}
          onChange = {onChange}
          />

          <Link className='forgotPasswordLink' to = '/sign-in'></Link>


          <div>Send Reset Link</div>
          <button className="signInButton">
            <ArrowRightIcon fill = "#ffffff" width = '34px' height = '34px' />
          </button>
        </form>
        </main>
      </Row>

        


    </Container>
  )
}

export default ForgotPassword