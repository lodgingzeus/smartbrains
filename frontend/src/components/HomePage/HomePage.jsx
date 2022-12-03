import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FaceRecognition from '../FaceRecognition/FaceRecognition'
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm'
import data from '../../constants.json'
import Logo from '../Logo/Logo'
import Navigation from '../Navigation/Navigation'
import Ranks from '../Ranks/Ranks'

const USER_ID = data.USER_ID;
const PAT = data.PAT;
const APP_ID = data.APP_ID;
const MODEL_ID = data.MODEL_ID;

const HomePage = ( { user, setUser }) => {
  console.log(USER_ID)

  const navigate = useNavigate()
  
  useEffect(() => {
  if(user.id === '') navigate('/')
  })

  const [ input, setInput ] = useState()
  const [ imageUrl, setImageUrl ] = useState()
  const [ faceBox, setfaceBox ] = useState([])


  const calculateFaceLocation = (data) => {
    const faceArray = []
    const length = data.outputs[0].data.regions.length
    const regions = data.outputs[0].data.regions

    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)
    console.log(height, width)

    for(let i = 0; i < length; i++){
        let clarifaiFace = regions[i].region_info.bounding_box
        faceArray.push({
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        })
    }

    return faceArray
  }

  const displayFaceBox = (box) => {
    setfaceBox(box)
  }

  const onInputChange = (e) => {
    setInput(e.target.value)
  }

  const onImageSubmit = () => {
    //if input value is empty
    if(!input){
      return alert("Enter an image url")
    }else{
      setImageUrl(input)
    }

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": input
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID  + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => {
          if(result) {
            fetch('http://localhost:8181/api/image', {
              method: 'put',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  id: user.id,
                  entries: user.entries
              })
          })
          .then(res => res.json())
          .then(count => {
            setUser(Object.assign(user, {
              entries: count
            }))
          })
          }
          displayFaceBox(calculateFaceLocation(result))
        })
        .catch(error => console.log('error', error));
  }

  return (
    <div>
            <Navigation />
            <Logo />
            <Ranks user = {user}/>
            <ImageLinkForm onInputChange = {onInputChange} onImageSubmit = {onImageSubmit} />
            <FaceRecognition faceBox = {faceBox} imageUrl = {imageUrl}/>
    </div>
  )
}

export default HomePage