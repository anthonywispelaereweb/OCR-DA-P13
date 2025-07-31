import { Link, useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import argentBankLogo from '@images/argentBankLogo.png'

import { logout } from '@/redux/features/auth/authSlice'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector(state => state.auth)
  const { firstName } = useSelector(state => state.profile)
  const isLoginPage = window.location.pathname === '/login'
  const handleSignOut = () => {
    dispatch(logout())
    navigate('/')
  }
  return (
    <nav className='main-nav'>
      <Link className='main-nav-logo' to='/'>
        <img className='main-nav-logo-image' src={argentBankLogo} alt='Argent Bank Logo' />
        <h1 className='sr-only'>Argent Bank</h1>
      </Link>
      <div className='main-nav-login-logout'>
        {!isAuthenticated ? (
          !isLoginPage && (
          <Link className='main-nav-item' to='/login'>
            <i className='fa fa-user-circle'></i>
            Sign In
          </Link>)
        ) : (
          <>
            <i className='fa fa-user-circle'></i> {firstName} <span> </span>
            <Link className='main-nav-item' onClick={handleSignOut}>
              <i className='fa fa-sign-out'></i>
              Sign Out
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Header
