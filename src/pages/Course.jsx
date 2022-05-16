import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {getDoc, doc} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {db} from '../firebase.config'



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
      <h1>{course.name}</h1>
      <p>Price: ${course.price}</p>
      
    </div>
  )
}

export default Course