import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllRoutes from "./AllRoutes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <AllRoutes />

      <Footer />
    </BrowserRouter>
  );
}

export default App;
