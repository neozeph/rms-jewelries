import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/ui/Container";
import { formatPrice } from "../features/jewelry/utils/formatPrice";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  getPublishedJewelryBySlug,
  type Jewelry,
} from "../repositories/jewelryRepository";
import {
  getPublishedCollections,
  type Collection,
} from "../repositories/collectionRepository";

type PageStatus = "loading" | "not-found" | "error" | "success";

export default function JewelryDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [status, setStatus] = useState<PageStatus>("loading");
  const [jewelry, setJewelry] = useState<Jewelry | null>(null);
  const [collection, setCollection] = useState<Collection | null>(null);
  const [retryToken, setRetryToken] = useState(0);

  useDocumentTitle(
    jewelry ? `${jewelry.name} — RMS Jewelries` : "Jewelry — RMS Jewelries",
  );

  useEffect(() => {
    let isActive = true;

    async function load() {
      if (!slug) return;

      try {
        const foundJewelry = await getPublishedJewelryBySlug(slug);

        if (!isActive) return;

        if (!foundJewelry) {
          setStatus("not-found");
          return;
        }

        const collections = await getPublishedCollections();

        if (!isActive) return;

        const matchedCollection =
          collections.find((c) => c.id === foundJewelry.collection_id) ??
          null;

        setJewelry(foundJewelry);
        setCollection(matchedCollection);
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
      <section aria-labelledby="jewelry-heading" className="py-20 lg:py-28">
        <Container>
          {status === "loading" && (
            <div role="status" aria-live="polite">
              <span id="jewelry-heading" className="sr-only">
                Loading jewelry piece…
              </span>

              <div
                aria-hidden="true"
                className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16"
              >
                <div className="aspect-[4/5] w-full animate-pulse bg-black/5" />

                <div className="flex flex-col justify-center">
                  <div className="h-3 w-28 animate-pulse bg-black/5" />
                  <div className="mt-5 h-10 w-3/4 animate-pulse bg-black/5" />
                  <div className="mt-4 h-4 w-1/3 animate-pulse bg-black/5" />
                  <div className="mt-7 h-4 w-full animate-pulse bg-black/5" />
                  <div className="mt-2 h-4 w-5/6 animate-pulse bg-black/5" />
                  <div className="mt-2 h-4 w-2/3 animate-pulse bg-black/5" />
                  <div className="mt-6 h-5 w-32 animate-pulse bg-black/5" />
                  <div className="mt-9 h-12 w-56 animate-pulse bg-black/5" />
                </div>
              </div>
            </div>
          )}

          {status === "not-found" && (
            <div className="border border-rms-charcoal/10 px-8 py-16 text-center">
              <h1
                id="jewelry-heading"
                className="font-display text-3xl font-medium text-rms-charcoal"
              >
                Jewelry piece not found
              </h1>
              <p className="mt-3 text-sm text-rms-muted">
                This piece may have been renamed or is no longer available.
              </p>
              <Link
                to="/collections"
                className="mt-6 inline-block border border-rms-charcoal/20 px-6 py-2.5 text-sm font-medium text-rms-charcoal transition-colors hover:border-rms-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rms-ivory"
              >
                Back to Collections
              </Link>
            </div>
          )}

          {status === "error" && (
            <div
              role="alert"
              className="border border-rms-charcoal/10 px-8 py-16 text-center"
            >
              <span id="jewelry-heading" className="sr-only">
                Error loading jewelry piece
              </span>
              <p className="text-sm text-rms-muted">
                We couldn&apos;t load this piece right now. Please try again
                in a moment.
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

          {status === "success" && jewelry && (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
              <div className="aspect-[4/5] w-full overflow-hidden bg-black/5">
                {jewelry.cover_image_url ? (
                  <img
                    src={jewelry.cover_image_url}
                    alt={`${jewelry.name}, ${jewelry.material}`}
                    width="1000"
                    height="1250"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className="flex h-full items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="font-display text-4xl text-rms-muted/50">
                      RMS
                    </span>
                  </div>
                )}
              </div>

              <div>
                {collection && (
                  <Link
                    to={`/collections/${collection.slug}`}
                    className="text-xs font-medium uppercase tracking-[0.2em] text-rms-muted transition-colors hover:text-rms-gold"
                  >
                    {collection.name}
                  </Link>
                )}

                <h1
                  id="jewelry-heading"
                  className="mt-3 font-display text-4xl font-medium tracking-tight text-rms-charcoal sm:text-5xl"
                >
                  {jewelry.name}
                </h1>

                <p className="mt-4 text-sm uppercase tracking-[0.1em] text-rms-muted">
                  {jewelry.material}
                </p>

                {jewelry.description && (
                  <p className="mt-7 max-w-lg text-base leading-7 text-rms-muted">
                    {jewelry.description}
                  </p>
                )}

                {jewelry.price_from !== null && (
                  <p className="mt-6 text-lg text-rms-charcoal">
                    From {formatPrice(jewelry.price_from)}
                  </p>
                )}

                <div className="mt-9">
                  <Link
                    to={`/inquire?jewelry=${jewelry.slug}`}
                    className="inline-block bg-rms-charcoal px-7 py-3.5 text-sm font-medium text-rms-ivory transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rms-ivory"
                  >
                    Inquire About This Piece
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
