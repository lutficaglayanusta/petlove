import { useDispatch} from "react-redux"
import type { AppDispatch } from "../redux/store"
import { useEffect } from "react"
import { fetchUserInfo } from "../redux/users/operation"
import UserCard from "../components/UserCard"


const ProfilePage = () => {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])


  return (
    <UserCard/>
  )
  
}

export default ProfilePage