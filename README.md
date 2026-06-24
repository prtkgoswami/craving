# Craving – AI-Powered Kitchen Router & Macro Assembly Matrix

Craving is a performance-optimized, single-page SaaS utility tool that translates fragmented pantry ingredients into structured, macro-balanced recipe configurations. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4, the platform replaces traditional static content lookups with an intelligent state-driven generation engine optimized for speed, discoverability, and clean engineering.

---

## 🚀 Core Features & Architectural Focus

* **Pantry-to-Recipe State Matrix:** Dynamically ingests variable client-side ingredient tokens and updates UI configurations without layout shifts.
* **Granular Constraint Controls:** Features multi-cuisine array vectoring, immediate vegetarian runtime toggling, and explicit calorie ceiling sliders.
* **IP-Based Distributed Rate Limiting:** Restricts API misuse using Upstash Redis and Upstash Ratelimit to enforce a sliding window of max 3 generations per minute per client IP, preventing billing exploits.
* **Schema-Validated AI Generation:** Integrates OpenAI `gpt-4o-mini` with strict structural JSON Schema responses, enforcing a minimum 60% ingredient density usage check.
* **Continuous Managed Pagination:** Implements a decoupled "Generate More Recipes" handler that stitches new server-validated AI recipe actions into existing layout arrays seamlessly.
* **High-Intent Programmatic SEO & AEO:** Configured with semantic layout blocks, automated internal link structures, and custom JSON-LD software product schema markup to maximize discoverability on conversational answer engines (Perplexity, ChatGPT, Gemini).
* **Interactive Product Feedback Widget:** Embeds an animated feedback button that dynamically parses active client ingredients and directs to a pre-filled Google Form handler.
* **Lightweight Product Telemetry:** Fully instrumented with PostHog to capture precise event streams (`recipe_generated`, `recipe_generation_token_consumed`, and backend error states) with zero bundle bloat.

---

## 🛠 Tech Stack & Engineering Primitives

* **Framework:** Next.js 16 (App Router) & React 19, utilizing modern Client/Server boundary configurations.
* **AI Model Engine:** OpenAI API (`gpt-4o-mini`) via structured outputs.
* **Rate Limiting & Storage:** Upstash Redis & Upstash Ratelimit for stateless edge rate calculations.
* **Language:** TypeScript (Strict Mode) ensuring clean, predictable domain data typing.
* **Styling:** Tailwind CSS v4 using absolute element bounds to eliminate Cumulative Layout Shift (CLS).
* **Icons:** Lucide React for consistent, performant visual markers.
* **Telemetry:** PostHog Product Infrastructure for real-time interaction tracing and token tracking.

---

## 📂 Architecture Overview

```text
src/
├── app/
│   ├── api/
│   │   └── recommendations/
│   │       └── route.ts   # AI recommendation endpoint with rate-limiting & schema parsing
│   ├── privacy/
│   │   └── page.tsx       # Standard product Privacy Policy page
│   ├── sitemap.xml/
│   │   └── route.ts       # Dynamic structural XML sitemap mapping for search engines
│   ├── layout.tsx         # Injects root Metadata, OpenGraph cards, and global stylesheet
│   ├── page.tsx           # Primary workspace dashboard orchestrator & semantic FAQ blocks
│   └── providers.tsx      # Client-side telemetry initialization (PostHog Injection)
├── components/
│   ├── FeedbackButton.tsx # Client-side wiggle feedback widget triggering Google Form links
│   ├── FilterSidebar.tsx  # Interactive constraint collection panel & input handlers
│   ├── RecipeCard.tsx     # Rigid grid layout display unit with inline macro mapping
│   ├── RecipeModal.tsx    # Focus-trapped immersive recipe inspection drawer
│   └── SaaSMitrixFAQ.tsx  # Modular, semantic AEO question-and-answer tracking layout
├── types/
│   └── index.ts           # Shared explicit TypeScript domain definitions
└── utils/
    └── feedback.ts        # Google Forms prefilled URL generator helper

```

---

## 🔧 Installation & Local Setup

### 1. Clone the Repository

```bash
git clone [https://github.com/prtkgoswami/craving.git](https://github.com/prtkgoswami/craving.git)
cd craving

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Configure Local Environment Variables

Create a `.env.local` file in the root of the project directory and supply your respective access credentials:

```text
# AI Generation Model Configurations
OPENAI_API_KEY=sk-your-access-token-string

# Rate Limiting & Storage Configurations
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-database-rest-token

# Production Client-Side Telemetry Parameters
NEXT_PUBLIC_POSTHOG_KEY=phc_your_posthog_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

### 4. Run the Development Server

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) inside your browser to inspect the active application canvas.

---

## 📈 Optimization & Performance Metrics

* **Core Web Vitals:** Fixed-height skeleton loading blocks match live recipe aspect ratios exactly to sustain a clean layout shifts rating.
* **Image Delivery Optimization:** Logo visual components utilize Next.js `priority` loading behaviors, accelerating Largest Contentful Paint (LCP) performance boundaries.
* **Light Bundle Profile:** Decoupled layout segments ensure heavy analytical code runs in background frames without delaying primary paint processing loops.
* **Serverless Edge Performance:** Uses Upstash Redis over REST (rather than heavy TCP pools) to verify client rate limits, keeping execution delays under 30ms.
