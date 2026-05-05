import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { JSX } from "react";
import { selectUser } from "../redux/users/selector";
import Modal from "react-modal";
import ModalApproveAction from "./ModalApproveAction";

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
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  }
};


const UserNav = (): JSX.Element => {
  const [modalIsOpen, setIsOpen] = useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
  
    function closeModal() {
      setIsOpen(false);
  }
  
  const user = useSelector(selectUser);

  const handleClick = (): void => {
    openModal()
  };

  return (
    <>
      <ul className="flex gap-3 items-center max-sm:flex-col">
        <li>
          <button
            className="bg-[#F6B83D] py-[15px] px-[35px] text-white rounded-3xl cursor-pointer"
            onClick={handleClick}
          >
            LOG OUT
          </button>
        </li>
        <li className="flex items-center gap-2">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-[50px] rounded-full"
            />
          ) : (
            <img
              className="w-[50px] rounded-full"
              src="../../icon.svg"
              alt=""
            />
          )}
          <Link to="/profile">{user.name}</Link>
        </li>
      </ul>
      <Modal isOpen={modalIsOpen}
        
        onRequestClose={closeModal}
        style={customStyles}>
        <ModalApproveAction onClose={closeModal} />
      </Modal>
    </>
  );
};

export default UserNav;
