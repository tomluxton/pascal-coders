import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'


function SignIn() {

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const {email, password} = formData

  const navigate = useNavigate()


  return (
    <div>SignIn</div>
  )
}

export default SignIn