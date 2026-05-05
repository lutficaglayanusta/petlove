import { type JSX } from "react";
import { useSelector } from "react-redux";
import { selectFriends } from "../redux/friends/selector";
import FriendsItem from "./FriendsItem";

const FriendsList = (): JSX.Element => {
  const friends = useSelector(selectFriends);

  return (
    <div>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-[54px]">Our Friends</h1>
        <div className="flex flex-wrap gap-5">
          {friends.map((friend) => (
            <FriendsItem key={friend._id} item={friend} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
