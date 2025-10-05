import { useEffect, useRef } from 'react';

export const StarfieldBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: Array<{
      x: number;
      y: number;
      z: number;
      prevX: number;
      prevY: number;
      size: number;
      color: string;
    }> = [];

    const numStars = 800;
    const speed = 0.5;

    // Create stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * 1000,
        prevX: 0,
        prevY: 0,
        size: Math.random() * 2,
        color: ['#00FFFF', '#FF00FF', '#00FFAA', '#AAFFFF'][Math.floor(Math.random() * 4)]
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(4, 6, 24, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      stars.forEach((star) => {
        star.prevX = star.x / (star.z * 0.001);
        star.prevY = star.y / (star.z * 0.001);

        star.z -= speed;

        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
          star.z = 1000;
        }

        const x = star.x / (star.z * 0.001) + centerX;
        const y = star.y / (star.z * 0.001) + centerY;

        const opacity = Math.max(0, 1 - star.z / 1000);
        ctx.strokeStyle = star.color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
        ctx.lineWidth = star.size;
        
        ctx.beginPath();
        ctx.moveTo(star.prevX + centerX, star.prevY + centerY);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = star.color;
        ctx.fillStyle = star.color + Math.floor(opacity * 128).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(x, y, star.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'linear-gradient(135deg, #040618 0%, #0a0f2e 50%, #1a1640 100%)' }}
    />
  );
};