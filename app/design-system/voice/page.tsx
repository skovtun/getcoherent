'use client'
import Link from 'next/link'

const voice: any = null

const HAS_VOICE = voice !== null && (
  voice.tone || voice.ctaStyle ||
  (voice.copyRules && voice.copyRules.length > 0) ||
  (voice.avoidWords && voice.avoidWords.length > 0) ||
  (voice.transparencyRules && voice.transparencyRules.length > 0)
)

const SAMPLE_CONFIG = `voice: {
  tone: "confident-direct",
  ctaStyle: "imperative-action",
  copyRules: [
    "Plain English. No hedging.",
    "Lead with the value, not the process.",
  ],
  avoidWords: ["amazing", "revolutionary", "delve"],
  transparencyRules: [
    "Show the cost upfront.",
    "Quiet confidence over hype.",
  ],
}`

export default function VoicePage() {
  return (
    <article className="space-y-12">
      <header className="space-y-4">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Foundations · Voice</div>
        <h1 className="text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground">
          How this product talks.
        </h1>
        <p className="max-w-[60ch] text-[16px] leading-[1.6] text-muted-foreground">
          Voice is the third dimension of the design system, after layout and color. It controls every CTA label, empty state, error message, and pricing line the AI generates.
        </p>
      </header>

      {!HAS_VOICE && (
        <div className="space-y-6">
          {/* What is Voice */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-[18px] font-semibold leading-tight tracking-tight text-foreground">What is Voice?</h2>
            <p className="mt-2 max-w-[64ch] text-[14px] leading-[1.65] text-muted-foreground">
              Voice is the writing style your product uses everywhere — every CTA label, error message, empty state, pricing line, and microcopy snippet. It's a foundation primitive on the same layer as Color and Typography.
            </p>
            <p className="mt-3 max-w-[64ch] text-[14px] leading-[1.65] text-muted-foreground">
              Without a voice profile, AI-generated copy drifts into generic SaaS speak: "Get Started Today!", "Amazing Features", "Click Here". With one, the AI follows your tone rules verbatim.
            </p>
          </section>

          {/* How to set it */}
          <section className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-[18px] font-semibold leading-tight tracking-tight text-foreground">How to set Voice</h2>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">3 steps</span>
            </div>

            <ol className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[10.5px] font-semibold tabular-nums text-primary">1</span>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-medium text-foreground">Add a <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">voice</code> block to <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">design-system.config.ts</code></div>
                  <p className="mt-1 text-[13px] leading-[1.55] text-muted-foreground">Sits at the top level alongside <code className="font-mono text-[11.5px]">colors</code>, <code className="font-mono text-[11.5px]">typography</code>, and <code className="font-mono text-[11.5px]">spacing</code>. All fields are optional.</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[10.5px] font-semibold tabular-nums text-primary">2</span>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-medium text-foreground">Run <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">coherent update</code></div>
                  <p className="mt-1 text-[13px] leading-[1.55] text-muted-foreground">Regenerates this page with your voice principles, registers the profile in the generation pipeline.</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[10.5px] font-semibold tabular-nums text-primary">3</span>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-medium text-foreground">Generate copy</div>
                  <p className="mt-1 text-[13px] leading-[1.55] text-muted-foreground">Every <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">coherent chat</code> run from now on injects your voice rules into the AI prompt as a <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">## VOICE DIRECTIVE</code> block.</p>
                </div>
              </li>
            </ol>
          </section>

          {/* Example config */}
          <section className="rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between rounded-t-lg border-b border-border bg-muted px-4 py-3">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
                <span className="h-1.5 w-1.5 rounded-[2px] bg-primary" />
                example · design-system.config.ts
              </div>
              <span className="font-mono text-[10.5px] text-muted-foreground/70">copy-paste, then edit</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-[1.65] text-foreground"><code>{SAMPLE_CONFIG}</code></pre>
          </section>

          {/* What each field does */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-[18px] font-semibold leading-tight tracking-tight text-foreground">What each field does</h2>
            <dl className="mt-4 space-y-3">
              <div className="grid grid-cols-[160px_1fr] items-start gap-4 border-b border-border pb-3">
                <dt className="font-mono text-[12px] text-foreground">tone</dt>
                <dd className="text-[13px] leading-[1.55] text-muted-foreground">A single label describing the overall posture (e.g., <code className="font-mono text-[11.5px]">"confident-direct"</code>, <code className="font-mono text-[11.5px]">"warm-conversational"</code>, <code className="font-mono text-[11.5px]">"clinical-precise"</code>).</dd>
              </div>
              <div className="grid grid-cols-[160px_1fr] items-start gap-4 border-b border-border pb-3">
                <dt className="font-mono text-[12px] text-foreground">ctaStyle</dt>
                <dd className="text-[13px] leading-[1.55] text-muted-foreground">How button labels are written (e.g., <code className="font-mono text-[11.5px]">"imperative-action"</code> for "Save", "Delete"; <code className="font-mono text-[11.5px]">"benefit-led"</code> for "Get unlimited reports").</dd>
              </div>
              <div className="grid grid-cols-[160px_1fr] items-start gap-4 border-b border-border pb-3">
                <dt className="font-mono text-[12px] text-foreground">copyRules</dt>
                <dd className="text-[13px] leading-[1.55] text-muted-foreground">Hard directives the AI follows verbatim. One short sentence per rule.</dd>
              </div>
              <div className="grid grid-cols-[160px_1fr] items-start gap-4 border-b border-border pb-3">
                <dt className="font-mono text-[12px] text-foreground">avoidWords</dt>
                <dd className="text-[13px] leading-[1.55] text-muted-foreground">Banned words. The AI will not generate any of these — flagged in <code className="font-mono text-[11.5px]">coherent check</code>.</dd>
              </div>
              <div className="grid grid-cols-[160px_1fr] items-start gap-4">
                <dt className="font-mono text-[12px] text-foreground">transparencyRules</dt>
                <dd className="text-[13px] leading-[1.55] text-muted-foreground">Promises about pricing, privacy, beta status, trade-offs. Shapes how the product talks about itself.</dd>
              </div>
            </dl>
          </section>
        </div>
      )}

      {HAS_VOICE && (
        <>
          {/* Tone + CTA style as eyebrow facts */}
          {(voice.tone || voice.ctaStyle) && (
            <section className="grid gap-4 md:grid-cols-2">
              {voice.tone && (
                <div className="rounded-lg border border-border bg-card p-5">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">tone</div>
                  <div className="mt-2 text-[18px] font-semibold tracking-tight text-foreground">{voice.tone}</div>
                </div>
              )}
              {voice.ctaStyle && (
                <div className="rounded-lg border border-border bg-card p-5">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">cta style</div>
                  <div className="mt-2 text-[18px] font-semibold tracking-tight text-foreground">{voice.ctaStyle}</div>
                </div>
              )}
            </section>
          )}

          {/* Copy rules */}
          {voice.copyRules && voice.copyRules.length > 0 && (
            <section>
              <h2 className="text-[22px] font-semibold leading-tight tracking-tight text-foreground">Copywriting rules</h2>
              <p className="mt-2 max-w-[60ch] text-[14px] leading-[1.6] text-muted-foreground">
                Followed verbatim by every generation. Each rule is a hard directive.
              </p>
              <div className="mt-6 space-y-3">
                {voice.copyRules.map((rule: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 rounded-md border border-border bg-card p-4">
                    <span className="mt-0.5 font-mono text-[10.5px] tabular-nums text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[15px] leading-[1.55] text-foreground">{rule}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Transparency rules */}
          {voice.transparencyRules && voice.transparencyRules.length > 0 && (
            <section>
              <h2 className="text-[22px] font-semibold leading-tight tracking-tight text-foreground">Transparency &amp; trust</h2>
              <p className="mt-2 max-w-[60ch] text-[14px] leading-[1.6] text-muted-foreground">
                What we promise about pricing, privacy, beta status, and trade-offs.
              </p>
              <div className="mt-6 space-y-3">
                {voice.transparencyRules.map((rule: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 rounded-md border border-border bg-card p-4">
                    <span className="mt-0.5 font-mono text-[10.5px] tabular-nums text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[15px] leading-[1.55] text-foreground">{rule}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Avoid list */}
          {voice.avoidWords && voice.avoidWords.length > 0 && (
            <section>
              <h2 className="text-[22px] font-semibold leading-tight tracking-tight text-foreground">Words we don't use</h2>
              <p className="mt-2 max-w-[60ch] text-[14px] leading-[1.6] text-muted-foreground">
                The AI is hard-banned from generating any of these. They mark voice that isn't ours.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {voice.avoidWords.map((w: string) => (
                  <span key={w} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 font-mono text-[12.5px] text-muted-foreground">
                    <span className="text-muted-foreground/40">×</span>
                    {w}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* The wiring — show the actual injected prompt */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-[18px] font-semibold leading-tight tracking-tight text-foreground">How this reaches the AI</h2>
            <p className="mt-2 max-w-[60ch] text-[13.5px] leading-[1.6] text-muted-foreground">
              Every <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11.5px]">coherent chat</code> run injects this voice profile into the modification prompt as a <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11.5px]">## VOICE DIRECTIVE</code> block, sitting between core constraints and design-quality rules.
            </p>
            <p className="mt-3 max-w-[60ch] text-[13.5px] leading-[1.6] text-muted-foreground">
              Edit voice in <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11.5px]">design-system.config.ts</code>, run <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11.5px]">coherent update</code>, and the next generation respects the new tone.
            </p>
          </section>
        </>
      )}
    </article>
  )
}
