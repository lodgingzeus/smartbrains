import { BrowserRouter, Routes, Route} from 'react-router-dom'
import ParticlesBg from 'particles-bg'
import SignIn from './components/SignIn/SignIn'
import HomePage from './components/HomePage/HomePage'
import Register from './components/Register/Register'
import { useState } from 'react'

const App = () => {

  const [ user, setUser ] = useState({
      id: '',
      name: '',
      email: '',
      entries: 0,
    })

  return (
    <BrowserRouter>
        <div>
            <Routes>
                <Route path='/' element = {<SignIn setUser = {setUser}/>}/>
                <Route path='/register' element = {<Register setUser = {setUser}/>}/>
                <Route path='/home' element = {<HomePage user = {user} setUser = {setUser}/>}/>
            </Routes>
            <ParticlesBg type="cobweb" color="#fc0328" num={200} bg={true} />
        </div>
    </BrowserRouter>
  )
}

export default App