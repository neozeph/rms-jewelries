import { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import CollectionCard from "../features/collections/components/CollectionCard";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  getPublishedCollections,
  type Collection,
} from "../repositories/collectionRepository";

type LoadStatus = "loading" | "success" | "error";

const SKELETON_COUNT = 8;

export default function CollectionsPage() {
  useDocumentTitle("Collections — RMS Jewelries");

  const [collections, setCollections] = useState<Collection[]>([]);
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let isActive = true;

    getPublishedCollections()
      .then((data) => {
        if (!isActive) return;
        setCollections(data);
        setStatus("success");
      })
      .catch(() => {
        if (!isActive) return;
        setStatus("error");
      });

    return () => {
      isActive = false;
    };
  }, [retryToken]);

  return (
    <main>
      <section aria-labelledby="collections-heading" className="py-20 lg:py-28">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-rms-muted">
              The Collection
            </p>
            <h1
              id="collections-heading"
              className="mt-3 font-display text-4xl font-medium tracking-tight text-rms-charcoal sm:text-5xl"
            >
              Pieces made to be remembered.
            </h1>
            <p className="mt-5 text-base leading-7 text-rms-muted">
              RMS creates custom jewelry through direct collaboration with
              each client. This portfolio gathers selected pieces by
              collection — a starting point for your own conversation with
              us.
            </p>
          </div>

          <div className="mt-14 border-t border-rms-charcoal/10 pt-14">
            {status === "loading" && (
              <div role="status" aria-live="polite">
                <span className="sr-only">Loading collections…</span>

                <ul
                  aria-hidden="true"
                  className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                    <li key={index}>
                      <div className="aspect-[4/5] w-full animate-pulse bg-black/5" />
                      <div className="mt-5 h-5 w-2/3 animate-pulse bg-black/5" />
                      <div className="mt-3 h-4 w-1/2 animate-pulse bg-black/5" />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {status === "error" && (
              <div
                role="alert"
                className="border border-rms-charcoal/10 px-8 py-16 text-center"
              >
                <p className="text-sm text-rms-muted">
                  We couldn&apos;t load our collections right now. Please try
                  again in a moment.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("loading");
                    setRetryToken((token) => token + 1);
                  }}
                  className="mt-5 border border-rms-charcoal/20 px-6 py-2.5 text-sm font-medium text-rms-charcoal transition-colors hover:border-rms-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rms-ivory"
                >
                  Try again
                </button>
              </div>
            )}

            {status === "success" && collections.length === 0 && (
              <div className="border border-rms-charcoal/10 px-8 py-16 text-center">
                <p className="text-sm text-rms-muted">
                  Our collection is currently being curated. Please check
                  back soon.
                </p>
              </div>
            )}

            {status === "success" && collections.length > 0 && (
              <ul className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
                {collections.map((collection) => (
                  <li key={collection.id}>
                    <CollectionCard collection={collection} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}
