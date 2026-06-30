# Z. Axl's Dig Yard — Technical Overview
**Version:** June 2026  
**Live site:** https://zaxls-dig-yard.vercel.app  
**Repository:** https://github.com/lcamps88/-Z.-Axl-s-Dig-Yard

---

## 1. What This Document Covers

This document describes how the Z. Axl's Dig Yard website is built, what each part does, and how the team manages content and deploys changes. It is written for people who are familiar with websites but not necessarily with the specific technologies used.

---

## 2. Tech Stack at a Glance

| Layer | Tool | Purpose |
|-------|------|---------|
| Framework | Next.js 16 (App Router) | Pages, routing, server/client rendering |
| Styling | Tailwind CSS | All visual design — colors, spacing, layout |
| CMS | Sanity v3 | Blog posts, events, FAQs, gallery, testimonials |
| Database / Auth | Supabase | User accounts, member portal, session management |
| Payments | Stripe *(pending setup)* | Membership subscriptions, event ticketing |
| Hosting | Vercel | Auto-deploys from GitHub on every push to `main` |
| Fonts | Google Fonts | Quicksand (UI labels, nav, buttons), Pacifico (script headings), Poppins/Nunito (body copy) |

---

## 3. How the Site is Structured

```
app/
├── page.tsx                        → Homepage
├── our-mission/                    → About / Mission page
├── the-yard/                       → Why The Yard (with anchor sections)
├── science-of-play/                → The science behind the experience
├── plan-your-visit/                → Visit info, hours, location
├── play-options/                   → Membership tiers & pricing
├── programming/                    → Events calendar
│   └── [slug]/                     → Individual event detail page
├── celebrations/
│   ├── special-events/             → Ticketed special events
│   ├── birthdays/                  → Birthday party packages
│   └── birthday-faqs/             → Birthday-specific FAQs
├── blog/                           → Blog post listing
│   └── [slug]/                     → Individual blog post
├── gallery/                        → Photo gallery grouped by category
├── faqs/                           → General FAQs with category filter
├── testimonials/                   → Family testimonials
├── contact/                        → Contact form
├── portal/                         → Member dashboard (Supabase auth required)
├── login/                          → Login / sign-up page
├── studio/[[...tool]]/             → Sanity Studio (content editing)
├── api/
│   ├── contact/                    → Handles contact form submissions
│   ├── faqs/                       → Serves FAQ data to the FAQs page
│   └── stripe/webhook/             → Stripe webhook handler (membership events)
└── auth/callback/                  → Supabase OAuth callback
```

---

## 4. Content Management (Sanity CMS)

### How to Access
There are two ways to edit content:

1. **Embedded Studio** (at `/studio` on the live site or localhost)  
   `https://zaxls-dig-yard.vercel.app/studio`  
   > **Note:** Image uploads require the Vercel domain to be whitelisted in Sanity's CORS settings. Until that is configured, upload images from the Sanity dashboard instead.

2. **Sanity Dashboard** (always works)  
   `https://www.sanity.io` → sign in → Z. Axl's Dig Yard project

### Content Types

#### Blog Post
Fields: Title, Slug, Author, Published Date, Excerpt, Main Image, Body (rich text)  
Appears on: `/blog` (listing) and `/blog/[slug]` (detail)

#### Author
Fields: Name, Bio, Profile Image  
Used by: Blog posts (referenced)

#### Event
Fields: Title, Slug, Short Description, Full Description (rich text), Event Date, Image, Price (USD), Max Capacity, Members Only toggle, Stripe Payment Link  
Appears on: `/programming`, `/celebrations/special-events`, `/programming/[slug]`

**Button logic on event pages:**
- If event has a Stripe Payment Link → button links to Stripe checkout
- If event is free (price = $0) → button says "Book Now — Free" → goes to contact form pre-filled
- If event is paid but no Stripe link yet → button says "Book Now — $XX" → goes to contact form pre-filled
- If event is Members Only and user is NOT logged in → button is locked, shows "Become a Member" / "Sign In"

#### Testimonial
Fields: Name, Quote, Star Rating (1–5), Child Age  
Appears on: `/testimonials`

#### FAQ
Fields: Question, Answer, Category (general / visit / memberships / birthdays), Sort Order  
Appears on: `/faqs` with tab filter by category

#### Gallery
Fields: Title, Image, Caption, Category (yard / birthdays / events / art)  
Appears on: `/gallery` grouped by category

---

## 5. Authentication & Members (Supabase)

Authentication is handled by **Supabase** using email/password. Google OAuth is prepared but not yet activated.

### How It Works

1. User visits `/login` → enters email & password
2. Supabase creates a session cookie
3. The site checks this cookie on protected pages (e.g., `/portal`)
4. Members-only event buttons check login status server-side on every page load

### Member Portal (`/portal`)
Requires login. Currently shows the member's dashboard. Full membership benefit display will be wired once Stripe is active.

### How the Site Checks Auth
Server components (pages that run on the server) call:
```ts
const supabase = await createClient(); // lib/supabase/server.ts
const { data: { user } } = await supabase.auth.getUser();
```
This reads the session from the request cookie — no client-side JS needed for the auth check.

---

## 6. Payments (Stripe — Pending Full Setup)

Stripe is configured in the code but **not yet active** because the Stripe account has not been created.

### What Needs to Happen
1. Create a Stripe account at stripe.com
2. Create the 6 membership products in Stripe and copy the price IDs
3. Add these environment variables in Vercel:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `STRIPE_PRICE_FREQUENT_FAMILY`
   - `STRIPE_PRICE_WEEKDAY_FAMILY`
   - `STRIPE_PRICE_WEEKEND_FAMILY`
   - `STRIPE_PRICE_FREQUENT_SINGLE`
   - `STRIPE_PRICE_WEEKDAY_SINGLE`
   - `STRIPE_PRICE_WEEKEND_SINGLE`
   - `STRIPE_PRICE_DROP_IN`
4. Register the webhook at `https://zaxls-dig-yard.vercel.app/api/stripe/webhook`

### Membership Tiers (defined in `/app/play-options/page.tsx`)
| Tier | Audience |
|------|----------|
| Frequent Family | Families, unlimited visits |
| Weekday Family | Families, weekday sessions |
| Weekend Family | Families, weekend sessions |
| Frequent Single | Single adult+child, unlimited |
| Weekday Single | Single adult+child, weekdays |
| Weekend Single | Single adult+child, weekends |
| Drop-In | No membership, pay per session |

---

## 7. Navbar Structure

The navigation uses a **floating gold pill** design. Items are split left and right of a centered logo.

| Left Side | Right Side |
|-----------|-----------|
| Home | Resources ▼ (Blog, Gallery, Testimonials, FAQs) |
| Our Mission | Memberships |
| Why The Yard ▼ | Contact |
| Plan Your Visit | Membership Portal button |
| Play & Celebrations ▼ | |

The logo is always centered using a CSS 3-column grid (`1fr auto 1fr`).

---

## 8. Deployment Pipeline

```
Developer edits code locally
        ↓
git push origin main
        ↓
GitHub receives the push
        ↓
Vercel auto-triggers a build (usually 2–3 minutes)
        ↓
If build passes → new version goes live automatically
If build fails → previous version stays live, Vercel sends a notification
```

**To deploy a change:** simply push to the `main` branch. No manual deployment step is needed.

### Environment Variables
Sensitive keys (Supabase, Stripe, Sanity tokens) are stored in:
- **Local development:** `.env.local` (never committed to git)
- **Production:** Vercel Dashboard → Project Settings → Environment Variables

---

## 9. How Each Page Gets Its Data

| Page | Data Source | Fetch Method |
|------|-------------|-------------|
| `/blog` | Sanity | Server component — fetches at request time |
| `/blog/[slug]` | Sanity | Server component — fetches single post by slug |
| `/gallery` | Sanity | Server component |
| `/testimonials` | Sanity | Server component |
| `/faqs` | Sanity via `/api/faqs` | Client component — fetches from internal API route |
| `/programming` | Sanity | Server component — only shows future events |
| `/programming/[slug]` | Sanity | Server component — full event detail |
| `/celebrations/special-events` | Sanity | Server component — same event data |
| `/contact` | N/A (form) | Submits to `/api/contact` |
| `/portal` | Supabase | Server component — requires authenticated session |

**Important:** Sanity's CDN caches responses for a few minutes. After saving content in Sanity Studio, allow 1–2 minutes before the change appears on the live site.

---

## 10. Contact Form Behavior

The contact form at `/contact` handles two types of inquiries:

1. **General inquiries** — User selects an inquiry type and writes a message freely
2. **Event registration** — When there is no Stripe payment link for a paid event, the "Book Now" button links to `/contact?type=Special+Events&event=[Event Name]`. The form pre-fills with:
   - Inquiry Type: "Special Events"
   - Message: "I'd like to register for: [Event Name]"

Inquiry types available: General Question, Membership Inquiry, Birthday Party Inquiry, Special Events, Private Hire, Other.

---

## 11. Pending Items (Before Launch)

| Item | Status | Who / How |
|------|--------|-----------|
| Stripe account setup | ⏳ Not started | Create account, add 6 price IDs to Vercel env vars |
| Stripe webhook registration | ⏳ Awaiting Stripe | Register at `/api/stripe/webhook` in Stripe dashboard |
| Google OAuth | ⏳ Not started | Google Cloud Console → Supabase Auth settings → set env var |
| Hero background photo | ⏳ Needs photo | Place image at `/public/images/hero-bg.jpg` |
| Real gallery photos | ⏳ Needs photos | Upload via Sanity Studio (after CORS fix) or sanity.io |
| Sanity Studio CORS fix | ⏳ 2-min fix | Add `https://zaxls-dig-yard.vercel.app` to CORS at manage.sanity.io/projects/itkt3gf0/api |
| Custom domain | ⏳ Not connected | Connect `zaxlsdigyard.com` in Vercel → Domains settings |
| Social media links | ⏳ Placeholder | Update Instagram/Facebook URLs in `components/Footer.tsx` |

---

## 12. Key Files Reference

| File | What It Does |
|------|-------------|
| `components/Navigation.tsx` | The entire navbar — desktop pill + mobile drawer |
| `components/Footer.tsx` | Footer with links, contact info, social icons |
| `lib/sanity/client.ts` | Sanity client configuration |
| `lib/sanity/queries.ts` | All GROQ queries (getPosts, getEvents, getFAQs, etc.) |
| `lib/supabase/server.ts` | Supabase server-side client (used in server components) |
| `lib/supabase/client.ts` | Supabase client-side client (used in client components) |
| `sanity/schemas/` | Content type definitions (event, post, faq, gallery, etc.) |
| `sanity.config.ts` | Sanity Studio configuration |
| `tailwind.config.ts` | Design tokens — colors, fonts, spacing |
| `app/layout.tsx` | Root layout — fonts, global providers, navigation |
| `middleware.ts` | Supabase session refresh on every request |

---

## 13. Design Tokens (Brand Colors)

Defined in `tailwind.config.ts`:

| Token | Hex | Used For |
|-------|-----|---------|
| `nav-gold` | `#F1C872` | Navbar pill, CTA buttons |
| `nav-text` | `#4B4B4B` | Navbar labels |
| `forest` | (dark green) | Primary buttons, icons |
| `lavender` | `#C4B5ED` | Secondary CTA, accents |
| `dusk` | (dark navy) | Headings, body text |
| `mist` | (light gray-blue) | Section backgrounds |

Fonts: `font-quicksand` (navigation, labels, buttons), `font-script` (Pacifico — decorative headings), `font-body` (Nunito — paragraph text).

---

*Document generated June 2026. For questions contact the development team.*
