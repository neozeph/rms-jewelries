-- ============================================
-- RMS JEWELRIES
-- Fix Inquiry RPC RLS RETURNING Access
-- ============================================
--
-- public.create_inquiry() intentionally remains SECURITY INVOKER so
-- inserts continue to be checked against the public INSERT RLS policies.
-- Public roles have INSERT policies for customers/inquiries, but no
-- SELECT policies. Avoid RETURNING from those inserts by generating the
-- row ids before insertion and returning the locally generated inquiry id.

create or replace function public.create_inquiry(
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
set search_path to 'public'
as $$
declare
    v_customer_id uuid := gen_random_uuid();
    v_inquiry_id uuid := gen_random_uuid();
    v_message text;
begin
    insert into customers (
        id,
        full_name,
        email,
        phone
    )
    values (
        v_customer_id,
        p_full_name,
        p_email,
        p_phone
    );

    v_message := case
        when p_preferred_contact_method is not null
            and char_length(btrim(p_preferred_contact_method)) > 0
        then 'Preferred contact method: ' || p_preferred_contact_method || e'\n\n' || p_message
        else p_message
    end;

    insert into inquiries (
        id,
        customer_id,
        jewelry_id,
        inquiry_type,
        message,
        source
    )
    values (
        v_inquiry_id,
        v_customer_id,
        p_jewelry_id,
        case when p_jewelry_id is null then 'general' else 'jewelry_piece' end,
        v_message,
        'website'
    );

    return v_inquiry_id;
end;
$$;

revoke all on function public.create_inquiry(text, text, text, text, text, uuid) from public;
grant execute on function public.create_inquiry(text, text, text, text, text, uuid) to anon, authenticated;
