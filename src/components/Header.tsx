import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import Nav from "./Nav";
import UserNav from "./UserNav";
import AuthNav from "./AuthNav";
import { selectAuthenticated } from "../redux/auth/selector";
import logo from "../assets/img/logo.png";

const Header = () => {
  const isAuthenticated = useSelector(selectAuthenticated);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-[#F9F9F9]">
        <div className="flex items-center justify-between max-w-5xl mx-auto px-4 py-5">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>

          <div className="hidden md:flex flex-1 justify-center">
            <Nav />
          </div>
          
          {/* Desktop - dokunulmadı */}
          <div className="hidden md:flex items-center justify-center gap-6">
            
            {isAuthenticated ? <UserNav /> : <AuthNav />}
          </div>

          {/* Hamburger - sadece mobil */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] cursor-pointer bg-transparent border-none p-1"
            onClick={() => setMenuOpen(true)}
            aria-label="Menüyü aç"
          >
            <span className="block w-6 h-[2px] bg-gray-700 rounded" />
            <span className="block w-6 h-[2px] bg-gray-700 rounded" />
            <span className="block w-6 h-[2px] bg-gray-700 rounded" />
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`md:hidden fixed inset-0 bg-black/40 z-30 transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[70%] max-w-[320px] bg-white z-40 flex flex-col transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* X butonu */}
        <button
          onClick={() => setMenuOpen(false)}
          className="self-end mt-5 mr-5 bg-transparent border-none cursor-pointer"
          aria-label="Kapat"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Linkler - ortada */}
        <div className="flex-1 flex items-center justify-center">
          <Nav mobile onClose={() => setMenuOpen(false)} />
        </div>

        {/* Auth butonları - en altta */}
        <div className="px-6 pb-10">
          {isAuthenticated ? <UserNav /> : <AuthNav mobile />}
        </div>
      </div>
    </>
  );
};

export default Header;