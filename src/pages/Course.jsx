import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {getDoc, doc} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {db} from '../firebase.config'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {Container} from 'react-bootstrap'



function Course() {
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

  useEffect(() => {
    const fetchCourse = async () => {
      const docRef = doc(db, 'courses', params.courseId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setCourse(docSnap.data())
        setLoading(false)
      }
    }
    fetchCourse()
  }, [navigate, params.courseId])

  if (loading) {
    return <h3></h3>
  }


  return (
    <div>
      <Container fluid="md" className='courseContainer'>
      <h1>{course.name}</h1>
      <h4>{course.type}</h4>
      <p>Price: ${course.price}</p>      
        <Carousel>
          { course.imgURLs.map((imageURL) => (
            <div>
            <img src={imageURL} />
          </div>
        ))}
          
        </Carousel>
      </Container>
    </div>
  )
}

export default Course