
import { Navigate } from 'react-router-dom'
import { selectAuthenticated } from '../redux/auth/selector'
import { useSelector } from 'react-redux'
import type {JSX} from "react"

type RestrictedRouteProps = {
    component: JSX.Element,
    redirectTo?: string
}

const RestrictedRoute = ({ component, redirectTo = "/" }:RestrictedRouteProps): JSX.Element => {
    
    const isAuthenticated = useSelector(selectAuthenticated)


  return (
    isAuthenticated ? <Navigate to={redirectTo} /> : component
  )
}

export default RestrictedRoute
