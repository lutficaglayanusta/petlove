
import { Navigate } from 'react-router-dom'
import { selectAuthenticated } from '../redux/auth/selector'
import { useSelector } from 'react-redux'

const RestrictedRoute = ({ component: Component, redirectTo = "/" }) => {
    
    const isAuthenticated = useSelector(selectAuthenticated)


  return (
    isAuthenticated ? <Navigate to={redirectTo} /> : <Component />
  )
}

export default RestrictedRoute
