import {useState} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

function CreateCourse() {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    price: '',
    images: {}
  })



  return (
    <div>CreateCourse</div>

  )
}

export default CreateCourse