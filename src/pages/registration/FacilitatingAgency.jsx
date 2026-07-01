import { Link } from "react-router-dom";
import { FaBuilding, FaLeaf, FaCheckCircle, FaFilePdf, FaArrowRight } from "react-icons/fa";

export default function FacilitatingAgency() {
  return (
    <div className="bg-gray-50">
      {/* Hero Banner */}

      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-green-200 mb-3">Home / Registration / Facilitating Agency</p>

          <h1 className="text-5xl font-bold">Facilitating Agency Registration</h1>

          <p className="mt-6 text-lg max-w-3xl text-green-100">
            Join the Parnanetra Organic Participatory Guarantee System and become an authorized Facilitating Agency to support farmers, local groups and organic certification.
          </p>
        </div>
      </section>

      {/* Description */}

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399" alt="" className="rounded-2xl shadow-xl" />
          </div>

          <div>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-5">
              <FaLeaf />
              Organic PGS
            </div>

            <h2 className="text-4xl font-bold text-green-800 mb-6">Who Can Become a Facilitating Agency?</h2>

            <p className="text-gray-700 leading-8 mb-5">
              Any Person, Firm, Company Pvt./Public, Trust, Co-Operative Society, Government Agency, NGO, Farmer Group or Farmer Producer Company can work as a Facilitating Agency under Parnanetra
              Organic PGS.
            </p>

            <p className="text-gray-700 leading-8">
              Facilitating Agencies are appointed by
              <strong> Parnanetra Organic PGS-NAC </strong>
              based on the recommendation of the Parnanetra Organic PGS Secretariat. Only organizations having proven dedication towards Human-Friendly Agriculture, Organic Farming and Certification
              Systems will be considered.
            </p>
          </div>
        </div>
      </section>

      {/* Eligibility */}

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl text-center font-bold text-green-800">Eligible Organizations</h2>

          <p className="text-center text-gray-600 mt-4">The following organizations can apply.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {["Private Company", "Public Company", "Trust", "NGO", "Government Agency", "Farmer Producer Company", "Farmer Groups", "Co-operative Society", "Any Registered Organization"].map(
              (item, index) => (
                <div key={index} className="bg-green-50 rounded-xl p-6 shadow hover:shadow-xl transition">
                  <FaCheckCircle className="text-green-700 text-3xl mb-4" />

                  <h3 className="font-semibold text-lg">{item}</h3>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Application Forms */}

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-4xl font-bold text-green-800">Application Forms</h2>

          <p className="text-center text-gray-600 mt-4">Download the application form in your preferred language.</p>

          <div className="grid md:grid-cols-2 gap-10 mt-16">
            {/* Hindi */}

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <FaFilePdf className="text-red-600 text-6xl" />

              <h3 className="text-2xl font-bold mt-6">Hindi Application Form</h3>

              <p className="text-gray-600 mt-4">Download the Facilitating Agency Application Form in Hindi.</p>

              <button className="mt-8 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg">Download Hindi Form</button>
            </div>

            {/* Marathi */}

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <FaFilePdf className="text-red-600 text-6xl" />

              <h3 className="text-2xl font-bold mt-6">Marathi Application Form</h3>

              <p className="text-gray-600 mt-4">Download the Facilitating Agency Application Form in Marathi.</p>

              <button className="mt-8 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg">Download Marathi Form</button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}

      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-4xl font-bold text-green-800">Why Become a Facilitating Agency?</h2>

          <div className="grid lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: "Support Farmers",
                desc: "Guide farmers towards sustainable organic farming.",
              },
              {
                title: "Organic Certification",
                desc: "Assist local groups during certification.",
              },
              {
                title: "Training Programs",
                desc: "Conduct awareness and capacity building programs.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow">
                <FaBuilding className="text-green-700 text-4xl mb-5" />

                <h3 className="font-bold text-2xl">{item.title}</h3>

                <p className="text-gray-600 mt-4 leading-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="bg-green-800 text-white py-20">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold">Ready to Join Parnanetra Organic PGS?</h2>

          <p className="mt-6 text-lg text-green-100">Complete your application and become an authorized Facilitating Agency today.</p>

          <Link to="/registration/facilitating-agency/form" className="inline-flex items-center gap-3 mt-10 bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-300">
            Apply Online
            <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
