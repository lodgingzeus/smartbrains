import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { NotificationManager, NotificationContainer } from 'react-notifications'

const SignIn = ( { setUser }) => {
    const [ email, setEmail ] = useState()
    const [ password, setPassword ] = useState()

    const navigate = useNavigate()

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
     }

    const onSubmitSignIn = async (e) => {
        const response = await fetch('http://localhost:8181/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        const data = await response.json()
        if(data.error) return NotificationManager.warning('Wrong email or password', 'Error!', 3000);
        if(data.id) {
            setUser({
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            })
            navigate('/home')
        }
    }

  return (
    <>
    <div className='center'>
        <NotificationContainer />
    </div>
    <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
      <Link to='/register'>
      <p className='f3 link dim black underline pa3 pointer'>Register</p>
      </Link>
    </nav>
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
    <main className="pa4 black-80">
        <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input onChange={onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
            </div>
            <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
            </div>
            </fieldset>
            <div className="center">
                <div className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={onSubmitSignIn}>Sign in</div>
            </div>
            <div className="lh-copy mt3 center">
            <Link to='/register'>
                    <p className="f6 link dim black db">Register</p>
                </Link>
            </div>
        </form>
    </main>
    </article>
    </>
  )
}

export default SignIn