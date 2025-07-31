import { useState } from 'react'
import { useLoginMutation } from '@/redux/features/auth/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { setGlobalCredentials, setRemember } from '@/redux/features/auth/authSlice'
import { useNavigate } from 'react-router'


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const rememberStore = useSelector(state => state.auth.remember)
  dispatch(setRemember({remember : JSON.parse(sessionStorage.getItem('remember'))}))

  const [credentials, setCredentials] = useState({ email: sessionStorage.getItem('usename') ?? '', password: 'password123' })
  const [login, { error, isLoading },] = useLoginMutation()
  const handleSignIn = async e => {
    e.preventDefault()
    try {
      const response = await login(credentials).unwrap()
      if (!response.body.token) {
        console.error('No token in response:', response)
        throw new Error('No token in response')
      }
      dispatch(setGlobalCredentials({ token: response.body.token }))
      navigate('/profile')
    } catch (err) {
      console.error('Failed to sign in:', err)
    }
  }

  const handleRemember = async e => {
    const choise = e.target.checked
    dispatch(setRemember({ choise }))

    if (choise) {
      sessionStorage.setItem('remember',choise)
      sessionStorage.setItem('usename',credentials.email)
      dispatch(setRemember({ choise }))
    } else {
      sessionStorage.removeItem('remember')
      sessionStorage.removeItem('usename')
    }
  }

  return (
    <main className='main bg-dark sign-in-page'>
      <section className='sign-in-content'>
        <i className='fa fa-user-circle sign-in-icon'></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div className='input-wrapper'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              placeholder='Username'
              value={credentials.email}
              onChange={e => setCredentials({ ...credentials, email: e.target.value })}
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              placeholder='Password'
              value={credentials.password}
              onChange={e => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>
          <div className='input-remember'>
            <input type='checkbox' id='remember-me' checked={rememberStore} onChange={(e) => handleRemember(e)} />
            <label htmlFor='remember-me'>Remember me</label>
          </div>
          <button type='submit' className='sign-in-button' disabled={isLoading}>
            Sign In
          </button>
          {isLoading && <p>Loading...</p>}
          {error && <p className='error'> {JSON.stringify(error?.data?.message)}</p>}
        </form>
      </section>
    </main>
  )
}

export default Login
