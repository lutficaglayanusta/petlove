import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import type { AppDispatch } from "../redux/store"
import { logout } from "../redux/auth/operations";
import type { JSX } from "react"

const UserNav = ():JSX.Element => {

  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (): void => {
    dispatch(logout());
  }

  return (
    <ul>
          <li>
              <button onClick={handleClick}>LOG OUT</button>
      </li>
          <li>
                <Link to="/profile">Profile</Link>
      </li>
    </ul>
  )
}

export default UserNav
