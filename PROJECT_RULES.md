# FISH.AIR Global Rules

## 1. Internationalization (i18n)
- The application is strictly bilingual: Polish (`pl`) as default, English (`en`) as secondary.
- NEVER hardcode UI text strings in components. 
- Always use `next-intl` and fetch strings from the respective language dictionaries.

## 2. Tech Stack & Database
- Strict usage of PayloadCMS v3.
- Database adapter must be configured for PostgreSQL (Neon/Supabase compatibility).

## 3. Styling & UI
- All components must use Tailwind CSS.
- Strictly adhere to the Shadcn UI component structure.
- Global styles, colors, and border-radiuses must be defined centrally in `tailwind.config.ts` and `globals.css` to act as a single source of truth for the design system.