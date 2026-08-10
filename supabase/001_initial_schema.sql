-- ============================================
-- RMS JEWELRIES
-- Initial Database Schema
-- ============================================


-- ============================================
-- COLLECTIONS
-- ============================================

create table collections (
    id uuid primary key default gen_random_uuid(),

    name text not null,
    slug text not null unique,

    description text,
    cover_image_url text,

    is_featured boolean not null default false,
    is_published boolean not null default true,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- ============================================
-- JEWELRY
-- ============================================

create table jewelry (
    id uuid primary key default gen_random_uuid(),

    collection_id uuid
        references collections(id)
        on delete set null,

    name text not null,
    slug text not null unique,

    description text,

    materials text[],

    price_note text,

    is_featured boolean not null default false,
    is_published boolean not null default true,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- ============================================
-- JEWELRY IMAGES
-- ============================================

create table jewelry_images (
    id uuid primary key default gen_random_uuid(),

    jewelry_id uuid not null
        references jewelry(id)
        on delete cascade,

    storage_path text not null,

    alt_text text,

    sort_order integer not null default 0,

    created_at timestamptz not null default now()
);


-- ============================================
-- CUSTOMERS
-- ============================================

create table customers (
    id uuid primary key default gen_random_uuid(),

    full_name text not null,

    email text,
    phone text,
    messenger_name text,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- ============================================
-- SERVICES
-- ============================================

create table services (
    id uuid primary key default gen_random_uuid(),

    name text not null,
    slug text not null unique,

    description text,

    is_featured boolean not null default false,
    is_published boolean not null default true,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- ============================================
-- INQUIRIES
-- ============================================

create table inquiries (
    id uuid primary key default gen_random_uuid(),

    customer_id uuid not null
        references customers(id)
        on delete restrict,

    jewelry_id uuid
        references jewelry(id)
        on delete set null,

    inquiry_type text not null,

    message text not null,

    status text not null default 'new',

    source text,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- ============================================
-- CONSULTATIONS
-- ============================================

create table consultations (
    id uuid primary key default gen_random_uuid(),

    customer_id uuid not null
        references customers(id)
        on delete restrict,

    service_id uuid
        references services(id)
        on delete set null,

    preferred_date date,
    preferred_time text,

    message text,

    status text not null default 'requested',

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- ============================================
-- BLOG POSTS
-- ============================================

create table blog_posts (
    id uuid primary key default gen_random_uuid(),

    title text not null,
    slug text not null unique,

    excerpt text,

    content text not null,

    cover_image_url text,

    author_name text,

    status text not null default 'draft',

    published_at timestamptz,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- ============================================
-- TESTIMONIALS
-- ============================================

create table testimonials (
    id uuid primary key default gen_random_uuid(),

    customer_name text not null,

    content text not null,

    jewelry_type text,

    is_featured boolean not null default false,
    is_published boolean not null default false,

    created_at timestamptz not null default now()
);


-- ============================================
-- BUSINESS PROFILE
-- ============================================

create table business_profile (
    id uuid primary key default gen_random_uuid(),

    business_name text not null,

    tagline text,
    description text,

    email text,
    phone text,

    messenger_url text,
    facebook_url text,
    instagram_url text,

    address text,

    updated_at timestamptz not null default now()
);