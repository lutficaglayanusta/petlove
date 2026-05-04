import { useState, type JSX } from "react";
import Modal from "react-modal";
import ModalNotice from "./ModalNotice";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { selectNoticesFavorites } from "../redux/users/selector";
import { useSelector } from "react-redux";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '30px',
  },
};

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
};

const NoticesItem = ({ item }: NoticesItemProps): JSX.Element => {

  const userFavorites = useSelector(selectNoticesFavorites);

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }

  const birthDate = new Date(item.birthday).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-lg p-5 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      
      <img 
          src={item.imgURL}
          alt={item.name}
          className="rounded-xl"
        />
      

          <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold mb-2 truncate">{item.title}</h3>
                  <div className="flex items-center gap-2">
                      <img src="../../star.svg" alt="star" />
                      {item.popularity}
                  </div>
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

        {item.comment && (
          <p className="text-sm text-gray-700 mb-3 line-clamp-2">
            {item.comment}
          </p>
        )}
        {item.price && (
            <span className="text-lg font-bold">
              ${item.price}
            </span>
          )}
        <div className="flex justify-between items-center gap-3">
          
          <button onClick={openModal} className="bg-amber-400 hover:bg-amber-500 text-white px-6 py-2 rounded-full font-semibold transition-colors w-[95%]">
            Learn more
          </button>
          <button className=" bg-[#FFF4DF] rounded-full p-2 hover:bg-gray-100">
            {userFavorites?.some(fav => fav._id === item._id) ? (
              <FaHeart className="text-2xl text-[#F6B83D]" />
            ) : (
              <CiHeart className="text-2xl" />
            )}
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        
        onRequestClose={closeModal}
        style={customStyles}
        
      >
        <ModalNotice item={item} onClose={closeModal} />
      </Modal>
    </div>
    
  );
};

export default NoticesItem;
