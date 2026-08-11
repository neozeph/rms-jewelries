-- ============================================
-- RMS JEWELRIES
-- Storage Policies
-- ============================================

-- Allow public users to view jewelry images
create policy "Public can view jewelry images"
on storage.objects
for select
to anon, authenticated
using (
    bucket_id = 'jewelry-images'
);


-- Only authenticated users can upload jewelry images
create policy "Authenticated users can upload jewelry images"
on storage.objects
for insert
to authenticated
with check (
    bucket_id = 'jewelry-images'
);


-- Only authenticated users can update jewelry images
create policy "Authenticated users can update jewelry images"
on storage.objects
for update
to authenticated
using (
    bucket_id = 'jewelry-images'
)
with check (
    bucket_id = 'jewelry-images'
);


-- Only authenticated users can delete jewelry images
create policy "Authenticated users can delete jewelry images"
on storage.objects
for delete
to authenticated
using (
    bucket_id = 'jewelry-images'
);