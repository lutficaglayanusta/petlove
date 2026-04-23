import { Link } from "react-router-dom"

const UserNav = () => {
  return (
    <ul>
          <li>
              <button>LOG OUT</button>
      </li>
          <li>
                <Link to="/profile">Profile</Link>
      </li>
    </ul>
  )
}

export default UserNav
