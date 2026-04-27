/**
 * Canonical error-code registry for /errors/[code] static pages.
 *
 * Mirrors `docs/error-codes.md` in the CLI repo
 * (@getcoherent/cli → docs/error-codes.md). When new codes ship in the
 * CLI, add them here in the same release cycle — the CLI's
 * `CoherentError.docsUrl` points at this path pattern, so any
 * un-documented code renders as a 404.
 *
 * Kept hand-synced rather than auto-generated because (a) the two
 * repos release on different cadences, and (b) the landing content
 * can afford slightly different framing (more links out to skill
 * docs, more prose) than the raw CLI reference.
 */

export interface ErrorCodeDoc {
  /** Canonical `COHERENT_E0NN` identifier. */
  code: string
  /** URL slug — the trailing `E0NN`. Used for /errors/[code]. */
  slug: string
  /** One-line problem, present tense, no trailing period. */
  title: string
  /** Full user-facing description — 1-3 paragraphs of prose. */
  description: string
  /** When the user sees this error. */
  whenYouSeeIt: string
  /** Root cause, framed to help the user's mental model. */
  why: string
  /** Ordered fix options. Each has a short label + actionable body. */
  fixes: Array<{ label: string; body: string; command?: string }>
  /** Related codes or skill/command names. */
  related: Array<{ label: string; href: string }>
}

export const ERROR_CODES: ErrorCodeDoc[] = [
  {
    code: 'COHERENT_E001',
    slug: 'E001',
    title: 'No AI key available',
    description:
      '`coherent chat` makes API calls to Anthropic (or OpenAI) directly. If no key is configured, the command cannot proceed.',
    whenYouSeeIt:
      'Running `coherent chat "..."` without `ANTHROPIC_API_KEY` (or `OPENAI_API_KEY`) set in your environment or stored in the project\'s `.env`.',
    why: '`coherent chat` makes API calls to Anthropic (or OpenAI) directly. Without a key, there is no way for the CLI to reach the provider.',
    fixes: [
      {
        label: 'Use Claude Code skill mode (no API key required)',
        body: 'If you already pay for a Claude Pro / Max / Free subscription, open the project in Claude Code and run `/coherent-generate "describe your app"`. Your Claude Code session does the generation; Coherent contributes constraints and validation. Nothing is billed on Coherent\'s side.',
        command: '/coherent-generate "describe your app"',
      },
      {
        label: 'Add an API key',
        body: 'Store the key in the project\'s `.env` (already `.gitignore`-d) or export it in your shell before running `coherent chat`.',
        command: 'coherent auth set-key sk-ant-...',
      },
    ],
    related: [
      { label: 'COHERENT_E002 (session locked)', href: '/errors/E002' },
      { label: 'Install & quick start', href: '/#install' },
    ],
  },
  {
    code: 'COHERENT_E002',
    slug: 'E002',
    title: 'Another coherent session is active',
    description:
      'Coherent holds a project-wide lock (`.coherent.lock`) between `session start` and `session end` so two runs cannot corrupt shared state. The lock is shared by both the chat rail and the skill rail.',
    whenYouSeeIt:
      'Running `coherent session start` (or `coherent chat`) while a skill-mode session is still open on the same project. The error names the lock age in seconds.',
    why: 'The lock prevents two concurrent runs from stepping on each other\'s `design-system.config.ts`, `coherent.components.json`, or generated TSX files.',
    fixes: [
      {
        label: 'Finish the active session',
        body: 'Look up the session UUID in `.coherent.lock` or `.coherent/session/`, then cleanly end it.',
        command: 'coherent session end <uuid>',
      },
      {
        label: 'The session is abandoned (Claude Code crashed, user Ctrl-C\'d)',
        body: 'Delete the lockfile manually. Session artifacts under `.coherent/session/<uuid>/` stay intact so you can inspect or reuse them; subsequent `coherent session start` works immediately.',
        command: 'rm .coherent.lock',
      },
    ],
    related: [
      { label: 'COHERENT_E005 (session schema mismatch)', href: '/errors/E005' },
      { label: 'COHERENT_E006 (session artifact missing)', href: '/errors/E006' },
    ],
  },
  {
    code: 'COHERENT_E003',
    slug: 'E003',
    title: '`coherent _phase ingest` received empty stdin',
    description:
      'The ingest step parses the AI response from stdin. When the pipe is empty, there is nothing to parse and the phase cannot advance.',
    whenYouSeeIt:
      'Running `coherent _phase ingest <name> --session <uuid>` with empty, whitespace-only, or unpiped stdin.',
    why: 'The CLI relies on stdin to receive the AI response. An empty pipe almost always means the upstream step failed to produce output or was never invoked.',
    fixes: [
      {
        label: 'Pipe the response from a file',
        body: 'Write the AI response to a file first, then pipe it into ingest. This is the pattern the `/coherent-generate` skill uses.',
        command: 'coherent _phase ingest plan --session "$UUID" < /tmp/plan-response.md',
      },
      {
        label: 'Inside Claude Code',
        body: 'The `/coherent-generate` skill handles piping automatically. If you hit E003 there, the skill wrote an empty response file. Regenerate the phase\'s prep output and retry.',
      },
    ],
    related: [
      { label: 'COHERENT_E004 (protocol mismatch)', href: '/errors/E004' },
      { label: 'Skill-mode overview', href: '/errors' },
    ],
  },
  {
    code: 'COHERENT_E004',
    slug: 'E004',
    title: 'Phase-engine protocol mismatch',
    description:
      'The skill markdown (`.claude/skills/coherent-generate/SKILL.md`) embeds the protocol version it was written against. The CLI advances its protocol when the phase-engine contract changes. A mismatch means the two disagree on artifact shapes, command output, or ingest parsers — running anyway would silently corrupt the session.',
    whenYouSeeIt:
      'Running `coherent _phase` with a `--protocol N` value that differs from the CLI\'s current `PHASE_ENGINE_PROTOCOL`. Always caught at the first `_phase` invocation — before any state-mutating work.',
    why: 'The contract between the skill markdown and the CLI advances in lockstep. Version skew means the two are from different releases and can\'t safely interoperate.',
    fixes: [
      {
        label: 'Refresh the skill markdown to match the installed CLI',
        body: 'Writes the latest `.claude/skills/coherent-generate/SKILL.md` and `.claude/commands/coherent-generate.md` into the project. Start a new session afterward.',
        command: 'coherent update',
      },
      {
        label: 'Upgrade the CLI globally if the markdown is newer',
        body: 'If your project\'s skill markdown is from a newer release than your globally-installed CLI, upgrade the CLI.',
        command: 'npm install -g @getcoherent/cli@latest',
      },
    ],
    related: [
      { label: 'COHERENT_E003 (empty ingest)', href: '/errors/E003' },
      { label: 'Install & quick start', href: '/#install' },
    ],
  },
  {
    code: 'COHERENT_E005',
    slug: 'E005',
    title: 'Session schema version mismatch',
    description:
      'Sessions are ephemeral by design — they hold in-progress phase artifacts, not long-term state. Across CLI upgrades the session schema may change. Rather than auto-migrating (complex and risky), the CLI rejects the mismatched session and asks you to start a new one.',
    whenYouSeeIt:
      'A session directory exists (e.g. from an older CLI version) whose `session.json.schemaVersion` is incompatible with the installed CLI.',
    why: 'Session schemas are tied to the CLI version that created them. A newer CLI that auto-migrated older sessions could hide real bugs; it\'s safer to discard.',
    fixes: [
      {
        label: 'Discard the old session and start fresh',
        body: 'Nothing is lost that wasn\'t already lost — sessions only hold in-progress state of a not-yet-completed run.',
        command: 'rm -rf .coherent/session/<uuid>/ && coherent session start --intent "..."',
      },
    ],
    related: [
      { label: 'COHERENT_E002 (session locked)', href: '/errors/E002' },
      { label: 'COHERENT_E006 (session artifact missing)', href: '/errors/E006' },
    ],
  },
  {
    code: 'COHERENT_E006',
    slug: 'E006',
    title: 'Session artifact missing on resume',
    description:
      'The session-resume flow detects a session in `awaiting-ingest` status but the expected input artifact (e.g. `anchor-input.json`, `pages-input.json`) is absent. A previous run wrote the session marker but failed to persist the artifact downstream phases need.',
    whenYouSeeIt:
      'Skill-mode auto-resume invoked on a session whose expected input artifact has been removed, corrupted, or never written.',
    why: 'Likely causes: a crash between a phase ingest completing and the next phase\'s input being written, a manual edit that deleted the file, or a filesystem sync hiccup.',
    fixes: [
      {
        label: 'Restart the session from the last complete phase',
        body: 'The simplest recovery: delete the broken session and start a fresh one.',
        command: 'rm -rf .coherent/session/<uuid>/ && coherent session start --intent "..."',
      },
      {
        label: 'Preserve the session for debugging',
        body: 'If you need to understand what happened, end the session with `--keep` so the dir survives. Then start a new session in parallel.',
        command: 'coherent session end <uuid> --keep',
      },
    ],
    related: [
      { label: 'COHERENT_E002 (session locked)', href: '/errors/E002' },
      { label: 'COHERENT_E005 (schema mismatch)', href: '/errors/E005' },
    ],
  },
  {
    code: 'COHERENT_E007',
    slug: 'E007',
    title: 'applyMode: no-new-ai received an AI-dependent request without pre-populated output',
    description:
      'The skill rail (`/coherent-chat` via Claude Code) and the API rail (`coherent chat`) share the same `applyRequests` entry point but run with different `applyMode` settings. API rail has an AI provider available and runs in `with-ai` mode — non-pre-populated AI requests are fine, the provider fills in the output mid-dispatch. Skill rail has NO provider and runs in `no-new-ai` mode — every AI-dependent request must arrive with its output already filled in by the upstream skill phase. Pre-v0.12.0 the skill rail silently dropped these requests; since v0.12.0 it throws E007 loudly so the producer-side bug surfaces immediately.',
    whenYouSeeIt:
      'Hitting `applyRequests` on the skill rail with a `ModificationRequest` whose type is AI-dependent (`add-page`, `update-page`, `modify-layout-block`, `link-shared`, `promote-and-link`) but the request did NOT carry pre-populated deterministic output (`changes.pageCode` for add/update-page, `changes.layoutBlock` for modify-layout-block).',
    why: 'AI-dependent request types need either a model in the loop OR a producer phase that has already filled in the deterministic output. Skill rail has no model. If a request reaches `applyRequests` without pre-population, the producer phase upstream has a bug — the skill flow expected to fill in the output before emitting the request, and didn\'t.',
    fixes: [
      {
        label: 'Re-run via the API rail',
        body: 'The API rail has the provider available and handles AI-dependent requests directly. This is the fastest workaround when you hit E007 from a skill-rail invocation. File an issue afterward with the skill name + request type so the producer-side bug can be fixed.',
        command: 'coherent chat "<your original request>"',
      },
      {
        label: 'You called `applyRequests` directly from custom code',
        body: 'Switch to `applyMode: \'with-ai\'` if you have a provider set up, or pre-populate the request\'s `changes.pageCode` / `changes.layoutBlock` field before calling `applyRequests`.',
      },
      {
        label: 'The request type is `link-shared` or `promote-and-link`',
        body: 'These cannot be pre-populated — they always require AI to pick the insertion site / extract the JSX. Use the API rail.',
        command: 'coherent chat "<your request>"',
      },
    ],
    related: [
      { label: 'COHERENT_E001 (no API key)', href: '/errors/E001' },
      { label: 'COHERENT_E006 (session artifact missing)', href: '/errors/E006' },
    ],
  },
  {
    code: 'COHERENT_E008',
    slug: 'E008',
    title: 'Project was created with an older Coherent version than the installed CLI',
    description:
      'The CLI\'s config schema, generator templates, and validator rules evolve across releases. A project initialized with an older CLI may have a config shape that the newer CLI\'s downstream code doesn\'t expect — e.g., a missing field on a page that the new generator dereferences. Pre-v0.13.1 the CLI printed a soft warning and continued, leading to cryptic generic `TypeError` mid-generation. v0.13.1 makes this a hard stop at config-load time so the actionable fix shows BEFORE any state mutation.',
    whenYouSeeIt:
      'Running `coherent chat "..."` on a project whose `design-system.config.ts` has a `coherentVersion` field older than the CLI you are running.',
    why: 'A project on an older config schema cannot be reliably driven by a newer generator without first being migrated. The hard stop prevents partial-state corruption that the soft-warn path could create.',
    fixes: [
      {
        label: 'Run `coherent update` in the project',
        body: 'Applies the new CLI\'s rules and templates to your existing project without modifying your generated pages and components. Then re-run `coherent chat`.',
        command: 'cd your-project && coherent update',
      },
      {
        label: 'Pin your global CLI to the old version',
        body: 'If you need to keep matching production parity with an older Coherent version, install the matching CLI globally instead of upgrading the project.',
        command: 'npm install -g @getcoherent/cli@<old-version>',
      },
    ],
    related: [
      { label: 'COHERENT_E004 (protocol mismatch)', href: '/errors/E004' },
      { label: 'COHERENT_E005 (session schema mismatch)', href: '/errors/E005' },
    ],
  },
]

/** Look up a single code by slug (e.g. 'E001'). Returns null when not found. */
export function findErrorCode(slug: string): ErrorCodeDoc | null {
  return ERROR_CODES.find(e => e.slug === slug) ?? null
}
