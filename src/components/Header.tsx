import { useSelector } from "react-redux"
import Nav from "./Nav"
import UserNav from "./UserNav"
import AuthNav from "./AuthNav"
import { selectAuthenticated } from "../redux/auth/selector"
import logo from '../assets/img/logo.jpg'


const Header = () => {

    const isAuthenticated = useSelector(selectAuthenticated)

  return (
    <header>
    
          <img src={logo} alt="Logo" />
          <Nav />
          {
              isAuthenticated ? <UserNav /> : <AuthNav />
          }
          
    </header>
  )
}

export default Header
