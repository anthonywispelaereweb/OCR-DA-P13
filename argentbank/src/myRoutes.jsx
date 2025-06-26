import Home from '@pages/Home'
import Login from '@pages/Login'
import Profile from '@pages/Profile'

const myRoutes = [
  { path: null, index:true, element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/profile', element: <Profile /> }
]
export default myRoutes;