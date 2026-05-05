import { useState, type JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { addNoticeToFavorites } from "../redux/notices/operation";
import { CiHeart } from "react-icons/ci";
import { selectAuthenticated } from "../redux/auth/selector";
import Modal from "react-modal";
import ModalAttention from "./ModalAttention";
import toast from "react-hot-toast";

const isMobile = window.innerWidth < 768;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:isMobile ? "95%" :"40%",
    maxWidth: isMobile ? '90%' : 'none',
    borderRadius: '30px',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  }
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
  onClose: () => void;
};


const ModalNotice = ({ item, onClose }: NoticesItemProps): JSX.Element => {

  const [modalIsOpen, setIsOpen] = useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
  
    function closeModal() {
      setIsOpen(false);
    }

  const isAuthenticated = useSelector(selectAuthenticated)

    const birthDate = new Date(item.birthday).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    });

    const dispatch = useDispatch<AppDispatch>();
    
  const addToFavorites = (noticeId: string) => {
    if (isAuthenticated) {
      dispatch(addNoticeToFavorites(noticeId))
        .unwrap()
        .then(() => {
          toast.success("Added to favorites",{duration:2000})
        })
        .catch((e) => {
          if (e.status === 409) {
            return toast.error("This product is already in your favorites",{duration:2000})
          }
        toast.error("Something went wrong",{duration:2000})
      })
      
    } else {
      openModal()
    }
    onClose()
    }


  return (
    <div className="p-5 text-center">
      <img className="w-[150px] rounded-full block mx-auto mb-[16px]" src={item.imgURL} alt={item.name} />
      <p className="text-center">{item.name}</p>
      <div className="flex items-center gap-2 my-3 justify-center">
        <img src="../../star.svg" alt="star" />
        <p>{item.popularity}</p>
          </div>
          <div className="flex items-center justify-center gap-3 text-sm mb-[16px]">
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
          <p className="mb-[32px] w-[80%] mx-auto text-center">
              {item.comment}
      </p>
      {
        item.price && (
          <p className="my-3 font-bold text-lg text-center">${item.price}</p>
        )
      }
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer">
            <img src="../../x.svg" alt="" />
          </button>
          <button onClick={()=> addToFavorites(item._id)} className="gap-2 bg-[#F6B83D] text-white py-[14px] px-[42px] rounded-3xl mr-2">
            Add To <CiHeart className="inline-block text-[30px]" />
          </button>
          <button className="bg-[#FFF4DF] text-[#F6B83D] py-[14px] px-[42px] rounded-3xl max-sm:mt-3">
            Contact
      </button>
      <Modal  isOpen={modalIsOpen}
        
        onRequestClose={closeModal}
        style={customStyles}>
        <ModalAttention onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default ModalNotice;
