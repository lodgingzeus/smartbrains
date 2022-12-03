import React from 'react'
import Tilt from 'react-parallax-tilt'
import brain from './brain.png'
import './Logo.css'

const Logo = () => {
  return (
    <div className='ma4 mt0'>
        <Tilt
            className='parallax-effect-glare-scale tilt br2 shadow-2'
            perspective={500}
            glareEnable={true}
            glareMaxOpacity={0.45}
            scale={1.02}
        >
            <div className='pa4'>
                <img className='logo-image' src={brain} alt="brain" />
            </div>
        </Tilt>
    </div>
  )
}

export default Logo