import {useState, useEffect, useRef} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap'

function CreateCourse() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    price: '',
    images: {}
  })

  const {type, name, price, images} = formData

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

  const onSubmit = e => {
    e.preventDefault()
    console.log(formData)
  }

  const onChange = e => {

    if (e.target.files){
      setFormData((prevState) => ({
        ...prevState,
        images:e.target.files
      }))
    }
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value
      }))
    }
  }

  if(loading) {
    return (
      <h3>Loading</h3>
    )
  }

  return (
    <Container>
      <Row>
      <h1>Create a Course</h1>
      </Row>
      <form onSubmit={onSubmit}>
        <Row>
          <label>Name</label>
          <input type = "text" id = "name" value = {name} onChange = {onChange} required/>
        </Row>
        <Row>
          <label>Price</label>
          <input type = "number" id = "price" value = {price} onChange = {onChange} required/>
        </Row>
        <Row>
          <label>Images and Videos</label>
          <input type = "file" id = "images" accept = '.jpg,.png,.jpeg' onChange = {onChange} multiple required/>
        </Row>
        <Row>
        <button type = "submit">Create</button>
        </Row> 
      </form>
      
    </Container>

  )
}

export default CreateCourse