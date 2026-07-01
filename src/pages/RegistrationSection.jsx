import { Link } from "react-router-dom";
import { FaBuilding, FaUsers, FaLeaf, FaUser, FaClipboardCheck, FaShoppingBasket } from "react-icons/fa";

const cards = [
  {
    title: "Facilitating Agency",
    icon: <FaBuilding />,
  },
  {
    title: "Local Group",
    icon: <FaUsers />,
  },
  {
    title: "Farmer Consumer Group",
    icon: <FaLeaf />,
  },
  {
    title: "Farmer Member",
    icon: <FaUser />,
  },
  {
    title: "Consumer Member",
    icon: <FaShoppingBasket />,
  },
  {
    title: "Check List",
    icon: <FaClipboardCheck />,
  },
];

export default function RegistrationSection() {
  return (
    <section className="py-24 bg-green-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-4xl font-bold text-green-800">Registration Categories</h2>

        <p className="text-center text-gray-600 mt-4">Choose your registration category</p>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-16">
          {cards.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl duration-300 p-8 text-center">
              <div className="text-5xl text-green-700 flex justify-center">{item.icon}</div>

              <h3 className="mt-6 font-bold text-xl">{item.title}</h3>

              <Link to="/registration" className="inline-block mt-8 bg-green-700 text-white px-6 py-3 rounded-full">
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
