import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/ui/Container";
import JewelryCard from "../features/jewelry/components/JewelryCard";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  getPublishedCollectionBySlug,
  type Collection,
} from "../repositories/collectionRepository";
import {
  getPublishedJewelryByCollection,
  type Jewelry,
} from "../repositories/jewelryRepository";

type PageStatus = "loading" | "not-found" | "error" | "success";

const SKELETON_COUNT = 6;

export default function CollectionDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [status, setStatus] = useState<PageStatus>("loading");
  const [collection, setCollection] = useState<Collection | null>(null);
  const [jewelry, setJewelry] = useState<Jewelry[]>([]);
  const [retryToken, setRetryToken] = useState(0);

  useDocumentTitle(
    collection ? `${collection.name} — RMS Jewelries` : "Collections — RMS Jewelries",
  );

  useEffect(() => {
    let isActive = true;

    async function load() {
      if (!slug) {
        setStatus("not-found");
        return;
      }

      try {
        const foundCollection = await getPublishedCollectionBySlug(slug);

        if (!isActive) return;

        if (!foundCollection) {
          setStatus("not-found");
          return;
        }

        const jewelryItems = await getPublishedJewelryByCollection(
          foundCollection.id,
        );

        if (!isActive) return;

        setCollection(foundCollection);
        setJewelry(jewelryItems);
        setStatus("success");
      } catch {
        if (isActive) setStatus("error");
      }
    }

    load();

    return () => {
      isActive = false;
    };
  }, [slug, retryToken]);

  return (
    <main>
      <section aria-labelledby="collection-heading" className="py-20 lg:py-28">
        <Container>
          {status === "loading" && (
            <div role="status" aria-live="polite">
              <span id="collection-heading" className="sr-only">
                Loading collection…
              </span>

              <div aria-hidden="true">
                <div className="max-w-2xl">
                  <div className="h-3 w-24 animate-pulse bg-black/5" />
                  <div className="mt-4 h-10 w-2/3 animate-pulse bg-black/5" />
                  <div className="mt-5 h-4 w-full max-w-md animate-pulse bg-black/5" />
                </div>

                <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
                  {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                    <div key={index}>
                      <div className="aspect-[4/5] w-full animate-pulse bg-black/5" />
                      <div className="mt-5 h-5 w-2/3 animate-pulse bg-black/5" />
                      <div className="mt-3 h-4 w-1/2 animate-pulse bg-black/5" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {status === "not-found" && (
            <div className="border border-rms-charcoal/10 px-8 py-16 text-center">
              <h1
                id="collection-heading"
                className="font-display text-3xl font-medium text-rms-charcoal"
              >
                Collection not found
              </h1>
              <p className="mt-3 text-sm text-rms-muted">
                This collection may have been renamed or is no longer published.
              </p>
              <Link
                to="/collections"
                className="mt-6 inline-block border border-rms-charcoal/20 px-6 py-2.5 text-sm font-medium text-rms-charcoal transition-colors hover:border-rms-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rms-ivory"
              >
                Back to collections
              </Link>
            </div>
          )}

          {status === "error" && (
            <div
              role="alert"
              className="border border-rms-charcoal/10 px-8 py-16 text-center"
            >
              <span id="collection-heading" className="sr-only">
                Error loading collection
              </span>
              <p className="text-sm text-rms-muted">
                We couldn&apos;t load this collection right now. Please try
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

          {status === "success" && collection && (
            <>
              <div className="max-w-2xl">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-rms-muted">
                  Collection
                </p>
                <h1
                  id="collection-heading"
                  className="mt-3 font-display text-4xl font-medium tracking-tight text-rms-charcoal sm:text-5xl"
                >
                  {collection.name}
                </h1>
                {collection.description && (
                  <p className="mt-5 text-base leading-7 text-rms-muted">
                    {collection.description}
                  </p>
                )}
              </div>

              <div className="mt-14">
                <h2 id="collection-jewelry-heading" className="sr-only">
                  Jewelry in this collection
                </h2>

                {jewelry.length === 0 ? (
                  <div className="border border-rms-charcoal/10 px-8 py-16 text-center">
                    <p className="text-sm text-rms-muted">
                      New pieces for this collection are on their way. Check
                      back soon.
                    </p>
                  </div>
                ) : (
                  <ul
                    aria-labelledby="collection-jewelry-heading"
                    className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4"
                  >
                    {jewelry.map((item) => (
                      <li key={item.id}>
                        <JewelryCard jewelry={item} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </Container>
      </section>
    </main>
  );
}
