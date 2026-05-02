import { useSelector } from "react-redux";
import Nav from "./Nav";
import UserNav from "./UserNav";
import AuthNav from "./AuthNav";
import { selectAuthenticated } from "../redux/auth/selector";
import logo from "../assets/img/logo.png";
import { Link } from "react-router";

const Header = () => {
  const isAuthenticated = useSelector(selectAuthenticated);

  return (
    <header className="bg-[#F9F9F9]">
      <div className="flex items-center justify-between max-w-5xl mx-auto px-4 py-5" >
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <Nav />
        {isAuthenticated ? <UserNav /> : <AuthNav />}
      </div>
    </header>
  );
};

export default Header;
