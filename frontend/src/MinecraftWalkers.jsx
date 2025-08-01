/* @jsxImportSource solid-js */
import { createSignal, onCleanup, onMount } from 'solid-js';

const walkers = [
  {
    name: 'Steve',
    svg: (
      <svg width="120" height="120" viewBox="0 0 120 120">
        <rect x="24" y="8" width="72" height="24" fill="#a57939" />
        <rect x="36" y="32" width="48" height="32" fill="#eac086" />
        <rect x="24" y="64" width="72" height="32" fill="#3c6eaf" />
        <rect x="24" y="96" width="24" height="20" fill="#a57939" />
        <rect x="72" y="96" width="24" height="20" fill="#a57939" />
        {/* Face */}
        <rect x="44" y="44" width="8" height="8" fill="#222" />
        <rect x="68" y="44" width="8" height="8" fill="#222" />
        <rect x="52" y="56" width="16" height="6" fill="#964b00" />
      </svg>
    ),
    width: 120,
    height: 120
  },
  {
    name: 'Alex',
    svg: (
      <svg width="120" height="120" viewBox="0 0 120 120">
        <rect x="24" y="8" width="72" height="24" fill="#eac086" />
        <rect x="36" y="32" width="48" height="32" fill="#f7d08a" />
        <rect x="24" y="64" width="72" height="32" fill="#7fc97f" />
        <rect x="24" y="96" width="24" height="20" fill="#eac086" />
        <rect x="72" y="96" width="24" height="20" fill="#eac086" />
        {/* Face */}
        <rect x="44" y="44" width="8" height="8" fill="#222" />
        <rect x="68" y="44" width="8" height="8" fill="#222" />
        <rect x="52" y="56" width="16" height="6" fill="#964b00" />
      </svg>
    ),
    width: 120,
    height: 120
  },
  {
    name: 'Pig',
    svg: (
      <svg width="120" height="90" viewBox="0 0 120 90">
        <rect x="20" y="24" width="80" height="40" fill="#fbb1b1" />
        <rect x="32" y="64" width="20" height="20" fill="#e48b8b" />
        <rect x="68" y="64" width="20" height="20" fill="#e48b8b" />
        <rect x="48" y="40" width="24" height="12" fill="#fff" />
        {/* Face */}
        <rect x="44" y="36" width="8" height="8" fill="#964b00" />
        <rect x="68" y="36" width="8" height="8" fill="#964b00" />
        <rect x="56" y="52" width="8" height="6" fill="#964b00" />
      </svg>
    ),
    width: 120,
    height: 90
  },
  {
    name: 'Cow',
    svg: (
      <svg width="120" height="90" viewBox="0 0 120 90">
        <rect x="20" y="24" width="80" height="40" fill="#a57939" />
        <rect x="32" y="64" width="20" height="20" fill="#6b4f1d" />
        <rect x="68" y="64" width="20" height="20" fill="#6b4f1d" />
        <rect x="48" y="40" width="24" height="12" fill="#fff" />
        {/* Face */}
        <rect x="44" y="36" width="8" height="8" fill="#222" />
        <rect x="68" y="36" width="8" height="8" fill="#222" />
        <rect x="56" y="52" width="8" height="6" fill="#964b00" />
      </svg>
    ),
    width: 120,
    height: 90
  },
  {
    name: 'Sheep',
    svg: (
      <svg width="120" height="90" viewBox="0 0 120 90">
        <rect x="20" y="24" width="80" height="40" fill="#fff" />
        <rect x="32" y="64" width="20" height="20" fill="#eaeaea" />
        <rect x="68" y="64" width="20" height="20" fill="#eaeaea" />
        <rect x="48" y="40" width="24" height="12" fill="#b59f3b" />
        {/* Face */}
        <rect x="44" y="36" width="8" height="8" fill="#222" />
        <rect x="68" y="36" width="8" height="8" fill="#222" />
        <rect x="56" y="52" width="8" height="6" fill="#964b00" />
      </svg>
    ),
    width: 120,
    height: 90
  }
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function MinecraftWalkers() {
  // Place walkers at a visible height above the ground (bottom 10-30px)
  const [positions, setPositions] = createSignal(
    walkers.map(() => ({ left: getRandomInt(0, 80), bottom: getRandomInt(10, 30), dir: Math.random() > 0.5 ? 1 : -1 }))
  );

  let interval;
  onMount(() => {
    interval = setInterval(() => {
      setPositions(poss =>
        poss.map((pos, i) => {
          let left = pos.left + pos.dir * (Math.random() * 0.7 + 0.3);
          let dir = pos.dir;
          if (left < 0) { left = 0; dir = 1; }
          if (left > 90) { left = 90; dir = -1; }
          // Keep bottom between 10 and 30px for a little up/down walk
          let bottom = pos.bottom + (Math.random() - 0.5) * 1.5;
          if (bottom < 10) bottom = 10;
          if (bottom > 30) bottom = 30;
          return { ...pos, left, dir, bottom };
        })
      );
    }, 60);
  });
  onCleanup(() => clearInterval(interval));

  return (
    <div style={{ position: 'fixed', left: 0, bottom: 0, width: '100vw', height: '180px', pointerEvents: 'none', zIndex: 2 }}>
      {/* Bird flying in the sky */}
      <svg width="100vw" height="60" style={{ position: 'absolute', left: 0, top: 0, width: '100vw', height: '60px', zIndex: 3, pointerEvents: 'none' }}>
        <g>
          <animateTransform attributeName="transform" type="translate" from="-80 20" to="1000 20" dur="5s" repeatCount="indefinite" />
          {/* Simple pixel-art style bird (white body, yellow beak, flapping wings) */}
          <ellipse cx="0" cy="20" rx="14" ry="7" fill="#fff" stroke="#bbb" strokeWidth="2" />
          <ellipse cx="12" cy="18" rx="4" ry="4" fill="#fff" stroke="#bbb" strokeWidth="1.5" />
          <polygon points="18,18 24,20 18,22" fill="#fbc02d" />
          <circle cx="14" cy="17" r="1.2" fill="#222" />
          {/* Flapping wings */}
          <g>
            <path id="wingL" d="M-10,20 Q-30,10 0,30" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round">
              <animate attributeName="d" values="M-10,20 Q-30,10 0,30;M-10,20 Q-30,30 0,10;M-10,20 Q-30,10 0,30" keyTimes="0;0.5;1" dur="0.7s" repeatCount="indefinite" />
            </path>
            <path id="wingR" d="M10,20 Q30,10 0,30" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round">
              <animate attributeName="d" values="M10,20 Q30,10 0,30;M10,20 Q30,30 0,10;M10,20 Q30,10 0,30" keyTimes="0;0.5;1" dur="0.7s" repeatCount="indefinite" />
            </path>
          </g>
        </g>
      </svg>
      {/* Minecraft trees background */}
      <svg width="100vw" height="240" style={{ position: 'absolute', left: 0, bottom: 0, width: '100vw', height: '240px', zIndex: 1 }}>
        {/* Tree 1 - much bigger */}
        <rect x="60" y="80" width="60" height="160" fill="#6b4f1d" />
        <rect x="0" y="0" width="180" height="120" fill="#388e3c" />
        {/* Tree 2 - much bigger */}
        <rect x="400" y="120" width="50" height="120" fill="#6b4f1d" />
        <rect x="340" y="30" width="170" height="110" fill="#388e3c" />
        {/* Tree 3 - much bigger */}
        <rect x="900" y="100" width="70" height="140" fill="#6b4f1d" />
        <rect x="820" y="10" width="210" height="120" fill="#388e3c" />
      </svg>
      {positions().map((pos, i) => (
        <div
          aria-label={walkers[i].name}
          style={{
            position: 'absolute',
            left: `${pos.left}%`,
            bottom: `${pos.bottom}px`,
            width: walkers[i].width + 'px',
            height: walkers[i].height + 'px',
            transition: 'left 0.06s linear, bottom 0.12s linear',
            transform: pos.dir === 1 ? 'scaleX(1)' : 'scaleX(-1)',
            filter: 'drop-shadow(2px 4px 2px #2226)'
          }}
        >
          {walkers[i].svg}
        </div>
      ))}
    </div>
  );
}
