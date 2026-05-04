import type { JSX } from "react"
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { logout } from "../redux/auth/operations";
import logo from "../assets/img/small-cat.png"

type ModalApproveActionProp = {
    onClose: ()=> void
}

const ModalApproveAction = ({onClose}:ModalApproveActionProp): JSX.Element => {

    const dispatch = useDispatch<AppDispatch>();

    const handleYes = ():void => {
        dispatch(logout())
    }
    
  return (
    <div className="p-[20px] relative">
          <img className="mx-auto my-3" src={logo} alt="" />
          <p className="text-[24px] font-semibold text-center">
              Already leaving?
          </p>
          <div>
              <button className="my-5 py-[14px] px-[57px] bg-[#F6B83D] rounded-3xl mr-3 text-white" onClick={handleYes}>Yes</button>
              <button onClick={onClose} className="py-[14px] px-[44px] bg-[#F4F4F4] rounded-3xl">Cancel</button>
          </div>
          <button className="absolute top-2 right-2" onClick={onClose}>
              <img src="../../public/x.svg" alt="" />
          </button>
    </div>
  )
}

export default ModalApproveAction
