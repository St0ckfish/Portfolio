'use client';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const isDark = !booleanValue; 
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    const particleColor = isDark ? 'rgba(127, 234, 255, 0.6)' : 'rgba(139, 92, 246, 0.6)';

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        const width = canvas?.width || window.innerWidth;
        const height = canvas?.height || window.innerHeight;

        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;

        const dx = mousePosition.current.x - this.x;
        const dy = mousePosition.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          this.x -= (dx / distance) * force * 2;
          this.y -= (dy / distance) * force * 2;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class FloatingOrb {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      color: string;
      phase: number;
      speed: number;

      constructor(x: number, y: number, size: number, color: string) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.phase = Math.random() * Math.PI * 2;
        this.speed = 0.001 + Math.random() * 0.001;
      }

      update(time: number) {
        this.x = this.baseX + Math.sin(time * this.speed + this.phase) * 50;
        this.y = this.baseY + Math.cos(time * this.speed * 0.8 + this.phase) * 30;

        const dx = mousePosition.current.x - this.x;
        const dy = mousePosition.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 300) {
          const force = (300 - distance) / 300;
          this.x -= (dx / distance) * force * 50;
          this.y -= (dy / distance) * force * 50;
        }
      }

      draw() {
        if (!ctx) return;
        
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, this.color + '80');
        gradient.addColorStop(0.5, this.color + '40');
        gradient.addColorStop(1, this.color + '00');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 150; i++) {
      particles.push(new Particle());
    }

    const orbs: FloatingOrb[] = [
      new FloatingOrb(
        canvas.width * 0.2, 
        canvas.height * 0.3, 
        200, 
        isDark ? '#7feaff' : '#8b5cf6'
      ),
      new FloatingOrb(
        canvas.width * 0.8, 
        canvas.height * 0.6, 
        250, 
        isDark ? '#b292ff' : '#06b6d4'
      ),
      new FloatingOrb(
        canvas.width * 0.5, 
        canvas.height * 0.5, 
        180, 
        isDark ? '#9e7bcc' : '#a78bfa'
      ),
    ];

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbs.forEach(orb => {
        orb.update(time * 1000);
        orb.draw();
      });

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [booleanValue, isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}
