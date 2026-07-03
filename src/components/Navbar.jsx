import { useState } from "react";
import { Link, NavLink,  } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaTimes, FaChevronDown, FaLeaf, FaUsers, FaUser, FaClipboardCheck, FaShoppingBasket, FaBuilding, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaTachometerAlt } from "react-icons/fa";

const registrationItems = [
  { title: "Facilitating Agency", icon: <FaBuilding />, path: "/register?category=facilitating_agency" },
  { title: "Local Group", icon: <FaUsers />, path: "/register?category=local_group" },
  { title: "Farmer Consumer Group", icon: <FaLeaf />, path: "/register?category=farmer_consumer_group" },
  { title: "Farmer Member", icon: <FaUser />, path: "/register?category=farmer_member" },
  { title: "Consumer Member", icon: <FaShoppingBasket />, path: "/register?category=consumer_member" },
  { title: "Check List", icon: <FaClipboardCheck />, path: "/registration/check-list" },
];

export default function Navbar() {
  // const navigate = useNavigate();
  const { user, logout, getCategoryLabel, isAdmin } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setUserMenu(false);
  };

  const navLinkClass = ({ isActive }) => `transition duration-200 ${isActive ? "text-green-700 font-semibold" : "text-gray-700 hover:text-green-700"}`;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src="/logo.png" alt="logo" className="w-12 h-12 object-contain" />
            <div>
              <h2 className="font-bold text-lg sm:text-xl text-green-700 leading-tight">Parnanetra Organic PGS</h2>
              <p className="text-xs text-gray-500">Participatory Guarantee System</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium">
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </li>

            {/* Registration Dropdown */}
            <li className="relative" onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
              <button className="flex items-center gap-1.5 text-gray-700 hover:text-green-700 transition py-2">
                Registration
                <FaChevronDown className={`text-sm transition-transform duration-300 ${dropdown ? "rotate-180" : ""}`} />
              </button>
              {dropdown && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                  {registrationItems.map((item) => (
                    <Link key={item.title} to={item.path} className="flex items-center gap-3 px-5 py-3.5 hover:bg-green-50 transition group" onClick={() => setDropdown(false)}>
                      <span className="text-green-600 group-hover:text-green-700 text-lg transition">{item.icon}</span>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-green-800">{item.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <NavLink to="/gallery" className={navLinkClass}>
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink to="/downloads" className={navLinkClass}>
                Downloads
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </li>

            {/* User Auth Section */}
            {user ? (
              <li className="relative" onMouseEnter={() => setUserMenu(true)} onMouseLeave={() => setUserMenu(false)}>
                <button className="flex items-center gap-2 text-green-700 hover:text-green-800 transition">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <FaUser className="text-sm" />
                  </div>
                  <span className="text-sm font-medium">{user.fullName?.split(" ")[0]}</span>
                  <FaChevronDown className={`text-xs transition-transform ${userMenu ? "rotate-180" : ""}`} />
                </button>
                {userMenu && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="px-4 py-3 bg-green-50 border-b">
                      <p className="font-semibold text-gray-800 text-sm">{user.fullName}</p>
                      <p className="text-xs text-gray-500">{getCategoryLabel(user.category)}</p>
                    </div>
                    {isAdmin() && (
                      <Link to="/admin" className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition text-sm text-gray-700">
                        <FaTachometerAlt className="text-green-600" /> Admin Dashboard
                      </Link>
                    )}
                    <Link to="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition text-sm text-gray-700">
                      <FaUser className="text-green-600" /> Profile
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition text-sm text-red-600">
                      <FaSignOutAlt /> Logout (लॉगआउट)
                    </button>
                  </div>
                )}
              </li>
            ) : (
              <li className="flex items-center gap-3">
                <Link to="/login" className="text-green-700 hover:text-green-800 font-medium transition text-sm">
                  Login
                </Link>
                <Link to="/register" className="bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800 transition duration-300 text-sm font-medium flex items-center gap-2">
                  <FaUserPlus /> Register
                </Link>
              </li>
            )}
          </ul>

          {/* Mobile Toggle */}
          <button className="lg:hidden p-2 text-gray-700" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t">
          <div className="flex flex-col">
            <NavLink to="/" className="px-5 py-3.5 border-b text-gray-700" onClick={() => setMobileOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/about" className="px-5 py-3.5 border-b text-gray-700" onClick={() => setMobileOpen(false)}>
              About
            </NavLink>

            <button onClick={() => setMobileDropdown(!mobileDropdown)} className="flex justify-between items-center px-5 py-3.5 border-b text-gray-700">
              Registration <FaChevronDown className={`transition-transform ${mobileDropdown ? "rotate-180" : ""}`} />
            </button>
            {mobileDropdown && (
              <div className="bg-green-50">
                {registrationItems.map((item) => (
                  <Link key={item.title} to={item.path} className="flex items-center gap-3 px-8 py-3 border-b text-sm text-gray-700" onClick={() => setMobileOpen(false)}>
                    <span className="text-green-600">{item.icon}</span> {item.title}
                  </Link>
                ))}
              </div>
            )}

            <NavLink to="/gallery" className="px-5 py-3.5 border-b text-gray-700" onClick={() => setMobileOpen(false)}>
              Gallery
            </NavLink>
            <NavLink to="/downloads" className="px-5 py-3.5 border-b text-gray-700" onClick={() => setMobileOpen(false)}>
              Downloads
            </NavLink>
            <NavLink to="/contact" className="px-5 py-3.5 border-b text-gray-700" onClick={() => setMobileOpen(false)}>
              Contact
            </NavLink>

            {/* Mobile Auth */}
            {user ? (
              <div className="p-5 border-t">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FaUser className="text-green-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user.fullName}</p>
                    <p className="text-xs text-gray-500">{getCategoryLabel(user.category)}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2">
                  <FaSignOutAlt /> Logout (लॉगआउट)
                </button>
              </div>
            ) : (
              <div className="p-5 space-y-3 border-t">
                <Link to="/login" className="block w-full text-center py-3 border-2 border-green-700 text-green-700 rounded-lg hover:bg-green-50 transition" onClick={() => setMobileOpen(false)}>
                  <FaSignInAlt className="inline mr-2" /> Login
                </Link>
                <Link to="/register" className="block w-full text-center bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition" onClick={() => setMobileOpen(false)}>
                  <FaUserPlus className="inline mr-2" /> Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
