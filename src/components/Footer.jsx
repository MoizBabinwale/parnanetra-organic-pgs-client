import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLeaf } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-20">
      {/* Top Footer */}

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About */}

        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-white p-2 rounded-full">
              <FaLeaf className="text-green-700 text-xl" />
            </div>

            <h2 className="text-2xl font-bold">Parnanetra Organic PGS</h2>
          </div>

          <p className="text-green-100 leading-8 text-sm">
            Parnanetra Organic Participatory Guarantee System (PGS) promotes sustainable organic farming by connecting farmers, consumers, local groups, NGOs and facilitating agencies on one trusted
            platform.
          </p>
        </div>

        {/* Quick Links */}

        <div>
          <h3 className="text-xl font-semibold mb-5">Quick Links</h3>

          <ul className="space-y-3">
            <li>
              <Link to="/" className="hover:text-yellow-300">
                Home
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-yellow-300">
                About
              </Link>
            </li>

            <li>
              <Link to="/gallery" className="hover:text-yellow-300">
                Gallery
              </Link>
            </li>

            <li>
              <Link to="/downloads" className="hover:text-yellow-300">
                Downloads
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-yellow-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Registration */}

        <div>
          <h3 className="text-xl font-semibold mb-5">Registration</h3>

          <ul className="space-y-3">
            <li>
              <Link to="/registration/facilitating-agency" className="hover:text-yellow-300">
                Facilitating Agency
              </Link>
            </li>

            <li>
              <Link to="/registration/local-group" className="hover:text-yellow-300">
                Local Group
              </Link>
            </li>

            <li>
              <Link to="/registration/fcg" className="hover:text-yellow-300">
                Farmer Consumer Group
              </Link>
            </li>

            <li>
              <Link to="/registration/farmer-member" className="hover:text-yellow-300">
                Farmer Member
              </Link>
            </li>

            <li>
              <Link to="/registration/consumer-member" className="hover:text-yellow-300">
                Consumer Member
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}

        <div>
          <h3 className="text-xl font-semibold mb-5">Contact Information</h3>

          <div className="space-y-5 text-sm">
            <div className="flex gap-3">
              <FaMapMarkerAlt className="mt-1 text-green-300" />

              <span>
                PGS Admin Office,
                <br />
                235 Govt. Press Colony, Dabha,
                <br />
                Nagpur - 440023, Maharashtra, India.
              </span>
            </div>

            <div className="flex gap-3">
              <FaPhoneAlt className="text-green-300 mt-1" />

              <span>+91 9960186016</span>
            </div>

            <div className="flex gap-3">
              <FaEnvelope className="text-green-300 mt-1" />

              <span>parnanetra.pgs@gmail.com</span>
            </div>
          </div>

          {/* Social */}

          <div className="flex gap-4 mt-8">
            <a href="https://www.facebook.com/parnanetra" target="_blank" rel="noreferrer" className="bg-white text-blue-600 p-3 rounded-full hover:scale-110 duration-300">
              <FaFacebookF />
            </a>

            <a href="#" className="bg-white text-blue-700 p-3 rounded-full hover:scale-110 duration-300">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div className="border-t border-green-700">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-green-200">
          <p>© {new Date().getFullYear()} Parnanetra Organic PGS. All Rights Reserved.</p>

          <p>Designed & Developed by Parnanetra Organic PGS</p>
        </div>
      </div>
    </footer>
  );
}
