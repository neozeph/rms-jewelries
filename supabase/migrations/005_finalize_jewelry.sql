-- ============================================
-- RMS JEWELRIES
-- Finalize Jewelry Schema
-- ============================================


-- ============================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;


-- ============================================
-- JEWELRY: ADD FINALIZED COLUMNS
-- ============================================

alter table jewelry
    add column material text,
    add column price_from numeric,
    add column cover_image_url text;


-- ============================================
-- JEWELRY: BACKFILL material FROM materials
-- ============================================

update jewelry
set material = array_to_string(materials, ', ')
where material is null;


-- ============================================
-- JEWELRY: VERIFY material BEFORE ENFORCING NOT NULL
-- ============================================

do $$
declare
    unresolved_count integer;
begin
    select count(*) into unresolved_count
    from jewelry
    where material is null;

    if unresolved_count > 0 then
        raise exception
            'Cannot enforce NOT NULL on jewelry.material: % row(s) still have a null material after backfill from materials',
            unresolved_count;
    end if;
end;
$$;


-- ============================================
-- JEWELRY: ENFORCE FINALIZED CONSTRAINTS
-- ============================================

-- description stays nullable in the finalized model — not altered here.

alter table jewelry
    alter column material set not null,
    alter column collection_id set not null;

alter table jewelry
    alter column is_published set default false;

-- collection_id is now required, so replace the "on delete set null"
-- relationship with one that protects referential integrity instead.
alter table jewelry
    drop constraint jewelry_collection_id_fkey;

alter table jewelry
    add constraint jewelry_collection_id_fkey
    foreign key (collection_id)
    references collections(id)
    on delete restrict;


-- ============================================
-- JEWELRY: DROP SUPERSEDED COLUMNS
-- ============================================

alter table jewelry
    drop column materials,
    drop column price_note;


-- ============================================
-- JEWELRY: UPDATED_AT TRIGGER
-- ============================================
drop trigger if exists set_jewelry_updated_at on jewelry;
create trigger set_jewelry_updated_at
before update on jewelry
for each row
execute function set_updated_at();


-- ============================================
-- JEWELRY: INDEXES
-- ============================================

-- slug already has a unique index from its "unique" constraint (001)

create index idx_jewelry_collection_id
on jewelry (collection_id);

create index idx_jewelry_is_published
on jewelry (is_published)
where is_published = true;
