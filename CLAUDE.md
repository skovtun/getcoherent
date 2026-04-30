# Coherent Design Method Project

This is a Coherent Design Method project — AI-powered multi-page UI prototype with shared component system.

## Skill routing (READ FIRST)

When the user asks to **create, generate, add, or build** pages / components / a multi-page
app / UI from a natural-language description — **invoke the `/coherent-chat` skill**.

`/coherent-chat` runs the Coherent phase engine: plan → anchor → extract-style → components → pages,
with shared-component reuse, per-page design constraints, and a validator/auto-fix pass at the
end. Going direct with Write / Edit skips all of that — your pages will look internally OK but
will drift from Header/Footer, the landing, the design tokens, and the navigation manifest.

**Always `/coherent-chat`:** new pages, new components, "create an app with N pages",
regenerations, whole-theme rewrites, changing the design system.

**Never `/coherent-chat` (just edit directly):** typo fixes, copy tweaks in one file, adding
an import, refactoring a single function, debugging a runtime error, reading code.

If in doubt, prefer `/coherent-chat` — wasted skill invocation is cheap; silently bypassing
the phase engine is not (landing stays stale, shared components drift, no consistency check).

## Architecture

- app/ — Next.js App Router pages
- components/ui/ — base shadcn/ui components (Button, Card, Input, etc.)
- components/shared/ — shared reusable blocks with unique IDs (CID-XXX)
- app/design-system/ — platform overlay (DO NOT MODIFY)
- coherent.components.json — shared component manifest
- design-system.config.ts — design tokens and page definitions

## Shared Components (MUST REUSE)

- CID-007 LandingNav (layout) — components/landing-nav.tsx — 1 files
- CID-004 CopyableBlock (widget) — components/copyable-terminal.tsx — 1 files
- CID-003 CopyableInline (widget) — components/copyable-terminal.tsx — 1 files
- CID-006 FloatingSnippets (widget) — components/hero-effects.tsx — 1 files
- CID-005 ParticleDotGrid (widget) — components/hero-effects.tsx — 1 files

Before creating ANY UI block, check if a shared component exists above. If yes — IMPORT it. NEVER recreate inline.

## Rules

- ONLY use @/components/ui/* — never native <button>, <select>, <input type="checkbox">, <table>
- Icons: lucide-react only
- Forms: Label above Input, Switch for toggles, Select for 3+ options
- Colors: semantic tokens only (bg-background, text-foreground, bg-primary) — never hardcoded
- Links: text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors (ALL links same style per page)
- ALL interactive elements MUST have hover: and focus-visible: states — no exceptions
- Identical components must look identical everywhere
- Badge: default=success, secondary=neutral, outline=warning, destructive=error (same status = same variant everywhere)
- Avatar: size-8 in lists, size-10 in profiles, always rounded-full
- Dialog: max-w-sm for confirms, max-w-md for forms. Footer: cancel left, action right
- Tabs: shadcn Tabs. TabsContent space-y-4. TabsList w-full md:w-auto
- Alert: <Alert> for info, variant="destructive" for errors. Never for success (use toast)
- Sections: h2 text-lg font-semibold. Separator between sections, border-b between list items
- Nav active: sidebar=bg-accent font-medium, top nav=text-foreground font-medium
- Toast: use shadcn toast, not browser alert(). Success=description only 3-5s, error=variant="destructive" persistent
- Table rows: hover:bg-muted/50, actions via DropdownMenu (MoreHorizontal), wrap in overflow-x-auto
- Button order: secondary first, primary LAST. Icon+text: icon mr-2 size-4 before text
- Skeleton: h-4 animate-pulse rounded-md bg-muted (match content shape). Button loading: Loader2 animate-spin
- Sheet for filters/mobile nav/previews. Dialog for confirmations/blocking. Sheet default side: right
- Breadcrumb on pages 2+ levels deep. Current page=text-foreground, parents=muted-foreground
- Code blocks: inline=rounded bg-muted px-1.5 py-0.5 font-mono text-sm. Block=rounded-md bg-muted px-4 py-3
- Pagination: shadcn Pagination, centered below list. Feeds: "Load more" button instead
- Card actions: DropdownMenu in CardHeader top-right OR actions in CardFooter, never both
- Search: relative + Search icon absolute left-3, Input pl-9, debounce 300ms
- Accordion: shadcn, type="single" for FAQ, "multiple" for settings
- Popover=small forms, DropdownMenu=action lists, Dialog=complex/blocking
- ScrollArea=fixed containers, native overflow-y-auto=dynamic content
- Empty states: centered icon (size-12) + title + description + CTA. Search/filter variants
- Stat cards: CardTitle text-sm font-medium, metric text-2xl font-bold, trend text-emerald-600/text-destructive
- Error pages: centered 404/500 + "Go home" CTA. Never dead-end the user
- Confirmation: title=action-specific, description=consequences, Cancel(outline)+Destructive
- Multi-step: numbered circles (bg-primary active, bg-muted upcoming), Back/Next buttons
- Form validation: text-sm text-destructive below input, border-destructive on input. NEVER toast
- File upload: border-2 border-dashed + Upload icon + "Drag and drop or browse"
- RadioGroup: 2-3 options=Radio, 4+=Select. Vertical default
- Notification dot: absolute -top-1 -right-1 size-2 bg-destructive. Count: max "9+"
- Progress: shadcn Progress h-2. For uploads/quotas. NEVER for page loads
- Data format: dates=relative recent, absolute older. Numbers=toLocaleString. Currency=$1,234.56
- Status dots: size-2 rounded-full (emerald=active, destructive=error, yellow=warning)
- Timeline: vertical dot+line+event. Avatar group: flex -space-x-2 ring-2 ring-background
- Sidebar: w-64 desktop, Sheet from left mobile. Settings: two-col nav+cards
- Pricing: grid md:grid-cols-3, highlighted=ring-2 ring-primary, Popular badge
- Hero: centered py-16 md:py-24, h1 text-3xl md:text-5xl, CTA size="lg"
- Command palette: shadcn Command, ⌘K trigger. Toggle/ToggleGroup for view switchers
- Copy: ghost sm button, swap Copy→Check icon 2s. Z-index: content=0, dropdown=50, toast=100
- Animation: transition-colors for hovers, 150ms. NEVER page load animations
- Accessibility: WCAG 2.2 AA, contrast ≥ 4.5:1, touch targets ≥ 44px, focus-visible on all interactive
- Auth pages (login, signup, etc.) go in app/(auth)/ route group — no Header/Footer

## Design Tokens

Current design tokens:
- Primary: #17a862
- Background: #fafaf7
- Foreground: #0a0a0a
- Muted: #f4f3ef
- Border: #e7e6e0
- Radius: 0.5rem

Use semantic token classes (bg-background, text-foreground, bg-primary, etc.).
NEVER hardcode colors. NEVER use arbitrary Tailwind values like bg-[#123456].

## After Making Changes

Run after changes:
- coherent check — show all quality and consistency issues (read-only)
- coherent fix — auto-fix cache, deps, syntax, and style issues

## Do NOT modify

- app/design-system/* — platform overlay
- app/api/design-system/* — platform API routes
- coherent.components.json — managed by platform
