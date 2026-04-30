'use client';

import { useEffect, useRef } from 'react';

export default function BubbleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
      vx: number;
      vy: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 12 + 4; // Larger bubbles
        this.speedY = Math.random() * 1.2 + 0.6; // Faster
        this.opacity = Math.random() * 0.5 + 0.3; // More opaque
        this.vx = 0;
        this.vy = 0;
      }

      update() {
        this.y -= this.speedY + (scrollVelocity * 0.1);

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          this.vx -= Math.cos(angle) * force * 5;
          this.vy -= Math.sin(angle) * force * 5;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.94;
        this.vy *= 0.94;

        if (this.y < -50) {
          this.y = canvas!.height + 50;
          this.x = Math.random() * canvas!.width;
        }
        if (this.x < -50) this.x = canvas!.width + 50;
        if (this.x > canvas!.width + 50) this.x = -50;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Use a more vibrant green/blue for bubbles
        ctx.fillStyle = `rgba(16, 185, 129, ${this.opacity})`;
        ctx.fill();

        // Reflection
        ctx.beginPath();
        ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 8000); // More particles
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
    };

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      scrollVelocity *= 0.9;
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}
