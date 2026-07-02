import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="bg-gray-50">
      {/* Hero */}

      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">Contact Us</h1>

          <p className="mt-5 text-lg">We'd love to hear from you.</p>
        </div>
      </section>

      {/* Contact Info */}

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
          {/* Left */}

          <div>
            <h2 className="text-4xl font-bold text-green-800">Parnanetra Organic PGS</h2>

            <p className="text-gray-600 mt-5 leading-8">Feel free to contact us regarding registration, certification, farmer support or any information related to Organic PGS.</p>

            <div className="space-y-8 mt-10">
              <div className="flex items-start gap-5">
                <div className="bg-green-700 text-white p-4 rounded-full">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <h4 className="font-bold text-lg">Office Address</h4>

                  <p className="text-gray-600">
                    PGS Admin Office
                    <br />
                    235 Govt. Press Colony,
                    <br />
                    Dabha, Nagpur - 440023,
                    <br />
                    Maharashtra, INDIA
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="bg-green-700 text-white p-4 rounded-full">
                  <FaPhoneAlt />
                </div>

                <div>
                  <h4 className="font-bold text-lg">Telephone</h4>

                  <p className="text-gray-600">+91 9960186016</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="bg-green-700 text-white p-4 rounded-full">
                  <FaEnvelope />
                </div>

                <div>
                  <h4 className="font-bold text-lg">Email</h4>

                  <p className="text-gray-600">parnanetra.pgs@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Social */}

            <div className="mt-12">
              <h3 className="font-bold text-xl mb-5">Get Social With Us</h3>

              <div className="flex gap-5">
                <a href="https://www.facebook.com/parnanetra" target="_blank" rel="noreferrer" className="bg-blue-600 text-white p-4 rounded-full hover:scale-110 duration-300">
                  <FaFacebookF />
                </a>

                <a href="https://www.facebook.com/parnanetra" className="bg-blue-800 text-white p-4 rounded-full hover:scale-110 duration-300">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>

          {/* Right */}

          <div className="bg-white shadow-xl rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-green-700 mb-8">Send Us a Message</h2>

            <form className="space-y-5">
              <input type="text" placeholder="Full Name" className="w-full border rounded-lg p-4 outline-none focus:border-green-700" />

              <input type="email" placeholder="Email Address" className="w-full border rounded-lg p-4 outline-none focus:border-green-700" />

              <input type="text" placeholder="Phone Number" className="w-full border rounded-lg p-4 outline-none focus:border-green-700" />

              <input type="text" placeholder="Subject" className="w-full border rounded-lg p-4 outline-none focus:border-green-700" />

              <textarea rows="5" placeholder="Write your message..." className="w-full border rounded-lg p-4 outline-none focus:border-green-700"></textarea>

              <button className="bg-green-700 text-white px-8 py-4 rounded-lg hover:bg-green-800 duration-300">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Map */}

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <iframe title="map" src="https://www.google.com/maps?q=Nagpur&t=&z=13&ie=UTF8&iwloc=&output=embed" className="w-full h-[450px] rounded-2xl shadow-xl"></iframe>
        </div>
      </section>
    </div>
  );
}
