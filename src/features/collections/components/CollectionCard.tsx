import { Link } from "react-router-dom";
import type { Collection } from "../../../repositories/collectionRepository";

interface CollectionCardProps {
  collection: Collection;
  fallbackImageUrl?: string;
}

export default function CollectionCard({
  collection,
  fallbackImageUrl,
}: CollectionCardProps) {
  const imageUrl = collection.cover_image_url ?? fallbackImageUrl;
  const isTemporaryImage =
    !collection.cover_image_url || collection.id.startsWith("temporary-");

  return (
    <article>
      <Link
        to={`/collections/${collection.slug}`}
        aria-label={`View the ${collection.name} collection`}
        className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rms-ivory"
      >
        <div className="aspect-[4/5] w-full overflow-hidden border border-rms-charcoal/10 bg-black/5">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={isTemporaryImage ? "" : `${collection.name} collection`}
              aria-hidden={isTemporaryImage ? "true" : undefined}
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
          {collection.name}
        </h3>

        {collection.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-rms-muted">
            {collection.description}
          </p>
        )}

        <span className="mt-4 inline-block text-xs font-medium uppercase tracking-[0.15em] text-rms-charcoal/70 transition-colors duration-300 group-hover:text-rms-gold">
          View collection
        </span>
      </Link>
    </article>
  );
}
