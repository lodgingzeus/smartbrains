import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NotificationManager, NotificationContainer } from 'react-notifications'

const Register = ( { setUser }) => {
    const [ name, setName ] = useState()
    const [ password, setPassword ] = useState()
    const [ email, setEmail ] = useState()

    const navigate = useNavigate()

    const onNameChange = (e) => {
        setName(e.target.value)
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const submitRegister = async (e) => {
        const response = await fetch('http://localhost:8181/api/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                password: password,
                email: email
            })
        })
        const data = await response.json()
        if(data.error) return NotificationManager.warning('User with that email already exists', 'Unable to register', 3000);
        setUser({
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        })
        navigate('/home')
    }

  return (
    <>
    <div className='center'>
        <NotificationContainer />
    </div>
    <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
      <Link to='/'>
      <p className='f3 link dim black underline pa3 pointer'>Sign in</p>
      </Link>
    </nav>
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
    <main className="pa4 black-80">
        <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input onChange={onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" />
            </div>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                <input onChange={onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" />
            </div>
            <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
            </div>
            </fieldset>
            <div className="center">
                <div onClick={submitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib">Register</div>
            </div>
            <div className="lh-copy mt3 center">
                <Link to='/'>
                    <div className="f6 link dim black db">Sign In</div>
                </Link>
            </div>
        </form>
    </main>
    </article>
    </>
  )
}

export default Register