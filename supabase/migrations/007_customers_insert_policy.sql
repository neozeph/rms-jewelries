-- ============================================
-- RMS JEWELRIES
-- Public Inquiry Flow: customers INSERT policy
-- ============================================
--
-- inquiries.customer_id is NOT NULL and references customers(id).
-- 002_rls.sql already lets anon/authenticated INSERT into inquiries
-- and consultations, but never granted any policy on customers itself.
-- With RLS enabled and no matching policy, that insert is denied by
-- default, which made the public inquiry flow impossible end-to-end.
--
-- This adds the same insert-only shape already used for inquiries and
-- consultations: public can create a contact record, but still cannot
-- select, update, or delete customers (no such policy exists for those
-- operations, so RLS continues to deny them).

create policy "Public can submit customer contact info"
on customers
for insert
to anon, authenticated
with check (true);
