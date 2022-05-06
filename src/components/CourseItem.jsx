import {Link} from 'react-router-dom'


function CourseItem ({course, id}) {
  return ( 
    <li>
      <Link to = {'/${id}'}>
        <img 
          src = {course.imgURLs[0]} 
          alt = {course.name}
          className = "coursePriamryImage"
        />
        <div>
          <h4>{course.name}</h4>
          <p>${course.price}</p>
        </div>
      </Link>
    </li>
  )
}

export default CourseItem