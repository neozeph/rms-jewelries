import { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import CollectionCard from "../features/collections/components/CollectionCard";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  getPublishedCollections,
  type Collection,
} from "../repositories/collectionRepository";
import {
  TEMPORARY_FEATURED_COLLECTIONS,
  TEMPORARY_UNSPLASH_IMAGES,
} from "../lib/temporaryImageFallbacks";

type LoadStatus = "loading" | "success" | "error";

const SKELETON_COUNT = 8;

export default function CollectionsPage() {
  useDocumentTitle("Collections — RMS Jewelries");

  const [collections, setCollections] = useState<Collection[]>([]);
  const [status, setStatus] = useState<LoadStatus>("loading");

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
  }, []);

  const presentationCollections =
    collections.length > 0 ? collections : TEMPORARY_FEATURED_COLLECTIONS;

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

            {(status === "success" || status === "error") && (
              <ul className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
                {presentationCollections.map((collection, index) => (
                  <li key={collection.id}>
                    <CollectionCard
                      collection={collection}
                      fallbackImageUrl={
                        TEMPORARY_UNSPLASH_IMAGES.collections[
                          index % TEMPORARY_UNSPLASH_IMAGES.collections.length
                        ]
                      }
                    />
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
