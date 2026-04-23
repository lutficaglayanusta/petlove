import { useSelector } from "react-redux"
import Nav from "./Nav"
import UserNav from "./UserNav"
import AuthNav from "./AuthNav"
import { selectAuthenticated } from "../redux/auth/selector"


const Header = () => {

    const isAuthenticated = useSelector(selectAuthenticated)

  return (
    <header>
          <Nav />
          {
              isAuthenticated ? <UserNav /> : <AuthNav />
          }
          
    </header>
  )
}

export default Header
