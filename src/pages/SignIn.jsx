import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg"
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { async } from '@firebase/util'
import {toast} from 'react-toastify'
import ReCAPTCHA from "react-google-recaptcha";
import { useCookies, setCookie } from 'react-cookie';


function SignIn() {

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const [cookies, setCookie] = useCookies(['user']);

  const [isVerified, setIsVerified] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const {email, password} = formData

  const today = new Date()
  let tomorrow =  new Date()
  tomorrow.setDate(today.getDate() + 1)

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

      if (checked) {
        setCookie('Email', formData.email, { path: '/', expires: tomorrow});
        setCookie('Password', formData.password, { path: '/', expires: tomorrow});
      }

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

  // const handleCookies = () => {
  //     setCookie('Email', formData.email, { path: '/' });
  //     setCookie('Password', formData.password, { path: '/' });
  //  };



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
            <input
              type="checkbox"
              checked={checked}
              onChange={handleChange}
            />
            <label>Remeber Me</label>
            <ReCAPTCHA
              sitekey="6LdGXMYfAAAAADlWRO7Vo4XVya7iAJPQIKk9V6uU"
              onChange={() => setIsVerified((prevState) => !prevState)}
            />
            <img src={visibilityIcon} alt="show password" className="showPassword" onClick={() => setShowPassword((prevState) => !prevState)}/>
          </div>

          <Link to = "/forgot-password" className='forgotPasswordLink'>Forgot Password</Link>
          
          <div>
            <p>Sign In</p>
            <button className='signInButton' disabled={!isVerified}>
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