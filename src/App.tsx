function App() {
  return (
    <main className="min-h-screen bg-rms-ivory px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <p className="font-body text-sm uppercase tracking-[0.2em] text-rms-muted">
          RMS Jewelries
        </p>

        <h1 className="mt-6 font-display text-6xl font-medium text-rms-charcoal">
          Jewelry crafted around your story.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-rms-muted">
          Custom jewelry thoughtfully created for the moments that matter.
        </p>

        <button className="mt-10 bg-rms-charcoal px-7 py-3 text-sm font-medium tracking-wide text-rms-ivory transition-opacity hover:opacity-80">
          Explore the collection
        </button>
      </div>
    </main>
  );
}

export default App;
