import { Link } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaLeaf, FaUsers, FaCertificate, FaArrowRight } from "react-icons/fa";

export default function Registration() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-green-200 mb-3">Home / Registration</p>

          <h1 className="text-5xl font-bold">Registration Portal</h1>

          <p className="mt-6 text-lg max-w-3xl">Join the Parnanetra Organic PGS Platform and become part of India's trusted organic farming certification network.</p>
        </div>
      </section>

      {/* Login/Register Cards */}

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Register */}

            <div className="bg-white rounded-2xl shadow-xl p-10 text-center hover:shadow-2xl transition">
              <FaUserPlus className="text-6xl text-green-700 mx-auto" />

              <h2 className="text-3xl font-bold mt-6">New Registration</h2>

              <p className="text-gray-600 mt-5 leading-7">Register as a Farmer, Local Group, Facilitating Agency, Consumer, Farmer Producer Company or any eligible organization.</p>

              <Link to="/registration/facilitating-agency" className="inline-flex items-center gap-3 bg-green-700 text-white px-7 py-3 rounded-lg mt-8 hover:bg-green-800">
                Register Now
                <FaArrowRight />
              </Link>
            </div>

            {/* Login */}

            <div className="bg-white rounded-2xl shadow-xl p-10 text-center hover:shadow-2xl transition">
              <FaSignInAlt className="text-6xl text-blue-600 mx-auto" />

              <h2 className="text-3xl font-bold mt-6">Existing User Login</h2>

              <p className="text-gray-600 mt-5 leading-7">Already registered? Login to manage your applications, certificates, inspections and profile.</p>

              <Link to="/login" className="inline-flex items-center gap-3 bg-blue-600 text-white px-7 py-3 rounded-lg mt-8 hover:bg-blue-700">
                Login
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl text-center font-bold text-green-800">Why Register?</h2>

          <p className="text-center text-gray-600 mt-4">Access all PGS services from one platform.</p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-green-50 rounded-xl p-8 text-center shadow">
              <FaLeaf className="text-5xl text-green-700 mx-auto" />

              <h3 className="text-2xl font-semibold mt-5">Organic Farming</h3>

              <p className="mt-4 text-gray-600">Join India's trusted organic farming movement.</p>
            </div>

            <div className="bg-green-50 rounded-xl p-8 text-center shadow">
              <FaUsers className="text-5xl text-green-700 mx-auto" />

              <h3 className="text-2xl font-semibold mt-5">Community Network</h3>

              <p className="mt-4 text-gray-600">Connect with farmers, NGOs and local groups.</p>
            </div>

            <div className="bg-green-50 rounded-xl p-8 text-center shadow">
              <FaCertificate className="text-5xl text-green-700 mx-auto" />

              <h3 className="text-2xl font-semibold mt-5">Certification</h3>

              <p className="mt-4 text-gray-600">Apply for Organic Certification and track your application.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}

      <section className="bg-green-800 py-16 text-center text-white">
        <h2 className="text-4xl font-bold">Start Your Organic Journey Today</h2>

        <p className="mt-5 text-lg text-green-100">Register now and become a part of the Parnanetra Organic PGS community.</p>

        <Link to="/registration/facilitating-agency" className="inline-block mt-8 bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition">
          Get Started
        </Link>
      </section>
    </div>
  );
}
