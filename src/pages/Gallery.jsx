import { useState } from "react";
import { FaImages, FaSeedling, FaUsers, FaTractor } from "react-icons/fa";

const galleryData = [
  {
    id: 1,
    title: "Organic Farm Visit",
    category: "Farm",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399",
  },
  {
    id: 2,
    title: "Farmer Training",
    category: "Training",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854",
  },
  {
    id: 3,
    title: "Organic Vegetables",
    category: "Farm",
    image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf",
  },
  {
    id: 4,
    title: "Inspection Visit",
    category: "Inspection",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
  },
  {
    id: 5,
    title: "Organic Fruits",
    category: "Farm",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
  },
  {
    id: 6,
    title: "Group Meeting",
    category: "Meeting",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
  {
    id: 7,
    title: "Farmer Workshop",
    category: "Training",
    image: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95",
  },
  {
    id: 8,
    title: "Organic Farming",
    category: "Farm",
    image: "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0",
  },
];

export default function Gallery() {
  const [active, setActive] = useState("All");

  const categories = ["All", "Farm", "Training", "Inspection", "Meeting"];

  const filtered = active === "All" ? galleryData : galleryData.filter((item) => item.category === active);

  return (
    <div className="bg-gray-50">
      {/* Hero */}

      <section className="bg-gradient-to-r from-green-800 to-green-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FaImages className="mx-auto text-6xl mb-5" />

          <h1 className="text-5xl font-bold">Photo Gallery</h1>

          <p className="mt-5 text-lg max-w-2xl mx-auto">Explore moments from organic farming, farmer training, inspections and PGS events.</p>
        </div>
      </section>

      {/* Categories */}

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-3 rounded-full transition font-semibold
              ${active === cat ? "bg-green-700 text-white" : "bg-white shadow hover:bg-green-100"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery */}

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group">
              <div className="overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-64 object-cover group-hover:scale-110 transition duration-500" />
              </div>

              <div className="p-5">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">{item.category}</span>

                <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics */}

      <section className="bg-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <FaSeedling className="mx-auto text-5xl" />

            <h2 className="text-4xl font-bold mt-4">500+</h2>

            <p>Organic Farms</p>
          </div>

          <div>
            <FaUsers className="mx-auto text-5xl" />

            <h2 className="text-4xl font-bold mt-4">100+</h2>

            <p>Training Programs</p>
          </div>

          <div>
            <FaTractor className="mx-auto text-5xl" />

            <h2 className="text-4xl font-bold mt-4">50+</h2>

            <p>Inspection Visits</p>
          </div>

          <div>
            <FaImages className="mx-auto text-5xl" />

            <h2 className="text-4xl font-bold mt-4">1000+</h2>

            <p>Gallery Images</p>
          </div>
        </div>
      </section>
    </div>
  );
}
