import { NavLink, useNavigate } from "react-router-dom";

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
    <header className="h-16 flex items-center justify-between px-6 shadow-md bg-white mb-8">
      <div className="flex items-center gap-4">
        <span className="text-2xl font-bold text-gray-800">Studolio</span>
      </div>

      <nav className="hidden md:flex gap-6">
        {navLinks.map((navItem, index) => (
          <NavLink
            key={index}
            to={navItem.link}
            className={({ isActive }) =>
              `text-lg font-medium hover:text-gray-500 ${isActive ? "underline underline-offset-4" : ""
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
