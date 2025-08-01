/* @jsxImportSource solid-js */
import { createSignal, onMount } from 'solid-js';

export default function LoadingSunrise(props) {
  const [hide, setHide] = createSignal(false);
  onMount(() => {
    setTimeout(() => {
      setHide(true);
      if (props.onFinish) props.onFinish();
    }, 2200); // 2.2s for animation
  });
  if (hide()) return null;
  return (
    <div style={{
      position: 'fixed',
      zIndex: 2147483647,
      left: 0,
      top: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(to top, #ee9212 60%, #ffecd2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.5s',
      animation: 'fadeout 0.5s 1.7s forwards',
      pointerEvents: 'all',
      overflow: 'hidden',
    }}>
      <svg width="100vw" height="100vh" viewBox="0 0 400 300" style={{ position: 'absolute', left: 0, top: 0, width: '100vw', height: '100vh', background: 'linear-gradient(to top, #ee9212 60%, #ffecd2 100%)' }} preserveAspectRatio="none">
        <defs>
          <linearGradient id="sunrise-bg" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#ee9212" />
            <stop offset="60%" stopColor="#ffb347" />
            <stop offset="100%" stopColor="#ffecd2" />
          </linearGradient>
          <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fffbe4" stopOpacity="1" />
            <stop offset="20%" stopColor="#ffe066" stopOpacity="1" />
            <stop offset="40%" stopColor="#ffb300" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#ff7043" stopOpacity="0.7" />
            <stop offset="80%" stopColor="#ff9800" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffecd2" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="400" height="300" fill="url(#sunrise-bg)" />
        {/* Clouds */}
        <ellipse cx="80" cy="120" rx="60" ry="18" fill="#fff" opacity="0.8">
          <animate attributeName="cx" values="80;100;80" keyTimes="0;0.5;1" dur="2.2s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="320" cy="100" rx="70" ry="22" fill="#fff" opacity="0.7">
          <animate attributeName="cx" values="320;300;320" keyTimes="0;0.5;1" dur="2.2s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="200" cy="140" rx="90" ry="25" fill="#fff" opacity="0.6">
          <animate attributeName="cx" values="200;210;200" keyTimes="0;0.5;1" dur="2.2s" repeatCount="indefinite" />
        </ellipse>
        {/* Sun glow (radial gradient, animated, full background, stronger) */}
        <rect
          x="0"
          y="0"
          width="400"
          height="300"
          fill="url(#sun-glow)"
          opacity="1"
        >
          <animate attributeName="y" from="130" to="0" dur="1.5s" fill="freeze" />
          <animate attributeName="opacity" values="1;0.7;1;0.85;1" keyTimes="0;0.2;0.5;0.8;1" dur="1.5s" repeatCount="indefinite" />
        </rect>
        {/* Sun (animated, full circle, with extra glow) */}
        <g>
          {/* Extra fire-like glow */}
          <circle id="sun-glow-outer" cx="200" cy="220" r="80" fill="#ffb300" opacity="0.22">
            <animate attributeName="cy" from="220" to="90" dur="1.5s" fill="freeze" />
            <animate attributeName="opacity" values="0.22;0.32;0.18;0.22" keyTimes="0;0.3;0.7;1" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <circle id="sun-glow-inner" cx="200" cy="220" r="60" fill="#ff7043" opacity="0.25">
            <animate attributeName="cy" from="220" to="90" dur="1.5s" fill="freeze" />
            <animate attributeName="opacity" values="0.25;0.38;0.18;0.25" keyTimes="0;0.3;0.7;1" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <circle id="sun" cx="200" cy="220" r="48" fill="#ffe066" filter="url(#sunFilter)">
            <animate attributeName="cy" from="220" to="90" dur="1.5s" fill="freeze" />
          </circle>
        </g>
        {/* Birds flying left to right */}
        {/* One large white bird with flapping wings, animated left to right */}
        <g style={{
          animation: 'birdfly 1.7s 0.5s linear forwards',
          opacity: 0,
          animationFillMode: 'forwards',
        }}>
          {/* Body */}
          <ellipse cx={-50} cy={110} rx={16} ry={10} fill="#fff" stroke="#bbb" strokeWidth="2" />
          {/* Head */}
          <ellipse cx={-34} cy={104} rx={6} ry={6} fill="#fff" stroke="#bbb" strokeWidth="1.5" />
          {/* Beak */}
          <polygon points="-28,104 -24,106 -28,108" fill="#fbc02d" />
          {/* Eye */}
          <circle cx={-32} cy={103} r={1.2} fill="#222" />
          {/* Flapping wings (animated) */}
          <g>
            <path id="wingL" d="M-60,110 Q-80,100 -70,120" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round">
              <animate attributeName="d" values="M-60,110 Q-80,100 -70,120;M-60,110 Q-80,120 -70,100;M-60,110 Q-80,100 -70,120" keyTimes="0;0.5;1" dur="0.7s" repeatCount="indefinite" />
            </path>
            <path id="wingR" d="M-40,110 Q-20,100 -30,120" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round">
              <animate attributeName="d" values="M-40,110 Q-20,100 -30,120;M-40,110 Q-20,120 -30,100;M-40,110 Q-20,100 -30,120" keyTimes="0;0.5;1" dur="0.7s" repeatCount="indefinite" />
            </path>
          </g>
        </g>
        <style>{`
          @keyframes birdfly {
            0% { opacity: 0; transform: translateX(0); }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { opacity: 0; transform: translateX(480px); }
          }
        `}</style>
      </svg>
      <span style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: '70%',
        textAlign: 'center',
        fontFamily: 'Minecraftia, Segoe UI, Arial, sans-serif',
        fontSize: '2.2rem',
        color: '#222',
        textShadow: '2px 2px 0 #fff, 4px 4px 0 #3e3e3e',
        letterSpacing: '2px',
        fontWeight: 700
      }}>Notecraft is loading...</span>
      <style>{`
        @keyframes fadeout { to { opacity: 0; pointer-events: none; } }
      `}</style>
    </div>
  );
}
