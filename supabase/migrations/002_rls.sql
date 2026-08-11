-- ============================================
-- RMS JEWELRIES
-- Row Level Security
-- ============================================


-- ============================================
-- ENABLE RLS
-- ============================================

alter table collections enable row level security;
alter table jewelry enable row level security;
alter table jewelry_images enable row level security;
alter table customers enable row level security;
alter table services enable row level security;
alter table inquiries enable row level security;
alter table consultations enable row level security;
alter table blog_posts enable row level security;
alter table testimonials enable row level security;
alter table business_profile enable row level security;


-- ============================================
-- PUBLIC CONTENT
-- ============================================

create policy "Public can view published collections"
on collections
for select
to anon, authenticated
using (is_published = true);


create policy "Public can view published jewelry"
on jewelry
for select
to anon, authenticated
using (is_published = true);


create policy "Public can view jewelry images"
on jewelry_images
for select
to anon, authenticated
using (
    exists (
        select 1
        from jewelry
        where jewelry.id = jewelry_images.jewelry_id
        and jewelry.is_published = true
    )
);


create policy "Public can view published services"
on services
for select
to anon, authenticated
using (is_published = true);


create policy "Public can view published blog posts"
on blog_posts
for select
to anon, authenticated
using (status = 'published');


create policy "Public can view published testimonials"
on testimonials
for select
to anon, authenticated
using (is_published = true);


create policy "Public can view business profile"
on business_profile
for select
to anon, authenticated
using (true);


-- ============================================
-- PUBLIC INQUIRIES
-- ============================================

create policy "Public can submit inquiries"
on inquiries
for insert
to anon, authenticated
with check (true);


-- ============================================
-- PUBLIC CONSULTATION REQUESTS
-- ============================================

create policy "Public can submit consultations"
on consultations
for insert
to anon, authenticated
with check (true);