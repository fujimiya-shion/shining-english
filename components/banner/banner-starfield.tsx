'use client'

export function BannerStarfield() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="banner-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="45%" stopColor="#1e293b" />
          <stop offset="75%" stopColor="#2d2a55" />
          <stop offset="100%" stopColor="#433059" />
        </linearGradient>
        <radialGradient id="banner-glow-left" cx="0" cy="0.2" r="0.6">
          <stop offset="0%" stopColor="rgba(56,189,248,0.45)" />
          <stop offset="55%" stopColor="rgba(30,64,175,0.2)" />
          <stop offset="100%" stopColor="rgba(15,23,42,0)" />
        </radialGradient>
        <radialGradient id="banner-glow-right" cx="1" cy="0.1" r="0.55">
          <stop offset="0%" stopColor="rgba(244,114,182,0.35)" />
          <stop offset="55%" stopColor="rgba(124,58,237,0.2)" />
          <stop offset="100%" stopColor="rgba(15,23,42,0)" />
        </radialGradient>
      </defs>

      <rect width="1200" height="520" fill="url(#banner-sky)" />
      <rect width="1200" height="520" fill="url(#banner-glow-left)" />
      <rect width="1200" height="520" fill="url(#banner-glow-right)" />

      <g>
        <circle className="banner-star" cx="120" cy="90" r="1.6" fill="rgba(255,255,255,0.85)" />
        <circle className="banner-star" cx="210" cy="160" r="1" fill="rgba(255,255,255,0.6)" />
        <circle className="banner-star" cx="300" cy="120" r="1.4" fill="rgba(255,255,255,0.75)" />
        <circle className="banner-star" cx="420" cy="80" r="1.1" fill="rgba(255,255,255,0.7)" />
        <circle className="banner-star" cx="520" cy="140" r="1.8" fill="rgba(255,255,255,0.85)" />
        <circle className="banner-star" cx="640" cy="110" r="1.2" fill="rgba(255,255,255,0.65)" />
        <circle className="banner-star" cx="760" cy="90" r="1.5" fill="rgba(255,255,255,0.8)" />
        <circle className="banner-star" cx="880" cy="130" r="1" fill="rgba(255,255,255,0.55)" />
        <circle className="banner-star" cx="1010" cy="70" r="1.4" fill="rgba(255,255,255,0.75)" />
        <circle className="banner-star" cx="1080" cy="150" r="1.1" fill="rgba(255,255,255,0.65)" />
        <circle className="banner-star" cx="160" cy="260" r="1.2" fill="rgba(255,255,255,0.65)" />
        <circle className="banner-star" cx="260" cy="230" r="1.6" fill="rgba(255,255,255,0.8)" />
        <circle className="banner-star" cx="360" cy="300" r="1" fill="rgba(255,255,255,0.55)" />
        <circle className="banner-star" cx="460" cy="240" r="1.4" fill="rgba(255,255,255,0.7)" />
        <circle className="banner-star" cx="580" cy="280" r="1.1" fill="rgba(255,255,255,0.6)" />
        <circle className="banner-star" cx="700" cy="230" r="1.7" fill="rgba(255,255,255,0.85)" />
        <circle className="banner-star" cx="820" cy="260" r="1" fill="rgba(255,255,255,0.55)" />
        <circle className="banner-star" cx="940" cy="240" r="1.3" fill="rgba(255,255,255,0.7)" />
        <circle className="banner-star" cx="1060" cy="210" r="1.5" fill="rgba(255,255,255,0.8)" />
        <circle className="banner-star" cx="140" cy="400" r="1.2" fill="rgba(255,255,255,0.65)" />
        <circle className="banner-star" cx="260" cy="380" r="1.5" fill="rgba(255,255,255,0.8)" />
        <circle className="banner-star" cx="360" cy="430" r="1.1" fill="rgba(255,255,255,0.6)" />
        <circle className="banner-star" cx="520" cy="360" r="1.7" fill="rgba(255,255,255,0.85)" />
        <circle className="banner-star" cx="640" cy="410" r="1.2" fill="rgba(255,255,255,0.65)" />
        <circle className="banner-star" cx="760" cy="370" r="1.4" fill="rgba(255,255,255,0.75)" />
        <circle className="banner-star" cx="900" cy="410" r="1.1" fill="rgba(255,255,255,0.6)" />
        <circle className="banner-star" cx="1040" cy="360" r="1.6" fill="rgba(255,255,255,0.8)" />
        <circle className="banner-star" cx="60" cy="40" r="0.9" fill="rgba(255,255,255,0.55)" />
        <circle className="banner-star" cx="180" cy="60" r="1.2" fill="rgba(255,255,255,0.7)" />
        <circle className="banner-star" cx="260" cy="90" r="0.8" fill="rgba(255,255,255,0.5)" />
        <circle className="banner-star" cx="340" cy="40" r="1" fill="rgba(255,255,255,0.65)" />
        <circle className="banner-star" cx="460" cy="60" r="1.3" fill="rgba(255,255,255,0.75)" />
        <circle className="banner-star" cx="580" cy="90" r="0.7" fill="rgba(255,255,255,0.5)" />
        <circle className="banner-star" cx="700" cy="60" r="1" fill="rgba(255,255,255,0.6)" />
        <circle className="banner-star" cx="820" cy="80" r="1.2" fill="rgba(255,255,255,0.7)" />
        <circle className="banner-star" cx="940" cy="40" r="0.9" fill="rgba(255,255,255,0.55)" />
        <circle className="banner-star" cx="1120" cy="90" r="1.1" fill="rgba(255,255,255,0.65)" />
        <circle className="banner-star" cx="80" cy="210" r="1" fill="rgba(255,255,255,0.6)" />
        <circle className="banner-star" cx="190" cy="210" r="1.3" fill="rgba(255,255,255,0.75)" />
        <circle className="banner-star" cx="300" cy="200" r="0.8" fill="rgba(255,255,255,0.5)" />
        <circle className="banner-star" cx="380" cy="180" r="1.1" fill="rgba(255,255,255,0.65)" />
        <circle className="banner-star" cx="520" cy="200" r="0.9" fill="rgba(255,255,255,0.55)" />
        <circle className="banner-star" cx="640" cy="190" r="1.2" fill="rgba(255,255,255,0.7)" />
        <circle className="banner-star" cx="760" cy="210" r="0.8" fill="rgba(255,255,255,0.5)" />
        <circle className="banner-star" cx="880" cy="200" r="1" fill="rgba(255,255,255,0.6)" />
        <circle className="banner-star" cx="1000" cy="180" r="1.3" fill="rgba(255,255,255,0.75)" />
        <circle className="banner-star" cx="1120" cy="230" r="0.9" fill="rgba(255,255,255,0.55)" />
        <circle className="banner-star" cx="80" cy="320" r="1.1" fill="rgba(255,255,255,0.65)" />
        <circle className="banner-star" cx="200" cy="330" r="0.8" fill="rgba(255,255,255,0.5)" />
        <circle className="banner-star" cx="320" cy="320" r="1.2" fill="rgba(255,255,255,0.7)" />
        <circle className="banner-star" cx="440" cy="320" r="0.9" fill="rgba(255,255,255,0.55)" />
        <circle className="banner-star" cx="560" cy="330" r="1.3" fill="rgba(255,255,255,0.75)" />
        <circle className="banner-star" cx="680" cy="320" r="0.8" fill="rgba(255,255,255,0.5)" />
        <circle className="banner-star" cx="800" cy="330" r="1.1" fill="rgba(255,255,255,0.65)" />
        <circle className="banner-star" cx="920" cy="320" r="0.9" fill="rgba(255,255,255,0.55)" />
        <circle className="banner-star" cx="1040" cy="330" r="1.2" fill="rgba(255,255,255,0.7)" />
        <circle className="banner-star" cx="1160" cy="320" r="0.8" fill="rgba(255,255,255,0.5)" />
      </g>
    </svg>
  )
}
