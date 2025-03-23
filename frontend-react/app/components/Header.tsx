import { useState } from "react";
import { NavLink, Link } from "react-router";
import Menu from "./icons/Menu";
import Close from "./icons/Close";
import Logo from "./icons/Logo";

interface IProps {
  navLinks: {
    link: string;
    label: string;
  }[];
}

export default function Header({ navLinks }: IProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <div className="bg-white w-full h-20 mb-1.5 flex items-center justify-center pt-2">
        <Link to={"/"} className="text-[#001205] hover:text-[#32a852]">
          <Logo height={120} width={120} />
        </Link>
      </div>
      <button
        className="p-2 bg-[#125724] rounded flex items-center top-16 left-2"
        onClick={() => setIsMenuOpen(true)}
      >
        <Menu height={24} width={24} color="#fff" />
      </button>
      <nav
        className={`fixed p-2 top-0 left-0 h-full w-60 transform transition-transform duration-300 flex flex-col items-center gap-4 text-black shadow bg-white ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full flex justify-end">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 bg-[#125724] rounded flex items-center"
          >
            <Close height={24} width={24} color="#fff" />
          </button>
        </div>
        {navLinks.map((navItem, index) => (
          <NavLink
            key={index}
            to={navItem.link}
            className={({ isActive }) =>
              `p-2 text-lg hover:bg-gray-200 hover:text-[#32a852] rounded w-full text-center font-semibold ${
                isActive ? "border-b-2 border-[#125724]" : ""
              }`
            }
          >
            {navItem.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
