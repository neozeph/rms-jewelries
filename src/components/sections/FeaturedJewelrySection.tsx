import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import JewelryCard from "../../features/jewelry/components/JewelryCard";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import {
  getFeaturedPublishedJewelry,
  type Jewelry,
} from "../../repositories/jewelryRepository";

type LoadStatus = "loading" | "success" | "error";

const SKELETON_COUNT = 4;

export default function FeaturedJewelrySection() {
  const [jewelry, setJewelry] = useState<Jewelry[]>([]);
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [retryToken, setRetryToken] = useState(0);
  const { ref: headingRef, isVisible: isHeadingVisible } =
    useScrollReveal<HTMLDivElement>();
  const { ref: gridRef, isVisible: isGridVisible } =
    useScrollReveal<HTMLUListElement>();

  useEffect(() => {
    let isActive = true;

    getFeaturedPublishedJewelry()
      .then((data) => {
        if (!isActive) return;
        setJewelry(data);
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

  if (status === "success" && jewelry.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="featured-jewelry-heading"
      className="py-20 lg:py-28"
    >
      <Container>
        <div
          ref={headingRef}
          className={`reveal flex flex-wrap items-end justify-between gap-6 ${isHeadingVisible ? "is-visible" : ""}`}
        >
          <SectionHeading
            id="featured-jewelry-heading"
            eyebrow="Selected Pieces"
            title="Featured jewelry"
            description="A closer look at individual pieces from across our collections."
          />

          <Link
            to="/collections"
            className="text-sm font-medium text-rms-charcoal underline underline-offset-4 transition-colors hover:text-rms-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rms-ivory"
          >
            View all collections
          </Link>
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
                We couldn&apos;t load featured jewelry right now. Please try
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

          {status === "success" && jewelry.length > 0 && (
            <ul
              ref={gridRef}
              className={`reveal-stagger grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 ${isGridVisible ? "is-visible" : ""}`}
            >
              {jewelry.map((item) => (
                <li key={item.id}>
                  <JewelryCard jewelry={item} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
