import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { useLoginMutation } from '@/redux/features/auth/api'
import { setGlobalCredentials } from '@/redux/features/auth/slice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [credentials, setCredentials] = useState({ email: 'tony@stark.com', password: 'password123' })
  const [login, { data, error, isLoading }] = useLoginMutation()
  const handleSignIn = async e => {
    e.preventDefault()
    try {
      const response = await login(credentials).unwrap()
      console.log('Login response:', response)
      // Console.log('Token from response:', response.token);
      if (!response.body.token) {
        console.error('No token in response:', response)
        return
      }
      dispatch(setGlobalCredentials({ token: response.body.token }))
      navigate('/profile')
    } catch (err) {
      console.error('Failed to sign in:', err)
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
            <input type='checkbox' id='remember-me' />
            <label htmlFor='remember-me'>Remember me</label>
          </div>
          <button type='submit' className='sign-in-button' disabled={isLoading}>
            Sign In
          </button>
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.toString()}</p>}
        </form>
      </section>
    </main>
  )
}

export default Login
