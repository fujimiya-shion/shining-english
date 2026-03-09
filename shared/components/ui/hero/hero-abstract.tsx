'use client'

export function HeroAbstract() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-925, #0b1f3a)" />
          <stop offset="40%" stopColor="rgba(15,43,82,0.85)" />
          <stop offset="70%" stopColor="rgba(30,79,134,0.6)" />
          <stop offset="100%" stopColor="rgba(233,243,255,0.35)" />
        </linearGradient>
        <radialGradient id="hero-glow" cx="0.15" cy="0.2" r="0.65">
          <stop offset="0%" stopColor="rgba(242,169,0,0.55)" />
          <stop offset="50%" stopColor="rgba(242,169,0,0.25)" />
          <stop offset="100%" stopColor="rgba(242,169,0,0)" />
        </radialGradient>
        <radialGradient id="hero-moon" cx="0.85" cy="0.2" r="0.55">
          <stop offset="0%" stopColor="rgba(143,211,255,0.45)" />
          <stop offset="60%" stopColor="rgba(79,129,192,0.2)" />
          <stop offset="100%" stopColor="rgba(15,43,82,0)" />
        </radialGradient>
        <linearGradient id="hero-ridge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(15,43,82,0.55)" />
          <stop offset="50%" stopColor="rgba(15,43,82,0.25)" />
          <stop offset="100%" stopColor="rgba(15,43,82,0.45)" />
        </linearGradient>
      </defs>

      <rect width="1200" height="900" fill="url(#hero-sky)" />
      <rect width="1200" height="900" fill="url(#hero-glow)" />
      <rect width="1200" height="900" fill="url(#hero-moon)" />

      <path
        d="M-60 650C160 560 360 560 520 610C700 670 870 720 1040 690C1140 672 1240 630 1300 570L1300 980L-60 980Z"
        fill="url(#hero-ridge)"
      />
      <path
        d="M-80 720C170 670 390 670 590 720C770 765 950 800 1120 780C1220 768 1310 730 1360 690L1360 980L-80 980Z"
        fill="rgba(6,22,43,0.35)"
      />

      <g opacity="0.9">
        <circle cx="180" cy="210" r="12" fill="rgba(242,169,0,0.35)" />
        <circle cx="1040" cy="220" r="10" fill="rgba(143,211,255,0.35)" />
        <circle cx="860" cy="520" r="18" fill="rgba(15,43,82,0.3)" />
        <circle cx="260" cy="520" r="14" fill="rgba(242,169,0,0.25)" />
      </g>
    </svg>
  )
}
