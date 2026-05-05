import type { JSX } from "react"
import logo from "../assets/img/small-dog.png"
import { Link } from "react-router-dom"

type ModalAttentionProp = {
  onClose:()=>void
}

const ModalAttention = ({onClose}:ModalAttentionProp):JSX.Element => {
  return (
    <div className="text-center relative">
      <img className="mx-auto my-2" src={logo} alt="small-dog" />
      <h2 className="text-[#F6B83D]">Attention</h2>
      <p className="w-[90%] mx-auto my-6">
        We would like to remind you that certain functionality is available only to authorized users.If you have an account, please log in with your credentials. If you do not already have an account, you must register to access these features.
      </p>
      <Link className="bg-[#F6B83D] py-[14px] px-[48px] rounded-3xl mr-3 text-white inline-block" to="/login">Log In</Link>
      <Link className="text-[#F6B83D] bg-[#FFF4DF] py-[14px] px-[24px] rounded-3xl inline-block max-sm:mt-3" to="/register">Registration</Link>
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer">
            <img src="../../x.svg" alt="" />
          </button>
    </div>
  )
}

export default ModalAttention
