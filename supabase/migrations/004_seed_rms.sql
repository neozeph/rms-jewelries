-- ============================================
-- RMS JEWELRIES
-- Development Seed Data
-- ============================================


-- ============================================
-- COLLECTIONS
-- ============================================

insert into collections (
    name,
    slug,
    description,
    is_featured,
    is_published
)
values
(
    'Wedding Rings',
    'wedding-rings',
    'Timeless custom wedding rings crafted around meaningful moments.',
    true,
    true
),
(
    'Pearl Earrings',
    'pearl-earrings',
    'Elegant pearl pieces designed for understated sophistication.',
    true,
    true
),
(
    'Signature Necklaces',
    'signature-necklaces',
    'Statement necklaces featuring carefully selected gemstones.',
    true,
    true
),
(
    'Fine Bracelets',
    'fine-bracelets',
    'Refined bracelets created for everyday elegance.',
    false,
    true
);


-- ============================================
-- JEWELRY
-- ============================================

insert into jewelry (
    collection_id,
    name,
    slug,
    description,
    materials,
    price_note,
    is_featured,
    is_published
)
values
(
    (
        select id
        from collections
        where slug = 'wedding-rings'
    ),
    'Aurelia',
    'aurelia',
    'A refined wedding ring with a timeless silhouette designed for lasting meaning.',
    array['18K Gold', 'Diamond'],
    'Custom quotation',
    true,
    true
),
(
    (
        select id
        from collections
        where slug = 'wedding-rings'
    ),
    'Seraphine',
    'seraphine',
    'A graceful custom wedding ring featuring subtle gemstone detailing.',
    array['18K Gold', 'Diamond'],
    'Custom quotation',
    true,
    true
),
(
    (
        select id
        from collections
        where slug = 'pearl-earrings'
    ),
    'Celeste',
    'celeste',
    'Classic pearl earrings designed with an elegant contemporary profile.',
    array['Freshwater Pearl', '14K Gold'],
    'Custom quotation',
    true,
    true
),
(
    (
        select id
        from collections
        where slug = 'signature-necklaces'
    ),
    'Élan',
    'elan',
    'A sophisticated gemstone necklace designed as a statement heirloom.',
    array['18K Gold', 'Sapphire'],
    'Custom quotation',
    true,
    true
),
(
    (
        select id
        from collections
        where slug = 'signature-necklaces'
    ),
    'Amara',
    'amara',
    'A delicate custom necklace balancing modern form with classic craftsmanship.',
    array['18K Gold', 'Ruby'],
    'Custom quotation',
    true,
    true
),
(
    (
        select id
        from collections
        where slug = 'fine-bracelets'
    ),
    'Noir',
    'noir',
    'A refined bracelet with a minimal silhouette and polished finish.',
    array['14K Gold'],
    'Custom quotation',
    false,
    true
);


-- ============================================
-- SERVICES
-- ============================================

insert into services (
    name,
    slug,
    description,
    is_featured,
    is_published
)
values
(
    'Custom Jewelry',
    'custom-jewelry',
    'Have a piece created specifically around your vision, occasion, and personal style.',
    true,
    true
),
(
    'Jewelry Redesign',
    'jewelry-redesign',
    'Transform an existing piece into something new while preserving its sentimental value.',
    true,
    true
),
(
    'Private Consultation',
    'private-consultation',
    'Discuss your ideas, materials, design preferences, and requirements with RMS.',
    true,
    true
);


-- ============================================
-- TESTIMONIALS
-- ============================================

insert into testimonials (
    customer_name,
    content,
    jewelry_type,
    is_featured,
    is_published
)
values
(
    'Maria & Daniel',
    'The ring was made exactly how we imagined it. Every detail felt personal.',
    'Wedding Ring',
    true,
    true
),
(
    'Patricia',
    'The craftsmanship and attention to detail were exceptional.',
    'Custom Necklace',
    true,
    true
);


-- ============================================
-- BUSINESS PROFILE
-- ============================================

insert into business_profile (
    business_name,
    tagline,
    description
)
values
(
    'RMS Jewelries',
    'Jewelry crafted around your story.',
    'A custom jewelry studio creating thoughtfully designed pieces for meaningful occasions.'
);