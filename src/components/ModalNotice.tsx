import type { JSX } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { addNoticeToFavorites } from "../redux/notices/operation";

type NoticesItemProps = {
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
  onClose: () => void;
};


const ModalNotice = ({ item, onClose }: NoticesItemProps): JSX.Element => {

    const birthDate = new Date(item.birthday).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    });

    const dispatch = useDispatch<AppDispatch>();
    
    const addToFavorites = (noticeId: string) => {
       dispatch(addNoticeToFavorites(noticeId));
    }


  return (
    <div>
      <img className="w-[150px] rounded-full" src={item.imgURL} alt={item.name} />
      <p>{item.name}</p>
      <div>
        <img src="../../star.svg" alt="star" />
        <p>{item.popularity}</p>
          </div>
          <div className="flex items-center gap-3 text-sm mb-3">
          <div>
            <p className="text-gray-600 text-xs">Name</p>
            <p className="font-semibold truncate">{item.name}</p>
          </div>
          <div>
            <p className="text-gray-600 text-xs">Birthday</p>
            <p className="font-semibold">{birthDate}</p>
          </div>
          <div>
            <p className="text-gray-600 text-xs">Species</p>
            <p className="font-semibold truncate">{item.species}</p>
          </div>
          <div>
            <p className="text-gray-600 text-xs">Sex</p>
            <p className="font-semibold">{item.sex}</p>
          </div>
          <div>
            <p className="text-gray-600 text-xs">Category</p>
            <p className="font-semibold">{item.category}</p>
          </div>
        </div>
          <p>
              {item.comment}
          </p>
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            X
          </button>
          <button onClick={()=> addToFavorites(item._id)} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Add To Favorites
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Contact
          </button>
    </div>
  );
};

export default ModalNotice;
