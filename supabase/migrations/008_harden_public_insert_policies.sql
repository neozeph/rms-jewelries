-- ============================================
-- RMS JEWELRIES
-- Harden Public INSERT Policies
-- ============================================
--
-- customers, inquiries, and consultations all currently accept public
-- INSERT with `with check (true)` (from 002_rls.sql and
-- 007_customers_insert_policy.sql). That lets a caller bypass the
-- React form entirely and POST directly to the REST API with
-- malformed or abusive data — empty names, absurdly long messages,
-- arbitrary inquiry_type/status values, etc.
--
-- This migration tightens only the WITH CHECK expression on each of
-- the three existing INSERT policies, using ALTER POLICY. It does not
-- change policy names, roles, or command type, and does not touch
-- SELECT/UPDATE/DELETE (no such policies exist for anon on these
-- tables, so those operations remain denied exactly as before).
--
-- Every bound below is set at or above what the current legitimate
-- app flow (InquiryPage.tsx -> inquiryRepository.ts) can actually
-- send, so no valid submission is rejected. See inline notes.


-- ============================================
-- CUSTOMERS
-- ============================================
-- full_name: schema is already NOT NULL, but NOT NULL does not
-- reject '' or whitespace-only. email/phone stay nullable, matching
-- the existing schema -- only bounded when a value is actually
-- provided.

alter policy "Public can submit customer contact info"
on customers
with check (
    char_length(btrim(full_name)) > 0
    and char_length(full_name) <= 200

    and (
        email is null
        or (
            char_length(btrim(email)) > 0
            and char_length(email) <= 254
            and email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'
        )
    )

    and (
        phone is null
        or char_length(phone) <= 30
    )
);


-- ============================================
-- INQUIRIES
-- ============================================
-- message max is 2200, not 2000: the frontend caps the user-entered
-- message at 2000 chars, but inquiryRepository.ts prepends
-- "Preferred contact method: {method}\n\n" before insert -- up to 37
-- extra characters for the longest option. 2200 leaves headroom
-- above the real legitimate max of 2037 without being meaningless.
--
-- inquiry_type is restricted to the exact two literal values the
-- repository ever sends (never user-controlled). status is
-- restricted to 'new', the only value a legitimate insert can
-- produce (the app never sets status explicitly, so it's always the
-- column default at check time) -- this only constrains INSERT,
-- status transitions via UPDATE are untouched.

alter policy "Public can submit inquiries"
on inquiries
with check (
    char_length(btrim(message)) > 0
    and char_length(message) <= 2200

    and inquiry_type in ('general', 'jewelry_piece')

    and status = 'new'

    and (
        source is null
        or char_length(source) <= 50
    )
);


-- ============================================
-- CONSULTATIONS
-- ============================================
-- Not used anywhere in the current app (no repository, no UI), so
-- there is no legitimate baseline to preserve beyond generic bounds.
-- message stays nullable (the schema allows it, unlike
-- inquiries.message) -- only bounded when provided. status is
-- restricted to 'requested', the column's own default and the only
-- value any insert could legitimately produce today.

alter policy "Public can submit consultations"
on consultations
with check (
    status = 'requested'

    and (
        message is null
        or char_length(message) <= 2200
    )

    and (
        preferred_time is null
        or char_length(preferred_time) <= 50
    )
);
