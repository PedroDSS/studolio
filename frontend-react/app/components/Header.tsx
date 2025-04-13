import { NavLink } from "react-router";
import { Logo } from "./icons/Logo";

interface IProps {
  navLinks: {
    link: string;
    label: string;
  }[];
}

export function Header({ navLinks }: IProps) {
  return (
    <header className="flex flex-col items-center justify-center">
      <Logo height={120} width={120} />
      <nav className="">
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
