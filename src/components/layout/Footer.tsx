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
      </div>
    </footer>
  );
}
