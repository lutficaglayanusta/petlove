import { useSelector } from "react-redux"
import { selectAuthenticated } from "../redux/auth/selector"
import { Navigate } from "react-router"


const PrivateRoute = ({ component: Component , redirectTo = "/" }) => {

    const isAuthenticated = useSelector(selectAuthenticated)

  return (
    isAuthenticated ? <Component /> : <Navigate to={redirectTo} />

  )
}

export default PrivateRoute
