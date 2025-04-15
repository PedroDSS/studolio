import { NavLink } from "react-router";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "./ui/menubar";
import { Button } from "./ui/button";

export function Header() {
  const navLinks = [
    { link: "/dashboard", label: "Dashboard" },
    { link: "/technos", label: "Technos" },
    { link: "/promotions", label: "Promotions" },
    { link: "/categories", label: "Catégories" },
    { link: "/etudiants", label: "Étudiants" },
    { link: "/projets", label: "Projets" },
  ];

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
      </nav>

      <Menubar className="md:hidden">
        <MenubarMenu>
          <MenubarTrigger>
            <Button variant="secondary">Menu</Button>
          </MenubarTrigger>
          <MenubarContent>
            {navLinks.map((navItem, index) => (
              <MenubarItem key={index}>
                <NavLink
                  to={navItem.link}
                  className={({ isActive }) =>
                    `block w-full text-left ${
                      isActive ? "font-bold text-green-800" : ""
                    }`
                  }
                >
                  {navItem.label}
                </NavLink>
              </MenubarItem>
            ))}
            <MenubarSeparator />
            <MenubarItem>
              <a href="/logout" className="text-red-600">
                Logout
              </a>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      {/* Profile Button */}
      <Button variant="outline" className="hidden md:block">
        Profile
      </Button>
    </header>
  );
}
