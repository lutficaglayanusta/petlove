import { useSelector } from "react-redux"
import { selectAuthenticated } from "../redux/auth/selector"
import { Navigate } from "react-router"
import type {JSX} from "react"

type PrivateRouteProps = {
    component: React.ComponentType,
    redirectTo?: string
}

const PrivateRoute = ({ component:Component , redirectTo = "/" }: PrivateRouteProps): JSX.Element => {

    const isAuthenticated = useSelector(selectAuthenticated)

  return (
    isAuthenticated ? <Component /> : <Navigate to={redirectTo} />
  )
}

export default PrivateRoute
