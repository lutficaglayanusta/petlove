import { Link } from "react-router-dom"

const AuthNav = () => {
  return (
    <ul>
          <li>
              <Link to="/login">Login</Link>
      </li>
      <li>
          <Link to="/register">Registration</Link>
      </li>
    </ul>
  )
}

export default AuthNav
