import {useState, useEffect, useRef} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap'
import { getStorage, ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
import {db} from '../firebase.config'
import {v4 as uuidv4} from 'uuid'
import {toast} from "react-toastify"
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

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

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    console.log(formData)


    // firebase storage for images

    const storeImage = async (image) => {
      return new Promise((resolve, reject) =>{
        const storage = getStorage()
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
        const storageRef = ref(storage, 'images/' + fileName)


        const uploadTask = uploadBytesResumable(storageRef, image)


        //https://firebase.google.com/docs/storage/web/upload-files
        uploadTask.on('state_changed', 
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          }, 
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      })
    }

    const imgURLs = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(()=> {
      setLoading(false)
      toast.error('image not uploaded')
      return
    })

    const formDataCopy = {
      ...formData,
      imgURLs,
      timestamp: serverTimestamp(),
    }

    delete formDataCopy.images
    console.log(imgURLs)
    console.log("done")

    const docRef = await addDoc(collection(db, 'courses'), formDataCopy)
    setLoading(false)

    toast.success('Listing Saved successfully')
    //navigate(`/category/${formDataCopy.type}/${docRef.id}`)
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