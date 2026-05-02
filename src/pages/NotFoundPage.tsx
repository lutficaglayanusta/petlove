import type { JSX } from "react";
import image from "../assets/img/404.png"
import { Link } from "react-router-dom";

const NotFoundPage = (): JSX.Element => {
  return (
    <div className="bg-[#F6B83D] px-[155px] py-[80px] text-center rounded-[60px]">
          <img className="block mx-auto bg-[#F6B83D] rounded-3xl" src={image} alt="Not Found" />
          <p className="text-white text-[24px] mt-4">
              Ooops! This page not found :
          </p>
          <Link to="/" className="color-[#F6B83D] bg-[#FFF4DF] px-[30px] py-[14px] rounded-3xl inline-block mt-4">
               To Home Page
          </Link>
    </div>
  )
}

export default NotFoundPage
