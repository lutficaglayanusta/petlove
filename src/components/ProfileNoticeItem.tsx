import type { JSX } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { removeNoticeFromFavorites } from "../redux/notices/operation";

type ProfileNoticeItemProps = {
  item: {
    _id: string;
    title: string;
    name: string;
    species: string;
    category: string;
    birthday: string;
    sex: string;
    location: string;
    imgURL: string;
    price?: string;
    popularity?: number;
    comment?: string;
  };
};

const ProfileNoticeItem = ({ item }: ProfileNoticeItemProps): JSX.Element => {

  const dispatch = useDispatch<AppDispatch>();

  const birthDate = new Date(item.birthday).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  

  const handleDeleteFavorite = (noticeId: string) => {
    dispatch(removeNoticeFromFavorites(noticeId));
  };


  return (
    <div className="bg-white p-3 rounded-xl max-sm:w-[100%] max-sm:text-center">
      <img
        src={item.imgURL}
        alt={item.name}
        className="w-[292px] rounded-xl mx-auto mb-3"
      />
      <h2 className="mb-2 text-[18px] font-semibold">{item.title}</h2>
      <div className="flex items-center gap-3 mb-3 max-sm:justify-center">
        <div>
          <p className="text-[#262626] text-[10px]">Name</p>
          <p className="text-[12px] truncate">{item.name}</p>
        </div>
        <div>
          <p className="text-[#262626] text-[10px]">Birthday</p>
          <p className="text-[12px]">{birthDate}</p>
        </div>
        <div>
          <p className="text-[#262626] text-[10px]">Species</p>
          <p className="text-[12px] truncate">{item.species}</p>
        </div>
        <div>
          <p className="text-[#262626] text-[10px]">Sex</p>
          <p className="text-[12px]">{item.sex}</p>
        </div>
        <div>
          <p className="text-[#262626] text-[10px]">Category</p>
          <p className="text-[12px]">{item.category}</p>
        </div>
      </div>
      <p className="text-[14px] mb-[16px] w-[95%]">{item.comment}</p>

      {item.price && <p className="text-[18px] font-medium">${item.price}</p>}
      <div className="flex items-center justify-between gap-2">
              <button className="bg-[#F6B83D] px-6 py-2 rounded-3xl text-white mt-[12px] w-[90%] cursor-pointer">Learn More</button>
              <img onClick={()=> handleDeleteFavorite(item._id)} className="bg-[#FFF4DF] p-3 rounded-full cursor-pointer" src="../../public/trash-2.svg" alt="" />
      </div>
    </div>
  );
};

export default ProfileNoticeItem;
