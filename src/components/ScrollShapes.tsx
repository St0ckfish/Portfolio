'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollShapes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const isDark = !booleanValue; 

  useEffect(() => {
    const shapes = containerRef.current?.querySelectorAll('.scroll-shape');
    
    shapes?.forEach((shape, index) => {
      gsap.fromTo(
        shape,
        {
          scale: 0.5,
          rotation: 0,
          opacity: 0.3,
        },
        {
          scale: 1.5,
          rotation: 360,
          opacity: 0.8,
          scrollTrigger: {
            trigger: shape,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            markers: false,
          },
        }
      );

      gsap.to(shape, {
        y: -200 * (index % 2 === 0 ? 1 : -1),
        scrollTrigger: {
          trigger: shape,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const shapePositions = [
    { top: '10%', left: '5%', size: 100, delay: 0 },
    { top: '30%', right: '10%', size: 150, delay: 0.2 },
    { top: '50%', left: '15%', size: 80, delay: 0.4 },
    { top: '70%', right: '5%', size: 120, delay: 0.6 },
    { top: '85%', left: '50%', size: 90, delay: 0.8 },
  ];

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-full pointer-events-none -z-5 overflow-hidden">
      {shapePositions.map((pos, i) => (
        <div
          key={i}
          className="scroll-shape absolute rounded-full blur-3xl"
          style={{
            background: isDark
              ? (i % 2 === 0 
                  ? 'radial-gradient(circle, rgba(127, 234, 255, 0.15), transparent)' 
                  : 'radial-gradient(circle, rgba(178, 146, 255, 0.15), transparent)')
              : (i % 2 === 0 
                  ? 'radial-gradient(circle, rgba(139, 92, 246, 0.12), transparent)' 
                  : 'radial-gradient(circle, rgba(6, 182, 212, 0.12), transparent)'),
            width: `${pos.size}px`,
            height: `${pos.size}px`,
            ...pos,
          }}
        />
      ))}
      
      <div className="scroll-shape absolute top-[20%] right-[20%] w-32 h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
          <polygon
            points="50,10 90,90 10,90"
            fill="none"
            stroke={isDark ? '#7feaff' : '#8b5cf6'}
            strokeWidth="2"
          />
        </svg>
      </div>
      
      <div className="scroll-shape absolute top-[60%] left-[10%] w-40 h-40">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={isDark ? '#b292ff' : '#06b6d4'}
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
}
