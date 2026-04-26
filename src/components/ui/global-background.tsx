export function GlobalBackground() {
  return (
    <>
      {/* Imagen de fondo fija */}
      <div
        aria-hidden="true"
        className="gb-image"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -2,
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none',
        }}
      />
      {/* Overlay oscuro */}
      <div
        aria-hidden="true"
        className="gb-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          background: 'rgba(5,10,20,0.85)',
          pointerEvents: 'none',
        }}
      />
    </>
  )
}
