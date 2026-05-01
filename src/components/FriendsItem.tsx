import { type JSX } from "react";

type Days = {
  _id: string;
  isOpen: boolean;
};
type Friend = {
  _id: string;
  title: string;
  url: string;
  addressUrl: string;
  address: string;
  imageUrl: string;
  workDays: Days[];
  phone: string;
  email: string;
};

const FriendsItem = ({ item }: { item: Friend }): JSX.Element => {
  return (
    <div className="flex gap-5 items-center bg-white p-3  rounded-lg">
      <img className="w-[90px]" src={item.imageUrl} alt={item.title} />
      <div>
        <h2>{item.title}</h2>
        {item.email && <p className="text-sm">Email: {item.email}</p>}
        {item.phone && <p className="text-sm">Phone: {item.phone}</p>}
        {item.address && (
          <p className="text-sm">
            Address:
            <a href={item.addressUrl} target="_blank">
              {item.address.substring(0, 20)}...
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default FriendsItem;
