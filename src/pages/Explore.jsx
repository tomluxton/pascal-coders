import { Nav, Container, Navbar } from "react-bootstrap"
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {collection, getDcos,query, where, orderBy, limit, startAfter, getDocs, doc} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import CourseItem from "../components/CourseItem"
import {Row} from "react-bootstrap"


function Explore() {

  const [courses, setCourses] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
    const fetchCourses = async () => {
      //console.log("here")
      try {
        const courseRef = collection (db, 'courses')

        const q = query( courseRef, 
        orderBy('timestamp', 'desc'),
        limit(10)
        )

        const querySnap = await getDocs(q)
        
        const courses = []
        querySnap.forEach((doc) =>{
          {/*console.log(doc.data()) */}
          return courses.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setCourses(courses)
        setLoading(false)
      } catch (error) {
        toast.error(error.code)
        console.log(error)
      }

    };

    fetchCourses();
  }, [])

  return(
  <div>
    <Navbar bg="white" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Nav
            className="me-auto my-2 my-lg-0 nav-fill w-100"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          <Nav.Link>Web Development</Nav.Link>
          <Nav.Link>Mobile Development</Nav.Link>
          <Nav.Link>Game Development</Nav.Link>
          <Nav.Link>Graphic Design</Nav.Link>
          <Nav.Link>Data Analytics</Nav.Link>
          <Nav.Link>Digital Marketing</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div>Explore page</div>

    {loading ? (
      <h2>Loading...</h2>
    ) : 
    <div>
    <Row xs={1} md={2} className="g-4">
      { courses.map((course) => (
        <CourseItem 
        course ={course.data}
        id= {course.id}
        key= {course.id}
        type = {course.type}
        />
      ))}
    </Row>
  </div>
  }
    


</div>
  )
}

export default Explore