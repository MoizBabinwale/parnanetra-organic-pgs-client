import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-green-700 to-green-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold">Join India's Organic Farming Movement</h2>

        <p className="mt-6 text-lg">Become part of the Participatory Guarantee System today.</p>

        <Link to="/registration" className="inline-block mt-10 bg-yellow-400 text-black px-8 py-4 rounded-full font-bold">
          Register Today
        </Link>
      </div>
    </section>
  );
}
