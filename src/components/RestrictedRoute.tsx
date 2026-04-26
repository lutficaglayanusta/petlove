
import { Navigate } from 'react-router-dom'
import { selectAuthenticated } from '../redux/auth/selector'
import { useSelector } from 'react-redux'
import type {JSX} from "react"

type RestrictedRouteProps = {
    component: React.ComponentType,
    redirectTo?: string
}

const RestrictedRoute = ({ component: Component, redirectTo = "/" }:RestrictedRouteProps): JSX.Element => {
    
    const isAuthenticated = useSelector(selectAuthenticated)


  return (
    isAuthenticated ? <Navigate to={redirectTo} /> : <Component />
  )
}

export default RestrictedRoute
