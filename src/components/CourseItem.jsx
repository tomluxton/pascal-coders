import {useNavigate} from 'react-router-dom'
import {Card, Button} from 'react-bootstrap'


function CourseItem ({course, id}) {

  const navigate = useNavigate()

  const onPress = () => {
    navigate(`/${id}`)
  }
  return ( 

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={course.imgURLs[0]} />
      <Card.Body>
        <Card.Title>{course.name}</Card.Title>
        <Card.Text>
          ${course.price}
        </Card.Text>
        <Button variant="primary" onClick = {onPress} >View Course</Button> 
      </Card.Body>
    </Card>
  )
}

export default CourseItem