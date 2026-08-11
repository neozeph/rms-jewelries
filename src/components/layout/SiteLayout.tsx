import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SiteLayout() {
  return (
    <div className="min-h-screen bg-rms-ivory">
      <Navbar />

      <div>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
