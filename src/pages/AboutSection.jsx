import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399" className="rounded-2xl shadow-xl" alt="" />

        <motion.div initial={{ x: 40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}>
          <h2 className="text-4xl font-bold text-green-800 mb-6">About Parnanetra Organic PGS</h2>

          <p className="text-gray-700 leading-8">
            Parnanetra Organic Participatory Guarantee System (PGS) is an initiative to promote organic farming through local participation, transparency and trust. It connects farmers, local groups,
            NGOs, consumers and facilitating agencies under one certification ecosystem.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
