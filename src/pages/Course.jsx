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
      const docRef = doc(db, 'courses', params.listingId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        console.log(docSnap.data())
        setCourse(docSnap.data())
        setLoading(false)
      }
    }
    fetchCourse()
  }, [navigate, params.listingId])


  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

export default Course