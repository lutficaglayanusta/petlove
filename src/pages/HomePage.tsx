import type { JSX } from "react";
import logo from "../assets/img/image.png";

const HomePage = (): JSX.Element => {
  return (
    <div className="max-w-[1216px] mx-auto">
      <div className="flex bg-[#F6B83D] rounded-[60px] px-[64px] py-[16px]">
        <h1 className="text-[90px] text-white">Take good care of your small pets</h1>
        <p className="text-[18px] text-white w-[45%] self-end mb-10">
          Choosing a pet for your home is a choice that is meant to enrich your
          life with immeasurable joy and tenderness.
        </p>
      </div>

      <img  src={logo} alt="Logo" />
    </div>
  );
};

export default HomePage;
