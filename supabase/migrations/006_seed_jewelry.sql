-- ============================================
-- RMS JEWELRIES
-- Development Seed Data — Jewelry Portfolio
-- ============================================
--
-- Placeholder jewelry content for local development and frontend
-- testing only. These are NOT real RMS products, prices, or images.
-- They exist to exercise the collections -> jewelry relationship and
-- the is_featured / is_published filters until the client supplies
-- the actual portfolio.


-- ============================================
-- JEWELRY
-- ============================================

insert into jewelry (
    collection_id,
    name,
    slug,
    description,
    material,
    price_from,
    cover_image_url,
    is_featured,
    is_published
)
values
(
    (select id from collections where slug = 'wedding-rings'),
    'Elowen Solitaire',
    'elowen-solitaire',
    'A quietly confident solitaire ring, shaped around a single clean line for a lasting everyday presence.',
    '18K Gold, Diamond',
    null,
    null,
    true,
    true
),
(
    (select id from collections where slug = 'wedding-rings'),
    'Marchetti Eternity Band',
    'marchetti-eternity-band',
    'A continuous eternity band with a low, comfortable profile designed to be worn without a second thought.',
    '18K Gold, Diamond',
    null,
    null,
    false,
    true
),
(
    (select id from collections where slug = 'pearl-earrings'),
    'Isabella Pearl Drops',
    'isabella-pearl-earrings',
    'Slender drop earrings pairing a single pearl with a fine gold wire for understated movement.',
    'Freshwater Pearl, 14K Gold',
    null,
    null,
    true,
    true
),
(
    (select id from collections where slug = 'pearl-earrings'),
    'Odette Pearl Studs',
    'odette-pearl-studs',
    'A refined stud silhouette built around a single lustrous pearl, sized for daily wear.',
    'Freshwater Pearl, 14K Gold',
    null,
    null,
    false,
    true
),
(
    (select id from collections where slug = 'signature-necklaces'),
    'Aurora Gemstone Necklace',
    'aurora-gemstone-necklace',
    'A statement pendant necklace centered on a single faceted gemstone, designed to catch the light.',
    '18K Gold, Sapphire',
    null,
    null,
    true,
    true
),
(
    (select id from collections where slug = 'signature-necklaces'),
    'Valentina Sapphire Pendant',
    'valentina-sapphire-pendant',
    'A delicate pendant necklace balancing a compact gemstone setting with a fine cable chain.',
    '18K Gold, Sapphire',
    null,
    null,
    false,
    true
),
(
    (select id from collections where slug = 'fine-bracelets'),
    'Vittoria Gold Bangle',
    'vittoria-gold-bangle',
    'A polished, minimal bangle with a rounded profile meant to be stacked or worn alone.',
    '14K Gold',
    null,
    null,
    true,
    true
),
(
    (select id from collections where slug = 'fine-bracelets'),
    'Noelle Chain Bracelet',
    'noelle-chain-bracelet',
    'A fine curb-chain bracelet with a hidden clasp, designed for everyday layering.',
    '14K Gold',
    null,
    null,
    false,
    true
)
on conflict (slug) do nothing;
