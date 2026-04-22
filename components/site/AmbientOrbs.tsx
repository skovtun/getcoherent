export function AmbientOrbs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="orb absolute h-[520px] w-[520px] rounded-full"
        style={{
          top: '-140px',
          left: '8%',
          background:
            'radial-gradient(closest-side, rgba(62, 207, 142, 0.22), transparent 70%)',
        }}
      />
      <div
        className="orb orb-b absolute h-[420px] w-[420px] rounded-full"
        style={{
          top: '-60px',
          right: '6%',
          background:
            'radial-gradient(closest-side, rgba(97, 175, 239, 0.14), transparent 70%)',
        }}
      />
    </div>
  )
}
