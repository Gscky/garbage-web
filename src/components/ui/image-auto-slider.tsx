"use client";

import { useEffect, useRef } from 'react';

interface ImageAutoSliderProps {
  images: string[];
  alts?: string[];
  height?: number;
}

export function ImageAutoSlider({ images, alts, height = 180 }: ImageAutoSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const wrapper = track?.parentElement;
    if (!track || !wrapper) return;

    let pos = 0;
    const speed = 0.5;
    let raf: number;
    let hovering = false;
    let dragging = false;
    let dragStartX = 0;
    let posAtDragStart = 0;
    let isVisible = true;

    // Pause animation when scrolled out of view
    const io = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(wrapper);

    const getTotalWidth = () => track.scrollWidth / 2;

    const animate = () => {
      if (!hovering && !dragging && isVisible) {
        const total = getTotalWidth();
        pos += speed;
        if (pos >= total) pos = 0;
        track.style.transform = `translateX(-${pos}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    // Hover pause
    const onMouseEnter = () => { hovering = true; };
    const onMouseLeave = () => { if (!dragging) hovering = false; };
    wrapper.addEventListener('mouseenter', onMouseEnter);
    wrapper.addEventListener('mouseleave', onMouseLeave);

    // Drag / swipe support
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      hovering = true;
      dragStartX = e.clientX;
      posAtDragStart = pos;
      wrapper.setPointerCapture(e.pointerId);
      wrapper.style.cursor = 'grabbing';
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const delta = dragStartX - e.clientX;
      const total = getTotalWidth();
      let newPos = posAtDragStart + delta;
      newPos = ((newPos % total) + total) % total;
      pos = newPos;
      track.style.transform = `translateX(-${pos}px)`;
    };

    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      hovering = false;
      wrapper.style.cursor = 'grab';
    };

    wrapper.addEventListener('pointerdown', onPointerDown);
    wrapper.addEventListener('pointermove', onPointerMove);
    wrapper.addEventListener('pointerup', onPointerUp);
    wrapper.addEventListener('pointercancel', onPointerUp);
    wrapper.style.cursor = 'grab';

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      wrapper.removeEventListener('mouseenter', onMouseEnter);
      wrapper.removeEventListener('mouseleave', onMouseLeave);
      wrapper.removeEventListener('pointerdown', onPointerDown);
      wrapper.removeEventListener('pointermove', onPointerMove);
      wrapper.removeEventListener('pointerup', onPointerUp);
      wrapper.removeEventListener('pointercancel', onPointerUp);
    };
  }, [images]);

  const doubled = [...images, ...images];

  return (
    <div
      style={{
        width: '100%',
        overflow: 'hidden',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
        maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
        userSelect: 'none',
        touchAction: 'pan-y',
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: '12px',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              height: `${height}px`,
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(10,22,40,0.1)',
            }}
          >
            <img
              src={src}
              alt={alts?.[i % images.length] ?? ''}
              draggable={false}
              loading="lazy"
              decoding="async"
              style={{
                height: '100%',
                width: 'auto',
                objectFit: 'cover',
                display: 'block',
                pointerEvents: 'none',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
