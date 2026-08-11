-- ============================================
-- RMS JEWELRIES
-- Atomic Inquiry Submission
-- ============================================
--
-- inquiryRepository.ts currently performs two sequential REST inserts
-- (customers, then inquiries) as two separate transactions. If the
-- second insert fails for any reason -- a WITH CHECK violation from
-- 008_harden_public_insert_policies.sql, a dropped connection, a
-- transient network error -- the first insert has already committed,
-- leaving an orphaned customer row with no corresponding inquiry.
--
-- This wraps both inserts in a single plpgsql function, invoked
-- through one RPC call. A plpgsql function body executes inside the
-- same transaction as the calling statement, so if either insert
-- fails, both are rolled back together -- there is no window where a
-- customer row can be created without its inquiry.
--
-- security invoker (the default, made explicit here) means the
-- function runs as the calling role, not its owner. The inserts
-- inside it are still evaluated against the existing RLS policies
-- and their WITH CHECK bounds from 002_rls.sql,
-- 007_customers_insert_policy.sql, and 008_harden_public_insert_policies.sql
-- exactly as if the caller had inserted directly -- this migration
-- changes how the inserts are grouped, not what is allowed through.
--
-- search_path is pinned to prevent a malicious search_path on the
-- calling session from redirecting the unqualified "customers" /
-- "inquiries" table references inside the function body.

create or replace function create_inquiry(
    p_full_name text,
    p_email text,
    p_phone text,
    p_preferred_contact_method text,
    p_message text,
    p_jewelry_id uuid
)
returns uuid
language plpgsql
security invoker
set search_path = public
as $$
declare
    v_customer_id uuid;
    v_inquiry_id uuid;
    v_message text;
begin
    insert into customers (full_name, email, phone)
    values (p_full_name, p_email, p_phone)
    returning id into v_customer_id;

    v_message := case
        when p_preferred_contact_method is not null
            and char_length(btrim(p_preferred_contact_method)) > 0
        then 'Preferred contact method: ' || p_preferred_contact_method || e'\n\n' || p_message
        else p_message
    end;

    insert into inquiries (customer_id, jewelry_id, inquiry_type, message, source)
    values (
        v_customer_id,
        p_jewelry_id,
        case when p_jewelry_id is null then 'general' else 'jewelry_piece' end,
        v_message,
        'website'
    )
    returning id into v_inquiry_id;

    return v_inquiry_id;
end;
$$;


-- Functions are executable by PUBLIC by default. Revoke that and grant
-- only to the two roles PostgREST ever calls this through, matching
-- the same anon/authenticated shape used by every policy above.

revoke all on function create_inquiry(text, text, text, text, text, uuid) from public;
grant execute on function create_inquiry(text, text, text, text, text, uuid) to anon, authenticated;
