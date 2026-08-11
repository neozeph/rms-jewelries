# RMS Jewelries

A custom jewelry portfolio and inquiry website for RMS Jewelries (Pandi, Bulacan, Philippines). Visitors browse jewelry collections and submit inquiries about a piece or a custom commission; there is no cart, checkout, or online payment.

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/)
- [React Router v7](https://reactrouter.com/) for routing
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`) for styling
- [Supabase](https://supabase.com/) (PostgreSQL + Row Level Security + Storage) as the backend
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for form state and validation

## Project Structure

```
src/
  components/
    layout/       Site chrome: Navbar, Footer, SiteLayout
    sections/      Homepage sections (hero, featured collections, etc.)
    ui/            Small shared UI primitives (Container, SectionHeading, ...)
  features/
    collections/   Collection-specific components
    jewelry/       Jewelry-specific components and helpers
  hooks/           Shared hooks (e.g. useDocumentTitle)
  lib/supabase/    Supabase client setup
  pages/           Route-level page components
  repositories/    All Supabase access goes through here — pages/components
                    never call Supabase directly
  routes/          Route table (AppRoute.tsx)

supabase/
  migrations/      Numbered, sequential SQL migrations (source of truth for schema)

docs/qa/           Manual QA test plans, test cases, and bug reports
```

Data access follows a repository pattern: every Supabase query or mutation lives in `src/repositories/`, and pages/components call those functions rather than importing the Supabase client directly.

## Getting Started

### Prerequisites

- Node.js 20+
- A Supabase project (or the [Supabase CLI](https://supabase.com/docs/guides/cli) for local development)

### Setup

```bash
npm install
```

Create a `.env.local` file in the project root with your Supabase project credentials:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

These are the public URL and anon (public) key from your Supabase project's API settings — safe to expose to the browser, since all data access is governed by Row Level Security policies (see [Database](#database) below).

### Scripts

| Command           | Description                                    |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Start the Vite dev server                      |
| `npm run build`   | Type-check (`tsc -b`) and build for production |
| `npm run lint`    | Run ESLint                                     |
| `npm run preview` | Preview the production build locally           |

## Database

Schema and policy changes are managed as sequential, numbered SQL migrations in `supabase/migrations/`. Each migration is applied in order and is the source of truth for the database schema — there is no ORM.

To apply migrations to a linked Supabase project using the CLI:

```bash
npx supabase link --project-ref your-project-ref
npx supabase db push --linked
```

Every publicly writable table (`customers`, `inquiries`, `consultations`) has Row Level Security enabled with tightly scoped `INSERT`-only policies for the `anon`/`authenticated` roles — public visitors can submit an inquiry but cannot read, update, or delete any row. The inquiry submission flow (customer + inquiry creation) runs through a single Postgres function (`create_inquiry`, see `009_create_inquiry_function.sql`) called via RPC, so both inserts succeed or fail together instead of risking a partially-written inquiry.

**Note:** when a new migration changes an RPC function or table the frontend depends on, apply the migration before (or together with) deploying the corresponding code change — the site talks directly to whatever schema is currently live.

## Deployment

This is a static Vite build (`npm run build` outputs to `dist/`) that talks to Supabase directly from the browser — it can be deployed to any static host (Vercel, Netlify, Cloudflare Pages, etc.). Set the same `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` environment variables in the host's build configuration.
