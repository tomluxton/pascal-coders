import {useState, useEffect, useRef} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

function CreateCourse() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    price: '',
    images: {}
  })

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true)

  useEffect(() => {
    if(isMounted) {
      onAuthStateChanged(auth, (user) => {
        if(user){
          setFormData({...formData, userRef: user.uid})
        } else {
          navigate('/sign-in')
        }
      })
    }

    return() => {
      isMounted.current = false
    }
  }, [isMounted])

  if(loading) {
    return (
      <h3>Loading</h3>
    )
  }

  return (
    <div>CreateCourse</div>

  )
}

export default CreateCourse