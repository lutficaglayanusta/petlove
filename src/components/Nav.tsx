import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <nav>
          <ul>
              <li>
                  <Link to="/news">News</Link>
              </li>
              <li>
                  <Link to="/notices">Notices</Link>
              </li>
              <li>
                  <Link to="/friends">Friends</Link>
              </li>
          </ul>
    </nav>
  )
}

export default Nav
