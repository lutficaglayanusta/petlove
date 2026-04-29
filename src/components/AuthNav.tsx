import { Link } from "react-router-dom";

const AuthNav = () => {
  return (
    <ul className="flex gap-[10px]">
      <li>
        <Link className="px-[35px] py-[15px] bg-[#F6B83D] text-white rounded-3xl " to="/login">Login</Link>
      </li>
      <li>
        <Link className="px-[35px] py-[15px] bg-[#FFF4DF] text-[#F6B83D] rounded-3xl " to="/register">Registration</Link>
      </li>
    </ul>
  );
};

export default AuthNav;
