import { NavLink, useNavigate } from "react-router";

interface HeaderProps {
  navLinks: {
    link: string;
    label: string;
  }[];
}

export function Header({ navLinks }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };
  return (
    <header className="h-16 flex items-center justify-between px-6 shadow-md">
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold">Studolio</span>
      </div>

      <nav className="hidden md:flex gap-6">
        {navLinks.map((navItem, index) => (
          <NavLink
            key={index}
            to={navItem.link}
            className={({ isActive }) =>
              `text-lg font-medium hover:text-gray-300 ${
                isActive ? "underline underline-offset-4" : ""
              }`
            }
          >
            {navItem.label}
          </NavLink>
        ))}

        <button
          onClick={handleLogout}
          className="text-lg font-medium text-red-600 hover:text-red-800"
        >
          Déconnexion
        </button>
      </nav>
    </header>
  );
}
