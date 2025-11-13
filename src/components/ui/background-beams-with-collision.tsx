'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [docHeight, setDocHeight] = useState<number>(
    typeof window !== 'undefined' ? document.documentElement.scrollHeight : 0
  );

  // update document height on resize / load / orientation change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const update = () => {
      setDocHeight(document.documentElement.scrollHeight || window.innerHeight);
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    // also update after a short delay to catch late-rendered content
    const t = setTimeout(update, 500);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
      clearTimeout(t);
    };
  }, []);

  // beams definition — translateY will be dynamically set to docHeight + offset
  const beamsBase = [
    { initialX: 10, translateX: 10, duration: 7, repeatDelay: 3, delay: 2 },
    { initialX: 600, translateX: 600, duration: 3, repeatDelay: 3, delay: 4 },
    { initialX: 100, translateX: 100, duration: 7, repeatDelay: 7, className: 'h-6' },
    { initialX: 400, translateX: 400, duration: 5, repeatDelay: 14, delay: 4 },
    { initialX: 800, translateX: 800, duration: 11, repeatDelay: 2, className: 'h-20' },
    { initialX: 1000, translateX: 1000, duration: 4, repeatDelay: 2, className: 'h-12' },
    { initialX: 1200, translateX: 1200, duration: 6, repeatDelay: 4, delay: 2, className: 'h-6' },
  ];

  // augment beams with dynamic translateY so they travel full page
  const beams = beamsBase.map((b) => ({
    ...b,
    // + 200 px buffer so the beam goes slightly past the bottom
    translateY: `${docHeight + 200}px`,
    // start slightly above viewport
    initialY: '-200px',
  }));

  return (
    <div className={cn('relative w-full', className)}>
      {/* Fixed full-page background layer (behind all content) */}
      <div
        ref={parentRef}
        className="fixed inset-0 -z-10 pointer-events-none bg-transparent"
        aria-hidden
      >
        {/* an invisible full-height container used for collision measurement */}
        <div
          ref={containerRef}
          // ensure this container's height matches the full document so collisions are measured correctly
          style={{ height: typeof window !== 'undefined' ? `${docHeight}px` : '100vh' }}
          className="absolute top-0 left-0 w-full"
        />
        {/* Render beams as absolute elements inside the fixed layer */}
        {beams.map((beam) => (
          <CollisionMechanism
            key={`${beam.initialX}-${beam.delay ?? 0}-${beam.duration}`}
            beamOptions={beam}
            containerRef={containerRef}
            parentRef={parentRef}
          />
        ))}
      </div>

      {/* Content (children) sits above the background */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const CollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    containerRef: React.RefObject<HTMLDivElement | null>;
    parentRef: React.RefObject<HTMLDivElement | null>;
    beamOptions?: {
      initialX?: number;
      translateX?: number;
      initialY?: string | number;
      translateY?: string | number;
      rotate?: number;
      className?: string;
      duration?: number;
      delay?: number;
      repeatDelay?: number;
    };
  }
>(({ parentRef, containerRef, beamOptions = {} }, ref) => {
  const beamRef = useRef<HTMLDivElement | null>(null);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({ detected: false, coordinates: null });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  // Poll for collision — we measure beam vs. container bottom position
  useEffect(() => {
    const checkCollision = () => {
      if (!beamRef.current || !containerRef.current || !parentRef.current || cycleCollisionDetected)
        return;

      const beamRect = beamRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const parentRect = parentRef.current.getBoundingClientRect();

      // We want collision near the bottom area of the document.
      // containerRect is full document area (top=0 normally). We'll compute desired collision Y
      // as containerRect.top + containerRect.height - footerOffset (approx).
      // Footer offset of 120 px makes the "spark" appear slightly above absolute bottom.
      const footerOffset = 120;
      const collisionYAbsolute = containerRect.top + containerRect.height - footerOffset;

      if (beamRect.bottom >= collisionYAbsolute) {
        const relativeX = beamRect.left - parentRect.left + beamRect.width / 2;
        const relativeY = collisionYAbsolute - parentRect.top;
        setCollision({
          detected: true,
          coordinates: { x: relativeX, y: relativeY },
        });
        setCycleCollisionDetected(true);
      }
    };

    const t = setInterval(checkCollision, 60);
    return () => clearInterval(t);
  }, [cycleCollisionDetected, containerRef, parentRef]);

  // reset collision state after a moment so the beam can repeat collisions
  useEffect(() => {
    if (collision.detected) {
      const reset1 = setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 1800);

      const reset2 = setTimeout(() => setBeamKey((k) => k + 1), 2000);

      return () => {
        clearTimeout(reset1);
        clearTimeout(reset2);
      };
    }
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        animate="animate"
        initial={{
          translateY: beamOptions.initialY ?? '-200px',
          translateX: beamOptions.initialX ?? 0,
          rotate: beamOptions.rotate ?? 0,
        }}
        variants={{
          animate: {
            translateY: beamOptions.translateY ?? '6000px',
            translateX: beamOptions.translateX ?? 0,
            rotate: beamOptions.rotate ?? 0,
          },
        }}
        transition={{
          duration: beamOptions.duration ?? 280,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
          delay: beamOptions.delay ?? 0,
          repeatDelay: beamOptions.repeatDelay ?? 0,
        }}
        className={cn(
          'absolute left-0 top-0 m-auto w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent',
          beamOptions.className ?? 'h-14'
        )}
        style={{
          // position X using translateX for left offset
          transform: `translateX(${beamOptions.initialX ?? 0}px)`,
        }}
      />

      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
});

CollisionMechanism.displayName = 'CollisionMechanism';

const Explosion = ({ ...props }: React.HTMLProps<HTMLDivElement>) => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 120 - 60),
    directionY: Math.floor(Math.random() * -80 - 30),
  }));

  return (
    <div {...props} className={cn('absolute z-50 h-2 w-2', props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"
      />
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.6, ease: 'easeOut' }}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"
        />
      ))}
    </div>
  );
};
