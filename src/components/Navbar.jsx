import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaLeaf, FaUsers, FaUser, FaClipboardCheck, FaShoppingBasket, FaBuilding } from "react-icons/fa";
import logo from "../assets/logo.jpg";

const registrationItems = [
  { title: "Facilitating Agency", icon: <FaBuilding />, path: "/registration/facilitating-agency" },
  { title: "Local Group", icon: <FaUsers />, path: "/registration/local-group" },
  { title: "Farmer Consumer Group", icon: <FaLeaf />, path: "/registration/fcg" },
  { title: "Farmer Member", icon: <FaUser />, path: "/registration/farmer-member" },
  { title: "Consumer Member", icon: <FaShoppingBasket />, path: "/registration/consumer-member" },
  { title: "Check List", icon: <FaClipboardCheck />, path: "/registration/check-list" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const navLinkClass = ({ isActive }) => `transition duration-200 ${isActive ? "text-green-700 font-semibold" : "text-gray-700 hover:text-green-700"}`;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Delayed close on mouse leave (prevents flicker)
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setDropdown(false), 150);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdown(true);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="Parnanetra Organic PGS" className="w-12 h-12 object-contain" />
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

            {/* Registration Dropdown — FIXED */}
            <li ref={dropdownRef} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <button onClick={() => setDropdown(!dropdown)} className="flex items-center gap-1.5 text-gray-700 hover:text-green-700 transition py-2">
                Registration
                <FaChevronDown className={`text-sm transition-transform duration-300 ${dropdown ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown with NO gap — sits directly below */}
              {dropdown && (
                <div
                  className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in"
                  onMouseEnter={handleMouseEnter} // Keep open when hovering dropdown
                  onMouseLeave={handleMouseLeave}
                >
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

            <li>
              <button className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800 transition duration-300">Login</button>
            </li>
          </ul>

          {/* Mobile Toggle */}
          <button className="lg:hidden p-2 text-gray-700 hover:text-green-700 transition" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t border-gray-100 animate-slide-down">
          <div className="flex flex-col">
            <NavLink to="/" className="px-5 py-3.5 border-b border-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700 transition" onClick={() => setMobileOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/about" className="px-5 py-3.5 border-b border-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700 transition" onClick={() => setMobileOpen(false)}>
              About
            </NavLink>

            {/* Mobile Registration Dropdown */}
            <button onClick={() => setMobileDropdown(!mobileDropdown)} className="flex justify-between items-center px-5 py-3.5 border-b border-gray-100 text-gray-700 hover:bg-green-50 transition">
              Registration
              <FaChevronDown className={`text-sm transition-transform duration-300 ${mobileDropdown ? "rotate-180" : ""}`} />
            </button>
            {mobileDropdown && (
              <div className="bg-green-50/50">
                {registrationItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.path}
                    className="flex items-center gap-3 px-8 py-3 border-b border-gray-100 text-sm text-gray-700 hover:bg-green-100 hover:text-green-800 transition"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="text-green-600">{item.icon}</span>
                    {item.title}
                  </Link>
                ))}
              </div>
            )}

            <NavLink to="/gallery" className="px-5 py-3.5 border-b border-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700 transition" onClick={() => setMobileOpen(false)}>
              Gallery
            </NavLink>
            <NavLink to="/downloads" className="px-5 py-3.5 border-b border-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700 transition" onClick={() => setMobileOpen(false)}>
              Downloads
            </NavLink>
            <NavLink to="/contact" className="px-5 py-3.5 border-b border-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700 transition" onClick={() => setMobileOpen(false)}>
              Contact
            </NavLink>

            <div className="p-5">
              <button className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition font-medium">Login</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
