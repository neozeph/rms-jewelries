import { Routes, Route } from "react-router-dom";

import SiteLayout from "../components/layout/SiteLayout";

import HomePage from "../pages/HomePage";
import CollectionsPage from "../pages/CollectionsPage";
import CollectionDetailPage from "../pages/CollectionDetailPage";
import JewelryDetailPage from "../pages/JewelryDetailPage";
import ServicesPage from "../pages/ServicesPage";
import About from "../pages/About";
import Contact from "../pages/Contact";
import InquiryPage from "../pages/InquiryPage";
import PrivacyPage from "../pages/PrivacyPage";
import TermsPage from "../pages/TermsPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/collections/:slug" element={<CollectionDetailPage />} />
        <Route path="/jewelry/:slug" element={<JewelryDetailPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/inquire" element={<InquiryPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
