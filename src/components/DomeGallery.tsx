import { useEffect, useMemo, useRef, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';

// ─── Types ────────────────────────────────────────────────────────────────────

type ImageItem = string | { src: string; alt?: string };

type DomeGalleryProps = {
  images?: ImageItem[];
  fit?: number;
  fitBasis?: 'auto' | 'min' | 'max' | 'width' | 'height';
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  /** unused – kept so callers don't break */
  enlargeTransitionMs?: number;
  segments?: number;
  dragDampening?: number;
  /** unused – kept so callers don't break */
  openedImageWidth?: string;
  /** unused – kept so callers don't break */
  openedImageHeight?: string;
  imageBorderRadius?: string;
  /** unused – kept so callers don't break */
  openedImageBorderRadius?: string;
  grayscale?: boolean;
};

type ItemDef = {
  src: string;
  alt: string;
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
};

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_IMAGES: ImageItem[] = [
  { src: 'https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?q=80&w=774&auto=format&fit=crop', alt: 'Abstract art' },
  { src: 'https://images.unsplash.com/photo-1755569309049-98410b94f66d?q=80&w=772&auto=format&fit=crop', alt: 'Modern sculpture' },
  { src: 'https://images.unsplash.com/photo-1755497595318-7e5e3523854f?q=80&w=774&auto=format&fit=crop', alt: 'Digital artwork' },
  { src: 'https://images.unsplash.com/photo-1755353985163-c2a0fe5ac3d8?q=80&w=774&auto=format&fit=crop', alt: 'Contemporary art' },
  { src: 'https://images.unsplash.com/photo-1745965976680-d00be7dc0377?q=80&w=774&auto=format&fit=crop', alt: 'Geometric pattern' },
  { src: 'https://images.unsplash.com/photo-1752588975228-21f44630bb3c?q=80&w=774&auto=format&fit=crop', alt: 'Textured surface' },
];

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  segments: 35,
};

// ─── Pure helpers ─────────────────────────────────────────────────────────────

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);
const wrapAngleSigned = (deg: number) => { const a = (((deg + 180) % 360) + 360) % 360; return a - 180; };

function buildItems(pool: ImageItem[], seg: number): ItemDef[] {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs  = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;

  if (pool.length === 0) return coords.map(c => ({ ...c, src: '', alt: '' }));

  const normalized = pool.map(img =>
    typeof img === 'string' ? { src: img, alt: '' } : { src: img.src || '', alt: img.alt || '' }
  );

  const used = Array.from({ length: totalSlots }, (_, i) => normalized[i % normalized.length]);

  // Spread repeated consecutive images
  for (let i = 1; i < used.length; i++) {
    if (used[i].src === used[i - 1].src) {
      for (let j = i + 1; j < used.length; j++) {
        if (used[j].src !== used[i].src) {
          [used[i], used[j]] = [used[j], used[i]];
          break;
        }
      }
    }
  }

  return coords.map((c, i) => ({ ...c, src: used[i].src, alt: used[i].alt }));
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DomeGallery({
  images = DEFAULT_IMAGES,
  fit = 0.5,
  fitBasis = 'auto',
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = '#06172b',
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  imageBorderRadius = '10px',
  grayscale = false,
}: DomeGalleryProps) {
  const rootRef   = useRef<HTMLDivElement>(null);
  const mainRef   = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);

  // Rotation state
  const rotationRef  = useRef({ x: 0, y: 0 });
  const startRotRef  = useRef({ x: 0, y: 0 });
  const startPosRef  = useRef<{ x: number; y: number } | null>(null);
  const draggingRef  = useRef(false);
  const pointerTypeRef = useRef<'mouse' | 'pen' | 'touch'>('mouse');

  // Inertia
  const inertiaRAF = useRef<number | null>(null);

  // Idle drift
  const idleRAF      = useRef<number | null>(null);
  const idleActive   = useRef(false);
  const lastInteract = useRef(performance.now());

  // ── Apply transform ──────────────────────────────────────────────────────
  const applyTransform = useCallback((xDeg: number, yDeg: number) => {
    const el = sphereRef.current;
    if (!el) return;
    el.style.transform =
      `translateZ(calc(var(--radius) * -1)) ` +
      `rotateX(${xDeg}deg) ` +
      `rotateY(${yDeg}deg)`;
  }, []);

  // ── Resize / radius ──────────────────────────────────────────────────────
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width);
      const h = Math.max(1, cr.height);
      const minDim = Math.min(w, h);
      const maxDim = Math.max(w, h);
      const aspect = w / h;

      let basis: number;
      switch (fitBasis) {
        case 'min':    basis = minDim; break;
        case 'max':    basis = maxDim; break;
        case 'width':  basis = w;      break;
        case 'height': basis = h;      break;
        default:       basis = aspect >= 1.3 ? w : minDim;
      }

      let radius = basis * fit;
      radius = Math.min(radius, h * 1.35);
      radius = clamp(radius, minRadius, maxRadius);
      radius = Math.round(radius);

      const viewerPad = Math.max(8, Math.round(minDim * padFactor));
      root.style.setProperty('--radius', `${radius}px`);
      root.style.setProperty('--viewer-pad', `${viewerPad}px`);
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);
      root.style.setProperty('--tile-radius', imageBorderRadius);
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'saturate(0.95) contrast(1.03)');
      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [fit, fitBasis, minRadius, maxRadius, padFactor, overlayBlurColor, grayscale, imageBorderRadius, applyTransform]);

  // Initial transform
  useEffect(() => { applyTransform(0, 0); }, [applyTransform]);

  // ── Inertia ──────────────────────────────────────────────────────────────
  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback((vx: number, vy: number) => {
    const MAX_V = 1.4;
    let vX = clamp(vx, -MAX_V, MAX_V) * 80;
    let vY = clamp(vy, -MAX_V, MAX_V) * 80;
    let frames = 0;
    const d = clamp(dragDampening ?? 0.6, 0, 1);
    const frictionMul   = 0.94 + 0.055 * d;
    const stopThreshold = 0.015 - 0.01 * d;
    const maxFrames     = Math.round(90 + 270 * d);

    const step = () => {
      vX *= frictionMul;
      vY *= frictionMul;
      if ((Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) || ++frames > maxFrames) {
        inertiaRAF.current = null;
        return;
      }
      const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
      const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
      rotationRef.current = { x: nextX, y: nextY };
      applyTransform(nextX, nextY);
      inertiaRAF.current = requestAnimationFrame(step);
    };
    stopInertia();
    inertiaRAF.current = requestAnimationFrame(step);
  }, [dragDampening, maxVerticalRotationDeg, stopInertia, applyTransform]);

  // ── Idle drift ───────────────────────────────────────────────────────────
  // One full rotation every ~220 s ≈ 0.00163 deg/frame @60fps — nearly imperceptible.
  const DEG_PER_MS = 360 / (220 * 1000);
  const IDLE_DELAY_MS = 4000; // start drifting 4 s after last interaction
  const idleLastTime = useRef<number | null>(null);

  const stopIdle = useCallback(() => {
    if (idleRAF.current) { cancelAnimationFrame(idleRAF.current); idleRAF.current = null; }
    idleActive.current = false;
    idleLastTime.current = null;
  }, []);

  const startIdle = useCallback(() => {
    if (idleActive.current) return;
    idleActive.current = true;

    const step = (now: number) => {
      if (!idleActive.current) return;
      if (draggingRef.current || inertiaRAF.current) {
        // Inertia or drag in progress — don't compete
        idleLastTime.current = null;
        idleRAF.current = requestAnimationFrame(step);
        return;
      }
      if (idleLastTime.current !== null) {
        const dt = now - idleLastTime.current;
        const delta = DEG_PER_MS * dt;
        const nextY = wrapAngleSigned(rotationRef.current.y + delta);
        rotationRef.current = { ...rotationRef.current, y: nextY };
        applyTransform(rotationRef.current.x, nextY);
      }
      idleLastTime.current = now;
      idleRAF.current = requestAnimationFrame(step);
    };
    idleRAF.current = requestAnimationFrame(step);
  }, [applyTransform, DEG_PER_MS]);

  // Idle manager — watches for inactivity
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // IntersectionObserver: only drift when visible
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (!visible) stopIdle();
    }, { threshold: 0.1 });
    if (rootRef.current) io.observe(rootRef.current);

    // Page visibility
    const onVisibility = () => { if (document.hidden) stopIdle(); };
    document.addEventListener('visibilitychange', onVisibility);

    const idleTimer = setInterval(() => {
      if (!visible || document.hidden || draggingRef.current || inertiaRAF.current) return;
      if (performance.now() - lastInteract.current >= IDLE_DELAY_MS) {
        startIdle();
      }
    }, 500);

    return () => {
      clearInterval(idleTimer);
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      stopIdle();
    };
  }, [startIdle, stopIdle, IDLE_DELAY_MS]);

  // ── Gesture handling — drag only, no tap/click ───────────────────────────
  useGesture(
    {
      onDragStart: ({ event }) => {
        stopInertia();
        stopIdle();
        lastInteract.current = performance.now();

        const evt = event as PointerEvent;
        pointerTypeRef.current = (evt.pointerType as 'mouse' | 'pen' | 'touch') || 'mouse';
        draggingRef.current = true;
        startRotRef.current  = { ...rotationRef.current };
        startPosRef.current  = { x: evt.clientX, y: evt.clientY };
      },

      onDrag: ({ event, last, velocity: velArr = [0, 0], direction: dirArr = [0, 0], movement }) => {
        if (!draggingRef.current || !startPosRef.current) return;

        const evt = event as PointerEvent;
        const dxTotal = evt.clientX - startPosRef.current.x;
        const dyTotal = evt.clientY - startPosRef.current.y;

        const horizontalIntent =
          Math.abs(dxTotal) > Math.abs(dyTotal) &&
          Math.abs(dxTotal) > 8;

        // On touch, only intercept if horizontal
        if (pointerTypeRef.current === 'touch') {
          if (!horizontalIntent) {
            if (last) { draggingRef.current = false; startPosRef.current = null; }
            return;
          }
          evt.preventDefault();
        }

        if (horizontalIntent) {
          const nextX = clamp(
            startRotRef.current.x - dyTotal / dragSensitivity,
            -maxVerticalRotationDeg,
            maxVerticalRotationDeg
          );
          const nextY = startRotRef.current.y + dxTotal / dragSensitivity;
          if (rotationRef.current.x !== nextX || rotationRef.current.y !== nextY) {
            rotationRef.current = { x: nextX, y: nextY };
            applyTransform(nextX, nextY);
          }
        }

        if (last) {
          draggingRef.current  = false;
          startPosRef.current  = null;
          lastInteract.current = performance.now();

          let [vMagX, vMagY] = velArr;
          const [dirX, dirY] = dirArr;
          let vx = vMagX * dirX;
          let vy = vMagY * dirY;

          if (Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
            const [mx, my] = movement;
            vx = (mx / dragSensitivity) * 0.02;
            vy = (my / dragSensitivity) * 0.02;
          }

          if (horizontalIntent && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)) {
            startInertia(vx, vy);
          }
        }
      },
    },
    { target: mainRef, eventOptions: { passive: false } }
  );

  // Cleanup on unmount
  useEffect(() => () => { stopInertia(); stopIdle(); }, [stopInertia, stopIdle]);

  // ── Items ────────────────────────────────────────────────────────────────
  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  // ── Inline CSS ───────────────────────────────────────────────────────────
  const cssStyles = `
    .sphere-root {
      --radius: 520px;
      --viewer-pad: 72px;
      --circ: calc(var(--radius) * 3.14);
      --rot-y: calc((360deg / var(--segments-x)) / 2);
      --rot-x: calc((360deg / var(--segments-y)) / 2);
      --item-width:  calc(var(--circ) / var(--segments-x));
      --item-height: calc(var(--circ) / var(--segments-y));
    }
    .sphere-root * { box-sizing: border-box; }
    .sphere, .sphere-item, .item__image { transform-style: preserve-3d; }

    .stage {
      width: 100%; height: 100%;
      display: grid; place-items: center;
      position: absolute; inset: 0; margin: auto;
      perspective: calc(var(--radius) * 2);
      perspective-origin: 50% 50%;
    }

    .sphere {
      transform: translateZ(calc(var(--radius) * -1));
      will-change: transform;
      position: absolute;
    }

    .sphere-item {
      width:  calc(var(--item-width)  * var(--item-size-x));
      height: calc(var(--item-height) * var(--item-size-y));
      position: absolute;
      top: -999px; bottom: -999px; left: -999px; right: -999px;
      margin: auto;
      transform-origin: 50% 50%;
      backface-visibility: hidden;
      transform:
        rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2))))
        rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2))))
        translateZ(var(--radius));
    }

    .item__image {
      position: absolute;
      inset: 10px;
      border-radius: var(--tile-radius, 10px);
      overflow: hidden;
      cursor: grab;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
      pointer-events: auto;
    }

    .item__image img {
      width: 100%; height: 100%;
      object-fit: cover;
      pointer-events: none;
      draggable: false;
      filter: var(--image-filter, saturate(0.95) contrast(1.03));
      opacity: 1;
    }
  `;

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      <div
        ref={rootRef}
        className="sphere-root relative w-full h-full"
        style={{
          ['--segments-x' as string]: segments,
          ['--segments-y' as string]: segments,
          ['--overlay-blur-color' as string]: overlayBlurColor,
          ['--tile-radius' as string]: imageBorderRadius,
          ['--image-filter' as string]: grayscale ? 'grayscale(1)' : 'saturate(0.95) contrast(1.03)',
        } as React.CSSProperties}
      >
        <main
          ref={mainRef}
          aria-label="Blue Moon atmosphere gallery"
          className="absolute inset-0 grid place-items-center overflow-hidden select-none bg-transparent"
          style={{ touchAction: 'pan-y', WebkitUserSelect: 'none', cursor: 'grab' }}
        >
          <div className="stage">
            <div ref={sphereRef} className="sphere">
              {items.map((it, i) => (
                <div
                  key={`${it.x},${it.y},${i}`}
                  className="sphere-item absolute m-auto"
                  style={{
                    ['--offset-x' as string]: it.x,
                    ['--offset-y' as string]: it.y,
                    ['--item-size-x' as string]: it.sizeX,
                    ['--item-size-y' as string]: it.sizeY,
                    top: '-999px', bottom: '-999px', left: '-999px', right: '-999px',
                  } as React.CSSProperties}
                >
                  <div
                    className="item__image"
                    role="presentation"
                    style={{
                      inset: '10px',
                      borderRadius: `var(--tile-radius, ${imageBorderRadius})`,
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <img
                      src={it.src}
                      alt={it.alt || ''}
                      draggable={false}
                      className="w-full h-full object-cover pointer-events-none"
                      style={{ backfaceVisibility: 'hidden' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Radial vignette */}
          <div
            className="absolute inset-0 m-auto z-[3] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(235,235,235,0) 65%, var(--overlay-blur-color, ${overlayBlurColor}) 100%)`
            }}
          />

          {/* Edge blur */}
          <div
            className="absolute inset-0 m-auto z-[3] pointer-events-none"
            style={{
              WebkitMaskImage: `radial-gradient(rgba(235,235,235,0) 70%, var(--overlay-blur-color, ${overlayBlurColor}) 90%)`,
              maskImage:       `radial-gradient(rgba(235,235,235,0) 70%, var(--overlay-blur-color, ${overlayBlurColor}) 90%)`,
              backdropFilter:  'blur(3px)',
            }}
          />

          {/* Top fade */}
          <div
            className="absolute left-0 right-0 top-0 h-[120px] z-[5] pointer-events-none rotate-180"
            style={{ background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))` }}
          />
          {/* Bottom fade */}
          <div
            className="absolute left-0 right-0 bottom-0 h-[120px] z-[5] pointer-events-none"
            style={{ background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))` }}
          />
        </main>
      </div>
    </>
  );
}
