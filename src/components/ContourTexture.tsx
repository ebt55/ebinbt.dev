/**
 * Decorative contour-line texture for the deep-green feature cards — a set of
 * hand-drawn concentric wobbly rings, stroked with currentColor so the parent
 * controls the tint. Purely decorative: aria-hidden, pointer-events none.
 */
export default function ContourTexture({ className = '' }: { className?: string }) {
  const rings = [
    'M260,160 C282,160 300,178 300,200 C300,222 282,240 260,240 C238,240 220,222 220,200 C220,178 238,160 260,160 Z',
    'M262,125 C305,124 337,158 335,201 C333,243 298,276 256,275 C214,274 183,240 185,198 C187,156 219,126 262,125 Z',
    'M255,88 C318,86 369,140 367,202 C365,263 311,315 250,313 C189,311 138,258 140,197 C142,136 192,90 255,88 Z',
    'M258,52 C340,50 405,116 403,198 C401,279 333,346 253,344 C173,342 108,275 110,194 C112,113 176,54 258,52 Z',
    'M252,16 C360,14 440,96 438,203 C436,309 353,388 248,386 C143,384 66,301 68,197 C70,93 144,18 252,16 Z',
    'M256,-24 C384,-26 476,74 474,201 C472,327 375,418 250,416 C125,414 36,314 38,190 C40,66 128,-22 256,-24 Z',
    'M250,-60 C408,-62 512,58 510,215 C508,371 399,472 246,470 C93,468 -16,360 -14,204 C-12,48 92,-58 250,-60 Z',
  ];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 520 400"
      fill="none"
      className={`pointer-events-none absolute ${className}`}
    >
      {rings.map((d) => (
        <path key={d} d={d} stroke="currentColor" strokeWidth="1" />
      ))}
    </svg>
  );
}
