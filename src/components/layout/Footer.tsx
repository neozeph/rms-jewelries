import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-rms-ivory">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="font-display text-2xl">RMS Jewelries</p>

        <p className="mt-3 text-sm text-rms-muted">
          Jewelry crafted around your story.
        </p>

        <p className="mt-8 text-xs text-rms-muted">
          © {new Date().getFullYear()} RMS Jewelries. All rights reserved.
        </p>

        <nav
          aria-label="Legal"
          className="mt-3 flex gap-6 text-xs text-rms-muted"
        >
          <Link
            to="/privacy"
            className="transition-colors hover:text-rms-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-2 focus-visible:ring-offset-rms-ivory"
          >
            Privacy Notice
          </Link>
          <Link
            to="/terms"
            className="transition-colors hover:text-rms-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-2 focus-visible:ring-offset-rms-ivory"
          >
            Terms &amp; Conditions
          </Link>
        </nav>
      </div>
    </footer>
  );
}
