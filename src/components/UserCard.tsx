import { useState, type JSX } from "react";
import { selectUser } from "../redux/users/selector";
import { useSelector } from "react-redux";
import ProfileNoticeItem from "./ProfileNoticeItem";
import { Link } from "react-router-dom";
import ModalEditUser from "./ModalEditUser";
import Modal from "react-modal";
import PetsList from "./PetsList";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '24px',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '90vh',
    height: '100%',
    overflow:"hidden"
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  }
};

const UserCard = (): JSX.Element => {
  const user = useSelector(selectUser);
  const [activeTab, setActiveTab] = useState<"favorites" | "viewed">(
    "favorites",
  );
   const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="flex gap-2 p-4 max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 w-[55%] p-6 h-[100%]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 bg-[#F6B83D] text-white text-sm font-medium px-4 py-1.5 rounded-full">
            User
          </div>
          <button onClick={openModal} className="w-9 h-9 rounded-full flex items-center justify-center bg-[#FFF4DF]">
            <img src="../../edit-2.svg" alt="edit" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 mb-6">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-[110px] rounded-full"
            />
          ) : (
            <img className="w-[100px]" src="../../icon.svg" alt="" />
          )}

          <span className="text-sm text-gray-400">Upload photo</span>
        </div>

        <p className="font-medium text-gray-800 mb-3">My information</p>
        <input
          className="w-full px-4 py-3 border border-gray-200 rounded-3xl text-sm mb-3 outline-none"
          defaultValue={user.name}
          placeholder="Name"
        />
        <input
          className="w-full px-4 py-3 border border-gray-200 rounded-3xl text-sm mb-3 outline-none"
          defaultValue={user.email}
          placeholder="Email"
        />
        <input
          className="w-full px-4 py-3 border border-gray-200 rounded-3xl text-sm mb-3 outline-none"
          defaultValue={user.phone}
          placeholder="Phone"
        />

        <div className="flex items-center justify-between mt-5">
          <p className="font-medium text-gray-800">My pets</p>
          <Link to="/add-pet" className="bg-[#F6B83D] text-white text-sm font-medium px-5 py-2.5 rounded-3xl">
            Add pet +
          </Link>
        </div>

        
        <PetsList/>


        <button className="mt-6 bg-[#FAEEDA] text-[#F6B83D] font-medium px-7 py-3 rounded-3xl">
          LOG OUT
        </button>
      </div>

      <div className="p-6 w-[100%] ">
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setActiveTab("favorites")}
            className={`px-5 py-2.5 rounded-3xl text-sm font-medium border ${activeTab === "favorites" ? "bg-[#F6B83D] text-white border-[#F6B83D]" : "bg-white text-gray-500 border-gray-200"}`}
          >
            My favorite pets
          </button>
          <button
            onClick={() => setActiveTab("viewed")}
            className={`px-5 py-2.5 rounded-3xl text-sm font-medium border ${activeTab === "viewed" ? "bg-[#F6B83D] text-white border-[#F6B83D]" : "bg-white text-gray-500 border-gray-200"}`}
          >
            Viewed
          </button>
        </div>

        <div className="flex flex-wrap gap-6">
          {activeTab === "favorites" &&
            user.noticesFavorites.map((item) => (
              <ProfileNoticeItem key={item._id} item={item} />
            ))}
        </div>

        <div className="flex flex-wrap gap-6">
          {activeTab === "viewed" &&
          user.noticesViewed.map((notice) => (
            <ProfileNoticeItem key={notice._id} item={notice} />
          ))}
        </div>
        
      </div>
      <Modal isOpen={modalIsOpen}
        
        onRequestClose={closeModal}
        style={customStyles} >
        <ModalEditUser onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default UserCard;
