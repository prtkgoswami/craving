# Craving – AI-Powered Kitchen Router & Macro Assembly Matrix

Craving is a performance-optimized, single-page SaaS utility tool that translates fragmented pantry ingredients into structured, macro-balanced recipe configurations. Built with Next.js 14, TypeScript, and Tailwind CSS, the platform replaces traditional static content lookups with an intelligent state-driven generation engine optimized for speed, discoverability, and clean engineering.

---

## 🚀 Core Features & Architectural Focus

* **Pantry-to-Recipe State Matrix:** Dynamically ingests variable client-side ingredient tokens and updates UI configurations without layout shifts.
* **Granular Constraint Controls:** Features multi-cuisine array vectoring, immediate vegetarian runtime toggling, and explicit calorie ceiling sliders.
* **High-Intent Programmatic SEO & AEO:** Configured with semantic layout blocks, automated internal link structures, and custom JSON-LD software product schema markup to maximize discoverability on conversational answer engines (Perplexity, ChatGPT, Gemini).
* **Asynchronous Infinite Hydration:** Implements a decoupled "Load More Matches" pagination handler to stitch newly generated server actions into existing UI layouts cleanly.
* **Lightweight Product Telemetry:** Fully instrumented with client-side event listeners to track core value conversion funnels (`recipe_generated`, retention patterns, and backend error states) with zero bundle bloat.

---

## 🛠 Tech Stack & Engineering Primitives

* **Framework:** Next.js 14 (App Router) using Server Component baselines combined with isolated Client-Side state wrappers.
* **Language:** TypeScript (Strict Mode) ensuring clean, predictable data typings.
* **Styling:** Tailwind CSS using absolute element clipping bounds to completely eliminate Cumulative Layout Shift (CLS).
* **Icons:** Lucide React for consistent, performant visual markers.
* **Telemetry:** PostHog Product Infrastructure for instant real-time interaction tracing.

---

## 📂 Architecture Overview

```text
src/
├── app/
│   ├── layout.tsx         # Injects root Metadata, OpenGraph cards, and global stylesheet
│   ├── page.tsx           # Primary workspace dashboard orchestrator & semantic FAQ blocks
│   ├── providers.tsx      # Client-side telemetry initialization (PostHog Injection)
│   └── sitemap.ts         # Automated structural site mapping for search engine crawlers
├── components/
│   ├── FilterSidebar.tsx  # Interactive constraint collection panel & input handlers
│   ├── RecipeCard.tsx     # Rigid grid layout display unit with inline macro mapping
│   ├── RecipeModal.tsx    # Focus-trapped immersive recipe inspection drawer
│   └── SaaSMitrixFAQ.tsx  # Modular, semantic AEO question-and-answer tracking layout
└── types/
    └── index.ts           # Shared explicit TypeScript domain definitions

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

# Production Client-Side Telemetry Parameters
NEXT_PUBLIC_POSTHOG_KEY=phc_your_posthog_project_key
NEXT_PUBLIC_POSTHOG_HOST=[https://us.i.posthog.com](https://us.i.posthog.com)

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
*  Light Bundle Profile: Decoupled layout segments ensure heavy analytical code runs in background frames without delaying primary paint processing loops.
