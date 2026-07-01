import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import hero from "../assets/hero.jpeg";

export default function Hero() {
  return (
    <section
      className="relative h-[92vh] bg-cover bg-center"
      style={{
        backgroundImage: `url(${hero})`,
      }}
    >
      {/* Overlay */}

      <div className="absolute inset-0 bg-black/55"></div>

      {/* Content */}

      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
        <div className="max-w-3xl">
          <motion.h4 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-yellow-300 font-semibold uppercase tracking-widest">
            Welcome to
          </motion.h4>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-7xl font-bold text-white mt-4 leading-tight">
            Parnanetra
            <br />
            Organic PGS
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-white text-lg mt-8 leading-8">
            Join India's Participatory Guarantee System (PGS) for Organic Farming. Connect Farmers, Consumers, Local Groups, NGOs, Facilitating Agencies and Organic Communities on one digital
            platform.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex gap-5 mt-10 flex-wrap">
            <Link to="/registration" className="bg-green-700 hover:bg-green-800 px-8 py-4 rounded-full text-white font-semibold transition">
              Register Now
            </Link>

            <Link to="/about" className="border-2 border-white px-8 py-4 rounded-full text-white hover:bg-white hover:text-green-700 transition">
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}

      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 150" className="w-full fill-white">
          <path d="M0,96L80,90.7C160,85,320,75,480,80C640,85,800,107,960,106.7C1120,107,1280,85,1360,74.7L1440,64L1440,160L0,160Z"></path>
        </svg>
      </div>
    </section>
  );
}
