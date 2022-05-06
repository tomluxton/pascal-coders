import {Button} from "react-bootstrap"
import {Link} from 'react-router-dom'

function TeachingPortal() {
  return (
    <div>
      <h1>TeachingPortal</h1>
      <Button href="/teaching-portal/create-course" > Create a Course</Button>
    </div>
  )
}

export default TeachingPortal