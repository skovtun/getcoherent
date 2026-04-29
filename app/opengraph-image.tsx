import { ImageResponse } from 'next/og'

// Removed `runtime: 'edge'` — Next 15 edge runtime was returning empty
// content-length: 0 PNG for this route, breaking all social previews.
// Default Node serverless runtime is slightly slower but actually renders.
export const alt = 'Coherent Design Method — Once designed. Consistent UI everywhere.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background:
            'radial-gradient(ellipse at top left, rgba(62,207,142,0.18) 0%, transparent 55%), linear-gradient(135deg, #0a0a0a 0%, #111 100%)',
          color: '#ededed',
          fontFamily: 'system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: '#3ecf8e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#052b17',
              fontWeight: 800,
              fontSize: 26,
            }}
          >
            C
          </div>
          <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: -0.5 }}>
            Coherent Design Method
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2.5,
              maxWidth: 1040,
            }}
          >
            Once designed.<br />
            Consistent UI everywhere.
          </div>
          <div style={{ fontSize: 28, color: '#a1a1a1', maxWidth: 1000, lineHeight: 1.35 }}>
            Multi-page UI generation where every page shares the same components, tokens, and layout.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 22,
            color: '#6b6b6b',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: 999, background: '#3ecf8e' }} />
            <span style={{ color: '#a1a1a1' }}>npm i -g @getcoherent/cli</span>
          </div>
          <div>getcoherent.design</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
