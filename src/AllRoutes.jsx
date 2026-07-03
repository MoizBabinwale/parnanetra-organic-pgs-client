import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Registration from "./pages/Registration";
import Gallery from "./pages/Gallery";
import Downloads from "./pages/Downloads";
// import Login from "./pages/Login";
import Register from "./pages/Register";
import FacilitatingAgency from "./pages/registration/FacilitatingAgency";
import AvedanPatraForm from "./pages/registration/AvedanPatraForm";
import AvedanPatraAdmin from "./pages/registration/AvedanPatraAdmin";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/downloads" element={<Downloads />} />
      <Route path="/registration" element={<Registration />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/register" element={<Register />} />
      <Route path="/registration/facilitating-agency" element={<FacilitatingAgency />} />
      <Route path="/registration/farmer-member" element={<AvedanPatraForm />} />
      <Route path="/admin/avedan-patra" element={<AvedanPatraAdmin />} />
    </Routes>
  );
}
