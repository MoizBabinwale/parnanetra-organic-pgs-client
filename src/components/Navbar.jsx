import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaLeaf, FaUsers, FaUser, FaClipboardCheck, FaShoppingBasket, FaBuilding } from "react-icons/fa";

const registrationItems = [
  {
    title: "Facilitating Agency",
    icon: <FaBuilding />,
    path: "/registration/facilitating-agency",
  },
  {
    title: "Local Group",
    icon: <FaUsers />,
    path: "/registration/local-group",
  },
  {
    title: "Farmer Consumer Group",
    icon: <FaLeaf />,
    path: "/registration/fcg",
  },
  {
    title: "Farmer Member",
    icon: <FaUser />,
    path: "/registration/farmer-member",
  },
  {
    title: "Consumer Member",
    icon: <FaShoppingBasket />,
    path: "/registration/consumer-member",
  },
  {
    title: "Check List",
    icon: <FaClipboardCheck />,
    path: "/registration/check-list",
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="bg-red-500 text-white p-10 text-4xl">Tailwind Working</div>
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="logo" className="w-14 h-14 object-contain" />

            <div>
              <h2 className="font-bold text-xl text-green-700">Parnanetra Organic PGS</h2>

              <p className="text-xs text-gray-500">Participatory Guarantee System</p>
            </div>
          </Link>

          {/* Desktop Menu */}

          <ul className="hidden lg:flex items-center gap-8 font-medium">
            <li>
              <NavLink to="/" className="hover:text-green-700 transition">
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/about" className="hover:text-green-700 transition">
                About
              </NavLink>
            </li>

            {/* Registration */}

            <li className="relative" onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
              <button className="flex items-center gap-2 hover:text-green-700">
                Registration
                <FaChevronDown className={`duration-300 ${dropdown ? "rotate-180" : ""}`} />
              </button>

              {dropdown && (
                <div className="absolute top-12 left-0 w-80 bg-white rounded-xl shadow-xl border overflow-hidden">
                  {registrationItems.map((item) => (
                    <Link key={item.title} to={item.path} className="flex items-center gap-3 px-5 py-4 hover:bg-green-50 transition">
                      <span className="text-green-700 text-lg">{item.icon}</span>

                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <NavLink to="/gallery" className="hover:text-green-700 transition">
                Gallery
              </NavLink>
            </li>

            <li>
              <NavLink to="/downloads" className="hover:text-green-700 transition">
                Downloads
              </NavLink>
            </li>

            <li>
              <NavLink to="/contact" className="hover:text-green-700 transition">
                Contact
              </NavLink>
            </li>

            <button className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800 duration-300">Login</button>
          </ul>

          {/* Mobile Button */}

          <button className="lg:hidden text-2xl" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      {mobileOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t">
          <div className="flex flex-col">
            <NavLink to="/" className="px-5 py-4 border-b">
              Home
            </NavLink>

            <NavLink to="/about" className="px-5 py-4 border-b">
              About
            </NavLink>

            {/* Mobile Registration */}

            <button onClick={() => setMobileDropdown(!mobileDropdown)} className="flex justify-between items-center px-5 py-4 border-b">
              Registration
              <FaChevronDown className={`duration-300 ${mobileDropdown ? "rotate-180" : ""}`} />
            </button>

            {mobileDropdown && (
              <div className="bg-green-50">
                {registrationItems.map((item) => (
                  <Link key={item.title} to={item.path} className="flex items-center gap-3 px-8 py-3 border-b">
                    <span className="text-green-700">{item.icon}</span>

                    {item.title}
                  </Link>
                ))}
              </div>
            )}

            <NavLink to="/gallery" className="px-5 py-4 border-b">
              Gallery
            </NavLink>

            <NavLink to="/downloads" className="px-5 py-4 border-b">
              Downloads
            </NavLink>

            <NavLink to="/contact" className="px-5 py-4 border-b">
              Contact
            </NavLink>

            <div className="p-5">
              <button className="w-full bg-green-700 text-white py-3 rounded-lg">Login</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
