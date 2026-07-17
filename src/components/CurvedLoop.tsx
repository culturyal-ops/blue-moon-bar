import { useRef, useEffect, useState, useMemo, useId, type FC, type PointerEvent } from 'react';
import './CurvedLoop.css';

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: 'left' | 'right';
  interactive?: boolean;
}

const CurvedLoop: FC<CurvedLoopProps> = ({
  marqueeText = '',
  speed = 2,
  className,
  curveAmount = 80,
  direction = 'left',
  interactive = true
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const [spacing, setSpacing] = useState(0);
  const lastTimeRef = useRef<number | null>(null);
  const uid = useId();
  const pathId = `curve-${uid}`;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const dip = isMobile ? Math.min(curveAmount * 0.6, 48) : curveAmount;

  // Fixed coordinate system:
  // ViewBox: 1440 wide × (80 + dip) tall
  // Path starts at y=8 on both ends, dips to y=(8+dip) at center x=720
  // Text baseline rides along this curve so letters visibly rotate
  const VW = 1440;
  const VH = 88 + dip;
  const startY = 8;
  const midY = startY + dip;
  const pathD = `M 0,${startY} Q ${VW / 2},${midY} ${VW},${startY}`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef<'left' | 'right'>(direction);
  const velRef = useRef(0);
  const frameRef = useRef<number>(0);

  const repetitions = spacing ? Math.ceil((VW * 2) / spacing) + 4 : 6;
  const totalText = Array(repetitions).fill(text).join('');
  const ready = spacing > 0;

  useEffect(() => {
    const measure = () => {
      if (measureRef.current) {
        setSpacing(measureRef.current.getComputedTextLength());
      }
    };
    measure();
    document.fonts?.ready.then(measure);
    const observer = new ResizeObserver(measure);
    if (measureRef.current) observer.observe(measureRef.current);
    return () => observer.disconnect();
  }, [text, className]);

  useEffect(() => {
    if (!spacing || !textPathRef.current) return;
    textPathRef.current.setAttribute('startOffset', `-${spacing}px`);
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready) return;

    const step = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const delta = Math.min(32, time - lastTimeRef.current);
      lastTimeRef.current = time;

      if (!dragRef.current && textPathRef.current) {
        const pps = speed * 40;
        const move = (pps * delta) / 1000;
        const signed = dirRef.current === 'right' ? move : -move;
        let offset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0') + signed;
        while (offset <= -spacing) offset += spacing;
        while (offset > 0) offset -= spacing;
        textPathRef.current.setAttribute('startOffset', `${offset}px`);
      }
      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [spacing, speed, ready]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) cancelAnimationFrame(frameRef.current);
  }, []);

  const onPointerDown = (e: PointerEvent) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    let offset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0') + dx;
    while (offset <= -spacing) offset += spacing;
    while (offset > 0) offset -= spacing;
    textPathRef.current.setAttribute('startOffset', `${offset}px`);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? 'right' : 'left';
  };

  return (
    <div className="curved-loop">
      <svg
        className={`curved-loop-svg ${className ?? ''}`}
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMin meet"
        width="100%"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        {/* Hidden measure text */}
        <text
          ref={measureRef}
          className="curved-loop-text"
          style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}
          xmlSpace="preserve"
        >
          {text}
        </text>

        <defs>
          <path id={pathId} d={pathD} fill="none" />
        </defs>

        {ready && (
          <text xmlSpace="preserve" className="curved-loop-text">
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset="0px">
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
