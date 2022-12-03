import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ( { onInputChange, onImageSubmit } ) => {
  return (
    <div>
        <p className='f3 center'>
            {'This Magic Brain Will Detect Face In Your Pictures. Give It a Try!'}
        </p>
        <div className='center img-input'>
            <div className='form pa4 br3 center shadow-5'>
                <input onChange={onInputChange} className='f4 pa2 w-70 center' type="text" />
                <button onClick={onImageSubmit} className='w-30 detect-btn grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
            </div>
        </div>
    </div>
  )
}

export default ImageLinkForm