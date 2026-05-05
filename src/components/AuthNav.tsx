import { Link } from "react-router-dom";

interface AuthNavProps {
  mobile?: boolean;
}

const AuthNav = ({ mobile }: AuthNavProps) => {
  if (mobile) {
    return (
      <ul className="flex flex-col gap-3 w-full">
        <li>
          <Link
            className="block w-full text-center py-[15px] bg-[#F6B83D] text-white rounded-3xl font-medium"
            to="/login"
          >
            LOG IN
          </Link>
        </li>
        <li>
          <Link
            className="block w-full text-center py-[15px] bg-[#FFF4DF] text-[#F6B83D] rounded-3xl font-medium"
            to="/register"
          >
            REGISTRATION
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <ul className="flex gap-[10px]">
      <li>
        <Link className="px-[35px] py-[15px] bg-[#F6B83D] text-white rounded-3xl" to="/login">Login</Link>
      </li>
      <li>
        <Link className="px-[35px] py-[15px] bg-[#FFF4DF] text-[#F6B83D] rounded-3xl" to="/register">Registration</Link>
      </li>
    </ul>
  );
};

export default AuthNav;