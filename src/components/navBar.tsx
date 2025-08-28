import { Leaf, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

type NavbarProps = {
  currentPage: string;
  setCurrentPage: (page: string) => void;
};

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const navItems = [
    { id: "home", label: "Home", path: "/dashboard" },
    { id: "opportunities", label: "Opportunities", path: "/opportunities" },
    { id: "news", label: "News", path: "/news" },
    { id: "map", label: "Map", path: "/map" },
    { id: "leaderboard", label: "Hall Of Fame", path: "/hall-of-fame" },
  ];

  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const handleLogout = () => {
    setProfileOpen(false);
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between bg-green-600 text-white px-6 py-4 shadow-md relative">
      <div className="flex items-center space-x-2">
        <Leaf className="h-8 w-8 text-green-200" />
        <div className="text-2xl font-bold tracking-wide">Volcomm.</div>
      </div>

      <ul className="hidden md:flex items-center space-x-6">
        {navItems.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.path}
              onClick={() => setCurrentPage(item.id)}
              className={({ isActive }) =>
                `cursor-pointer transition-colors ${
                  isActive || currentPage === item.id
                    ? "text-yellow-300 font-semibold border-b-2 border-yellow-300"
                    : "hover:text-yellow-200"
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}

        <li className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center space-x-2 hover:text-yellow-200 focus:outline-none"
          >
            <User className="h-6 w-6" />
            <span>{username || "Profile"}</span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg z-10">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg"
              >
                Logout
              </button>
            </div>
          )}
        </li>
      </ul>

      <button className="md:hidden text-2xl focus:outline-none">☰</button>
    </nav>
  );
}
