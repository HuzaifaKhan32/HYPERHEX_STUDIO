'use client';

import { useEffect, useRef } from 'react';

const SPACING = 12;
const DOT_RADIUS = 1.5;
const GLOW_RADIUS = 140;
const CYAN = '21, 182, 232';

type DotGridBackgroundProps = {
  containerRef?: React.RefObject<HTMLElement | null>;
};

export default function DotGridBackground({ containerRef }: DotGridBackgroundProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const eventTarget = () => containerRef?.current ?? wrapper;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let frameId = 0;
    let isVisible = true;
    let isMouseActive = false;

    const resize = () => {
      const { width, height } = wrapper.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawStatic();
    };

    const renderGrid = () => {
      const width = wrapper.clientWidth;
      const height = wrapper.clientHeight;
      if (width <= 0 || height <= 0) return;

      const { x: mx, y: my } = mouseRef.current;
      ctx.clearRect(0, 0, width, height);

      const hasActiveMouse = mx >= 0 && my >= 0;

      for (let x = SPACING / 2; x < width; x += SPACING) {
        for (let y = SPACING / 2; y < height; y += SPACING) {
          let radius = DOT_RADIUS;
          let opacity = 0.22;
          let glow = 0;

          if (hasActiveMouse) {
            const dist = Math.hypot(x - mx, y - my);
            if (dist < GLOW_RADIUS) {
              const t = Math.max(0, 1 - dist / GLOW_RADIUS);
              glow = reducedMotion ? 0 : t * t;
              radius = DOT_RADIUS + glow * 2.5;
              opacity = 0.22 + glow * 0.78;
            }
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);

          if (glow > 0.08) {
            ctx.shadowBlur = 6 + glow * 18;
            ctx.shadowColor = `rgba(${CYAN}, ${0.4 + glow * 0.6})`;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.fillStyle = `rgba(${CYAN}, ${opacity})`;
          ctx.fill();
        }
      }

      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.65
      );
      vignette.addColorStop(0, 'rgba(10, 10, 10, 0)');
      vignette.addColorStop(1, 'rgba(10, 10, 10, 0.55)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    };

    const drawStatic = () => {
      if (frameId) cancelAnimationFrame(frameId);
      renderGrid();
    };

    const requestDraw = () => {
      if (!isVisible) return;
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        renderGrid();
        if (isMouseActive) {
          // Continue loop while mouse is actively interacting
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) return;
      const target = eventTarget();
      const rect = target.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      isMouseActive = true;
      requestDraw();
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
      isMouseActive = false;
      drawStatic();
    };

    resize();

    const target = eventTarget();
    target.addEventListener('mousemove', handleMouseMove, { passive: true });
    target.addEventListener('mouseleave', handleMouseLeave);

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(wrapper);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible) {
          drawStatic();
        } else if (frameId) {
          cancelAnimationFrame(frameId);
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(wrapper);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      target.removeEventListener('mousemove', handleMouseMove);
      target.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [containerRef]);

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
    >
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  );
}
