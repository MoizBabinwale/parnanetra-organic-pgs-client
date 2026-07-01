import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Registration from "./pages/Registration";
import Gallery from "./pages/Gallery";
import Downloads from "./pages/Downloads";

// Registration Pages
import FacilitatingAgency from "./pages/registration/FacilitatingAgency";

// Temporary Pages
// import LocalGroup from "./pages/registration/LocalGroup";
// import FarmerConsumerGroup from "./pages/registration/FarmerConsumerGroup";
// import FarmerMember from "./pages/registration/FarmerMember";
// import ConsumerMember from "./pages/registration/ConsumerMember";
// import CheckList from "./pages/registration/CheckList";

export default function AllRoutes() {
  return (
    <Routes>
      {/* Main Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/downloads" element={<Downloads />} />
      <Route path="/registration" element={<Registration />} />

      {/* Registration Pages */}
      <Route path="/registration/facilitating-agency" element={<FacilitatingAgency />} />

      {/* Uncomment when pages are created */}

      {/* <Route path="/registration/local-group" element={<LocalGroup />} /> */}

      {/* <Route path="/registration/fcg" element={<FarmerConsumerGroup />} /> */}

      {/* <Route path="/registration/farmer-member" element={<FarmerMember />} /> */}

      {/* <Route path="/registration/consumer-member" element={<ConsumerMember />} /> */}

      {/* <Route path="/registration/check-list" element={<CheckList />} /> */}
    </Routes>
  );
}
