import { type JSX } from "react";

type Days = {
  _id: string;
  isOpen: boolean;
  from?: string;
  to?: string;
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
  const hasWorkDays = item.workDays?.some((day) => day.from && day.to);

  return (
    <div className="relative flex gap-5 items-center bg-white p-4 rounded-lg">
      <img className="w-[90px]" src={item.imageUrl} alt={item.title} />
      <div className="flex-1">
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

      {hasWorkDays && (
        <div className="absolute top-1 right-1 bg-[#FFF4DF] text-[#F6B83D] rounded-3xl text-[14px] p-2">
          {(() => {
            const firstWorkDay = item.workDays.find((day) => day.from && day.to);
            return firstWorkDay ? (
              <p className="text-sm text-gray-600">
                {firstWorkDay.from} - {firstWorkDay.to}
              </p>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
};

export default FriendsItem;
