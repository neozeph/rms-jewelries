import { Link } from "react-router-dom";
import type { Jewelry } from "../../../repositories/jewelryRepository";
import { formatPrice } from "../utils/formatPrice";

interface JewelryCardProps {
  jewelry: Jewelry;
}

export default function JewelryCard({ jewelry }: JewelryCardProps) {
  return (
    <article>
      <Link
        to={`/jewelry/${jewelry.slug}`}
        aria-label={`View ${jewelry.name}`}
        className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rms-ivory"
      >
        <div className="aspect-[4/5] w-full overflow-hidden border border-rms-charcoal/10 bg-black/5">
          {jewelry.cover_image_url ? (
            <img
              src={jewelry.cover_image_url}
              alt={jewelry.name}
              loading="lazy"
              width="800"
              height="1000"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div
              className="flex h-full items-center justify-center"
              aria-hidden="true"
            >
              <span className="font-display text-2xl text-rms-muted/50">
                RMS
              </span>
            </div>
          )}
        </div>

        <h3 className="mt-5 font-display text-2xl font-medium text-rms-charcoal transition-colors duration-300 group-hover:text-rms-gold">
          {jewelry.name}
        </h3>

        <p className="mt-2 text-sm uppercase tracking-[0.1em] text-rms-muted">
          {jewelry.material}
        </p>

        {jewelry.price_from !== null && (
          <p className="mt-2 text-sm text-rms-charcoal/80">
            From {formatPrice(jewelry.price_from)}
          </p>
        )}

        <span className="mt-4 inline-block text-xs font-medium uppercase tracking-[0.15em] text-rms-charcoal/70 transition-colors duration-300 group-hover:text-rms-gold">
          View piece
        </span>
      </Link>
    </article>
  );
}
