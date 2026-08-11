import { useEffect, useState } from "react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import CollectionCard from "../../features/collections/components/CollectionCard";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import {
  getPublishedCollections,
  type Collection,
} from "../../repositories/collectionRepository";

type LoadStatus = "loading" | "success" | "error";

const SKELETON_COUNT = 4;

export default function FeaturedCollectionsSection() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [retryToken, setRetryToken] = useState(0);
  const { ref: headingRef, isVisible: isHeadingVisible } =
    useScrollReveal<HTMLDivElement>();
  const { ref: gridRef, isVisible: isGridVisible } =
    useScrollReveal<HTMLUListElement>();

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

  const featuredCollections = collections.filter(
    (collection) => collection.is_featured,
  );
  const displayCollections =
    featuredCollections.length > 0 ? featuredCollections : collections;

  return (
    <section
      aria-labelledby="featured-collections-heading"
      className="py-20 lg:py-28"
    >
      <Container>
        <div
          ref={headingRef}
          className={`reveal ${isHeadingVisible ? "is-visible" : ""}`}
        >
          <SectionHeading
            eyebrow="Collections"
            title="Featured collections"
            description="A curated selection of RMS pieces, each designed around a story worth remembering."
          />
        </div>

        <div className="mt-14">
          {status === "loading" && (
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
                className="mt-5 border border-rms-charcoal/20 px-6 py-2.5 text-sm font-medium text-rms-charcoal transition-colors hover:border-rms-charcoal"
              >
                Try again
              </button>
            </div>
          )}

          {status === "success" && displayCollections.length === 0 && (
            <div className="border border-rms-charcoal/10 px-8 py-16 text-center">
              <p className="text-sm text-rms-muted">
                New collections are on their way. Check back soon.
              </p>
            </div>
          )}

          {status === "success" && displayCollections.length > 0 && (
            <ul
              ref={gridRef}
              className={`reveal-stagger grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 ${isGridVisible ? "is-visible" : ""}`}
            >
              {displayCollections.map((collection) => (
                <li key={collection.id}>
                  <CollectionCard collection={collection} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
