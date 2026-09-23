import { BrowserRouter } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllRoutes from "./AllRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AllRoutes />
        <Footer />
        <SpeedInsights />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
