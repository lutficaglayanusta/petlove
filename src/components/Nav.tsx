import { Link } from "react-router-dom";

interface NavProps {
  mobile?: boolean;
  onClose?: () => void;
}

const Nav = ({ mobile, onClose }: NavProps) => {
  if (mobile) {
    return (
      <nav>
        <ul className="flex flex-col items-center gap-4">
          <li>
            <Link
              onClick={onClose}
              className="block px-[40px] py-[12px] bg-white rounded-3xl border-[1px] border-solid border-gray-300 text-center"
              to="/news"
            >
              News
            </Link>
          </li>
          <li>
            <Link
              onClick={onClose}
              className="block px-[40px] py-[12px] bg-white rounded-3xl border-[1px] border-solid border-gray-300 text-center"
              to="/notices"
            >
              Find pet
            </Link>
          </li>
          <li>
            <Link
              onClick={onClose}
              className="block px-[40px] py-[12px] bg-white rounded-3xl border-[1px] border-solid border-gray-300 text-center"
              to="/friends"
            >
              Our friends
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav>
      <ul className="flex gap-[10px]">
        <li>
          <Link className="px-[20px] py-[15px] bg-white rounded-3xl border-[1px] border-solid border-gray-300" to="/news">News</Link>
        </li>
        <li>
          <Link className="px-4 py-2 bg-white rounded-3xl border-[1px] border-solid border-gray-300" to="/notices">Find pet</Link>
        </li>
        <li>
          <Link className="px-4 py-2 bg-white rounded-3xl border-[1px] border-solid border-gray-300" to="/friends">Our friends</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;