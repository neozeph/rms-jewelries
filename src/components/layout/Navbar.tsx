import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b border-black/10 bg-rms-ivory">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5"
        aria-label="Primary navigation"
      >
        <Link to="/" className="font-display text-2xl font-medium">
          RMS
        </Link>

        <div className="flex items-center gap-8 text-sm">
          <Link to="/collections">Collections</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
