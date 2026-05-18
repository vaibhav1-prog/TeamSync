import { useEffect, useRef } from "react";

/**
 * BlockchainBg – renders an animated 3-D wireframe-cube network
 * on a canvas that fills its parent (position: absolute, inset: 0).
 *
 * Visual design matches the dark-navy reference image:
 *   • Very dark navy/black background  (#050c18)
 *   • Semi-transparent, outlined 3-D cubes in an isometric-ish perspective
 *   • Thin connector lines between nearby cubes
 *   • Subtle blue/cyan glow on cube edges
 *   • Cubes drift slowly; parallax depth via z-position
 */

const W = 1920;  // logical canvas width (scaled via CSS)
const H = 1080;

const CUBE_COUNT  = 22;
const LINE_DIST   = 320;   // max px distance to draw connector lines
const SPEED_SCALE = 0.18;  // drift speed multiplier

/* ---- colour helpers -------------------------------------------------- */
function rgba(r, g, b, a) { return `rgba(${r},${g},${b},${a})`; }

/* ---- isometric cube projection --------------------------------------- */
// Draws a simple 3-D-looking box given a center (cx, cy), half-size s,
// and a depth factor d ∈ [0,1] (0 = far / dim, 1 = near / bright).
function drawCube(ctx, cx, cy, s, d) {
  // Brightness & opacity scale with depth
  const alpha   = 0.10 + d * 0.22;       // face fill opacity
  const edge    = 0.18 + d * 0.42;       // edge stroke opacity
  const glowA   = 0.06 + d * 0.18;       // glow opacity

  // 3-D offset ratios (isometric-ish, skewed)
  const ox = s * 0.55;   // horizontal x-offset for right face
  const oy = s * 0.30;   // vertical   y-offset for top face

  // Eight corner points (approximate isometric projection)
  // Front face corners
  const fl = { x: cx - s,     y: cy };         // front-left
  const fr = { x: cx + s,     y: cy };         // front-right
  const ft = { x: cx,         y: cy - s };     // front-top   (center top)
  const fb = { x: cx,         y: cy + s };     // front-bottom

  // Top face (parallelogram)
  const tl  = { x: cx - s,      y: cy - s + oy };
  const tr  = { x: cx + s,      y: cy - s + oy };
  const ttr = { x: cx + s + ox, y: cy - s + oy - oy };
  const ttl = { x: cx - s + ox, y: cy - s + oy - oy };  // unused but here for clarity

  // Right face (parallelogram)
  const rbr = { x: cx + s + ox, y: cy + oy };
  const rtr = { x: cx + s + ox, y: cy - s + oy - oy };

  // Glow pass first
  ctx.save();
  ctx.shadowColor = rgba(40, 120, 220, glowA * 4);
  ctx.shadowBlur  = 18 * d;

  const ec = rgba(80, 160, 255, edge);
  const fc = rgba(10, 30, 80,  alpha);

  // ── Top face ──
  ctx.beginPath();
  ctx.moveTo(cx - s, cy - s + oy);
  ctx.lineTo(cx,     cy - s);
  ctx.lineTo(cx + s, cy - s + oy);
  ctx.lineTo(cx,     cy - s + oy * 2);
  ctx.closePath();
  ctx.fillStyle   = rgba(15, 40, 100, alpha * 0.7);
  ctx.fill();
  ctx.strokeStyle = ec;
  ctx.lineWidth   = 0.7;
  ctx.stroke();

  // ── Left face ──
  ctx.beginPath();
  ctx.moveTo(cx - s, cy - s + oy);
  ctx.lineTo(cx,     cy - s + oy * 2);
  ctx.lineTo(cx,     cy + s * 0.4 + oy);
  ctx.lineTo(cx - s, cy + s * 0.4);
  ctx.closePath();
  ctx.fillStyle   = fc;
  ctx.fill();
  ctx.strokeStyle = ec;
  ctx.lineWidth   = 0.7;
  ctx.stroke();

  // ── Right face ──
  ctx.beginPath();
  ctx.moveTo(cx,     cy - s + oy * 2);
  ctx.lineTo(cx + s, cy - s + oy);
  ctx.lineTo(cx + s, cy + s * 0.4);
  ctx.lineTo(cx,     cy + s * 0.4 + oy);
  ctx.closePath();
  ctx.fillStyle   = rgba(8, 22, 65, alpha * 1.15);
  ctx.fill();
  ctx.strokeStyle = ec;
  ctx.lineWidth   = 0.7;
  ctx.stroke();

  ctx.restore();
}

/* ---- component ------------------------------------------------------- */
export default function BlockchainBg({ className = "", style = {} }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Resize to fill parent element
    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* ---- cube state -------------------------------------------------- */
    function makeCube() {
      const z = Math.random();            // depth 0..1
      const baseSize = 28 + z * 46;      // far cubes smaller
      return {
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        z,
        s:  baseSize,
        vx: (Math.random() - 0.5) * SPEED_SCALE * (0.3 + z * 0.7),
        vy: (Math.random() - 0.5) * SPEED_SCALE * (0.3 + z * 0.7),
      };
    }

    const cubes = Array.from({ length: CUBE_COUNT }, makeCube);

    /* ---- animation loop ---------------------------------------------- */
    function draw() {
      const W = canvas.width;
      const H = canvas.height;

      // Background
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#05090f";
      ctx.fillRect(0, 0, W, H);

      // Subtle radial blue glow bottom-right (matches reference)
      const gr = ctx.createRadialGradient(W * 0.82, H * 0.72, 0, W * 0.82, H * 0.72, W * 0.38);
      gr.addColorStop(0, "rgba(14,60,160,0.22)");
      gr.addColorStop(1, "transparent");
      ctx.fillStyle = gr;
      ctx.fillRect(0, 0, W, H);

      // Move cubes & wrap
      cubes.forEach(c => {
        c.x += c.vx;
        c.y += c.vy;
        if (c.x < -80)  c.x = W + 80;
        if (c.x > W+80) c.x = -80;
        if (c.y < -80)  c.y = H + 80;
        if (c.y > H+80) c.y = -80;
      });

      // Draw connector lines first (behind cubes)
      for (let i = 0; i < cubes.length; i++) {
        for (let j = i + 1; j < cubes.length; j++) {
          const a = cubes[i], b = cubes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist > LINE_DIST) continue;

          const alpha = (1 - dist / LINE_DIST) * 0.18 * ((a.z + b.z) / 2 + 0.15);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(60,130,255,${alpha})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }

      // Draw cubes (sorted back-to-front so near ones render on top)
      const sorted = [...cubes].sort((a, b) => a.z - b.z);
      sorted.forEach(c => drawCube(ctx, c.x, c.y, c.s, c.z));

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
