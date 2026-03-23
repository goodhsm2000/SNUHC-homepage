'use client';

import { useEffect, useRef } from 'react';

const COLORS = [
  '#6366f1', '#818cf8', '#a78bfa',   // indigo / violet
  '#8b5cf6', '#c084fc',              // purple
  '#06b6d4', '#67e8f9',              // cyan
  '#10b981', '#6ee7b7',              // emerald
  '#f59e0b', '#fcd34d',              // amber
  '#ef4444', '#f87171',              // red
  '#ec4899', '#f9a8d4',              // pink
];

type ShapeType = 'triangle' | 'square' | 'diamond' | 'pentagon' | 'hexagon' | 'star' | 'circle' | 'cross';
const SHAPES: ShapeType[] = ['triangle', 'square', 'diamond', 'pentagon', 'hexagon', 'star', 'circle', 'cross'];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: ShapeType;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  decay: number;
  filled: boolean;
}

function drawShape(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = p.opacity;

  const s = p.size;

  ctx.beginPath();

  switch (p.shape) {
    case 'triangle':
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(a) * s;
        const py = Math.sin(a) * s;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      break;

    case 'square':
      ctx.rect(-s * 0.75, -s * 0.75, s * 1.5, s * 1.5);
      break;

    case 'diamond':
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.65, 0);
      ctx.lineTo(0, s);
      ctx.lineTo(-s * 0.65, 0);
      ctx.closePath();
      break;

    case 'pentagon':
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(a) * s;
        const py = Math.sin(a) * s;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      break;

    case 'hexagon':
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const px = Math.cos(a) * s;
        const py = Math.sin(a) * s;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      break;

    case 'star': {
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
        const r = i % 2 === 0 ? s : s * 0.42;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      break;
    }

    case 'circle':
      ctx.arc(0, 0, s * 0.7, 0, Math.PI * 2);
      break;

    case 'cross': {
      const w = s * 0.28;
      ctx.rect(-w, -s, w * 2, s * 2);
      ctx.rect(-s, -w, s * 2, w * 2);
      break;
    }
  }

  if (p.filled) {
    ctx.fillStyle = p.color;
    ctx.fill();
  } else {
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  ctx.restore();
}

export default function CursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const lastSpawnRef = useRef(0);
  const mouseRef = useRef({ x: -300, y: -300 });
  const ringPosRef = useRef({ x: -300, y: -300 });
  const isHoveringRef = useRef(false);

  useEffect(() => {
    // Don't run on touch-only devices
    if (window.matchMedia('(hover: none)').matches) return;

    const canvas = canvasRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!canvas || !dot || !ring) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Hide native cursor site-wide
    document.documentElement.style.cursor = 'none';

    const spawnParticles = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.5 + 1.5;
        const size = Math.random() * 7 + 3.5;
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - Math.random() * 1.5,
          size,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.18,
          opacity: Math.random() * 0.35 + 0.65,
          decay: Math.random() * 0.016 + 0.01,
          filled: Math.random() > 0.35,
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      mouseRef.current = { x, y };

      // Update dot immediately
      dot.style.left = x + 'px';
      dot.style.top = y + 'px';

      // Spawn particles (rate-limited)
      const now = performance.now();
      if (now - lastSpawnRef.current > 28) {
        lastSpawnRef.current = now;
        spawnParticles(x, y, Math.random() < 0.55 ? 2 : 1);
      }
    };

    const onMouseEnterInteractive = () => {
      isHoveringRef.current = true;
      dot.style.width = '12px';
      dot.style.height = '12px';
      dot.style.background = 'rgba(99,102,241,1)';
    };

    const onMouseLeaveInteractive = () => {
      isHoveringRef.current = false;
      dot.style.width = '8px';
      dot.style.height = '8px';
      dot.style.background = 'rgba(99,102,241,0.85)';
    };

    const onMouseLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onMouseEnter = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    // Attach hover listeners to interactive elements
    const interactiveSelectors = 'a, button, input, textarea, select, [role="button"], label';
    const attachHoverListeners = () => {
      document.querySelectorAll(interactiveSelectors).forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
    attachHoverListeners();

    // Re-attach on DOM changes (for dynamic content)
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth ring tracking (lerp)
      ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.12;
      ring.style.left = ringPosRef.current.x + 'px';
      ring.style.top = ringPosRef.current.y + 'px';

      // Update & draw particles
      particlesRef.current = particlesRef.current.filter((p) => p.opacity > 0.015);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.07;      // gravity
        p.vx *= 0.97;      // air resistance
        p.vy *= 0.97;
        p.rotation += p.rotationSpeed;
        p.opacity -= p.decay;
        drawShape(ctx, p);
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      observer.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <>
      {/* Custom cursor dot (snaps immediately) */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 10000,
          left: -300,
          top: -300,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'rgba(99,102,241,0.85)',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 8px rgba(99,102,241,0.7), 0 0 16px rgba(99,102,241,0.3)',
          transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease, opacity 0.3s ease',
        }}
      />

      {/* Trailing ring (follows with lag via JS lerp) */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          left: -300,
          top: -300,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(99,102,241,0.45)',
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.3s ease',
          boxShadow: '0 0 6px rgba(99,102,241,0.2)',
        }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />
    </>
  );
}
