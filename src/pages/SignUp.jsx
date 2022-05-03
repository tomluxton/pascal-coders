import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg"
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import { toast } from 'react-toastify';

function SignUp() {

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const {name, email, password} = formData

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
      const userCredential = await createUserWithEmailAndPassword(auth,email,password)

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName:name
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)
      
      navigate('/')
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('User exists with this email. Please signin instead')
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid Email. Please user valid email')
      } else if (error.code === 'auth/internal-error') {
        toast.error('Something went wrong, please ensure all forms are filled out')
      } else if (error.code === 'auth/weak-password') {
        toast.error('The password is too weak')
      } else {
      toast.error(error.code)
      }
    }
  }


  return (
    <>
      <div>
        <header>
          <p>Sign Up</p>
        </header>

        <form onSubmit={onSubmit}>
          <input type="text" className="nameInput" placeholder='Name' id="name" value = {name} onChange = {onChange}/>

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
          
          <div>
            <p>Sign Up</p>
            <button className='signUpButton'>
              <ArrowRightIcon fill = "#ffffff" width = '34px' height = '34px' />
            </button>
          </div>
        </form>

        {/*Put google OAuth here*/}
        

        <Link to="/sign-in" className='registerLink' >
          Sign In Instead
        </Link>
      </div>
    </>
  )
}

export default SignUp