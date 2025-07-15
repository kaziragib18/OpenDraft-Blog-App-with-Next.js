'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedBackground() {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const wavePairs = [
      {
        from: 'M0,160 C360,320 1080,0 1440,160',
        to: 'M0,140 C360,280 1080,20 1440,140',
        index: 0,
        duration: 4,
      },
      {
        from: 'M0,180 C360,300 1080,40 1440,180',
        to: 'M0,160 C360,280 1080,60 1440,160',
        index: 1,
        duration: 5,
      },
      {
        from: 'M0,200 C360,280 1080,80 1440,200',
        to: 'M0,180 C360,260 1080,100 1440,180',
        index: 2,
        duration: 6,
      },
    ];

    wavePairs.forEach(({ from, to, index, duration }) => {
      const path = pathRefs.current[index];
      if (!path) return;

      // Set initial wave shape
      gsap.set(path, { attr: { d: from } });

      // Prepare stroke dash for draw animation
      const pathLength = path.getTotalLength();
      path.style.strokeDasharray = pathLength.toString();
      path.style.strokeDashoffset = pathLength.toString();

      const tl = gsap.timeline({ repeat: -1, yoyo: true });

      // Draw line from left to right on load
      tl.to(path.style, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: 'power1.out',
      });

      // Then morph between wave shapes continuously
      tl.to(
        path,
        {
          attr: { d: to },
          duration,
          ease: 'power1.inOut',
        },
        '>-0.5' // overlap start a bit for smoothness
      );
    });
  }, []);

  return (
    <div className="background">
      <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
        {[0, 1, 2].map((_, i) => (
          <path
            key={i}
            ref={(el) => {
              pathRefs.current[i] = el;
            }}
            fill="none"
            strokeWidth={1}
            strokeLinecap="round"
          />
        ))}
      </svg>

      <style jsx>{`
        .background {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          background-color: white;
          z-index: -1;
          padding-top: 100px;
        }

        svg {
          width: 100%;
          height: 100%;
        }

        path:nth-child(1) {
          stroke: #00f2ff;
          opacity: 1;
        }

        path:nth-child(2) {
          stroke: #00cfff;
          opacity: 0.6;
        }

        path:nth-child(3) {
          stroke: #007bff;
          opacity: 0.4;
        }
      `}</style>
    </div>
  );
}
