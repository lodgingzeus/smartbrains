import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, faceBox }) => {
  let imageAvailable = false
  if(imageUrl !== undefined || imageUrl !== null) imageAvailable = true
  return (
    <div className='center'>
      {imageAvailable && (
        <div className='mt4 absolute'>
        <img id='inputImage' src={imageUrl} alt="" width='500px' height = "auto" />
        {faceBox.map(face => (
          <div key={Math.floor(Math.random() * 1000)} className='bounding-box' style={
            {
              top: face.topRow,
              right: face.rightCol,
              bottom: face.bottomRow,
              left: face.leftCol
            }
          }>
          </div>
        ))}
        </div>
      )}    
    </div> 
  )
}

export default FaceRecognition