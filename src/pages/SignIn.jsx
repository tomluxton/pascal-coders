import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg"
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { async } from '@firebase/util'
import {toast} from 'react-toastify'

function SignIn() {

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const {email, password} = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]:e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await signInWithEmailAndPassword(auth,email, password)

      if(userCredential.user) {
        navigate('/')
      }
      
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        toast.error('Wrong Password')
      } else if (error.code === 'auth/user-not-found') {
        toast.error('No User with that Email. Please Signup')
      } else if (error.code === 'auth/internal-error') {
        toast.error('Something went wrong, please ensure all forms are filled out')
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid Email')
      } else {
      toast.error(error.code)
      }

    }

  }



  return (
    <>
      <div>
        <header>
          <p>Welcome Back!</p>
        </header>

        <form onSubmit={onSubmit}>
          <input type="email" className="emailInput" placeholder='Email' id="email" value = {email} onChange = {onChange}/>

          <div>
            <input 
              type = {showPassword ? "text" : "password"}
              className = "passwordInput"
              placeholder='Password'
              id='password'
              value ={password}
              onChange = {onChange}  
            />
            <img src={visibilityIcon} alt="show password" className="showPassword" onClick={() => setShowPassword((prevState) => !prevState)}/>
          </div>

          <Link to = "/forgot-password" className='forgotPasswordLink'>Forgot Password</Link>
          
          <div>
            <p>Sign In</p>
            <button className='signInButton'>
              <ArrowRightIcon fill = "#ffffff" width = '34px' height = '34px' />
            </button>
          </div>
        </form>

        {/*Put google OAuth here*/}
        

        <Link to="/sign-up" className='registerLink' >
          Sign Up Instead
        </Link>
      </div>
    </>
  )
}

export default SignIn