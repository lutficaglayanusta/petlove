import { useEffect } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../redux/store"
import { fetchFriends } from "../redux/friends/operations";
import type {JSX} from "react";
import FriendsList from "../components/FriendsList";


const FriendsPage = (): JSX.Element => {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchFriends())
  }, [dispatch])
  

  return (
    <div>
      <FriendsList />
    </div>
  )
}

export default FriendsPage
