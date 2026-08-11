import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/collections", label: "Collections" },
];

const linkClassName = ({ isActive }: { isActive: boolean }) =>
  `text-rms-charcoal transition-colors hover:text-rms-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rms-ivory ${
    isActive ? "text-rms-gold" : ""
  }`;

const ctaClassName =
  "inline-block bg-rms-charcoal px-5 py-2.5 text-sm font-medium text-rms-ivory transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rms-ivory";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="border-b border-black/10 bg-rms-ivory">
      <div className="mx-auto max-w-7xl px-6">
        <nav
          className="flex items-center justify-between py-5"
          aria-label="Primary navigation"
        >
          <Link
            to="/"
            className="font-display text-2xl font-medium text-rms-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rms-ivory"
          >
            RMS
          </Link>

          <div className="hidden items-center gap-8 text-sm md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={linkClassName}
              >
                {link.label}
              </NavLink>
            ))}

            <Link to="/inquire" className={ctaClassName}>
              Inquire
            </Link>
          </div>

          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center text-rms-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rms-ivory md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className={`absolute h-5 w-5 transition-all duration-200 ${
                isMenuOpen ? "scale-75 opacity-0" : "scale-100 opacity-100"
              }`}
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>

            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className={`absolute h-5 w-5 transition-all duration-200 ${
                isMenuOpen ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </nav>

        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-black/10 pb-6 md:hidden"
          >
            <ul className="flex flex-col gap-1 pt-4 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block py-2 ${linkClassName({ isActive })}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-2">
                <Link to="/inquire" onClick={closeMenu} className={ctaClassName}>
                  Inquire
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
