"use client";
import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el: any, slot: any, skew: number) =>
  gsap.set(el, {
    x: slot.x, y: slot.y, z: slot.z,
    xPercent: -50, yPercent: -50,
    skewY: skew, transformOrigin: 'center center',
    zIndex: slot.zIndex, force3D: true
  });

export default function CardSwap({
  width = 600, height = 450, cardDistance = 40, verticalDistance = 40,
  delay = 4000, pauseOnHover = true, onCardClick, skewAmount = 4,
  easing = 'power1.inOut', children
}: any) {
  const config = easing === 'elastic'
    ? { ease: 'elastic.out(0.6,0.9)', durDrop: 2, durMove: 2, durReturn: 2, promoteOverlap: 0.9, returnDelay: 0.05 }
    : { ease: 'power1.inOut', durDrop: 0.8, durMove: 0.8, durReturn: 0.8, promoteOverlap: 0.45, returnDelay: 0.2 };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr.length]);
  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef<any>(null);
  const intervalRef = useRef<any>(null);
  const container = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const swap = () => {
      if (pausedRef.current) return;
      if (order.current.length < 2) return;
      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, { y: '+=400', duration: config.durDrop, ease: config.ease });
      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, ease: config.ease }, `promote+=${i * 0.15}`);
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(() => { gsap.set(elFront, { zIndex: backSlot.zIndex }); }, undefined, 'return');
      tl.to(elFront, { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: config.durReturn, ease: config.ease }, 'return');
      tl.call(() => { order.current = [...rest, front]; });
    };

    const stopAutoPlay = () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const startAutoPlay = () => {
      stopAutoPlay();
      intervalRef.current = window.setInterval(swap, delay);
    };

    startAutoPlay();

    if (pauseOnHover) {
      const node = container.current;
      if (!node) return;
      const pause = () => {
        pausedRef.current = true;
        tlRef.current?.pause();
        stopAutoPlay();
      };
      const resume = () => {
        pausedRef.current = false;
        tlRef.current?.play();
        startAutoPlay();
      };
      node.addEventListener('pointerenter', pause);
      node.addEventListener('pointerleave', resume);
      return () => {
        node.removeEventListener('pointerenter', pause);
        node.removeEventListener('pointerleave', resume);
        stopAutoPlay();
        tlRef.current?.kill();
      };
    }
    return () => {
      stopAutoPlay();
      tlRef.current?.kill();
    };
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child: any, i) => {
    if (isValidElement(child)) {
      const childProps = (child.props || {}) as Record<string, any>;
      return cloneElement(child as React.ReactElement<any>, {
        key: i,
        ref: refs[i],
        style: { width, height, ...(childProps.style ?? {}) },
        onClick: (e: any) => {
          childProps.onClick?.(e);
          if (e.defaultPrevented || e.target.closest?.('a')) return;
          onCardClick?.(i);
        }
      } as any);
    }
    return child;
  });

  return <div ref={container} className="card-swap-container" style={{ width, height }}>{rendered}</div>;
}
