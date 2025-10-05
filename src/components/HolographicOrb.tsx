import { useEffect, useRef } from 'react';

interface HolographicOrbProps {
  isThinking?: boolean;
}

export function HolographicOrb({ isThinking = false }: HolographicOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    let rotation = 0;
    let pulsePhase = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Pulse effect
      pulsePhase += 0.05;
      const pulseScale = 1 + Math.sin(pulsePhase) * 0.1;

      // Main orb
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 60 * pulseScale);
      gradient.addColorStop(0, 'rgba(0, 255, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(138, 43, 226, 0.5)');
      gradient.addColorStop(1, 'rgba(0, 255, 255, 0.1)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, 60 * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Rotating rings
      rotation += isThinking ? 0.03 : 0.01;

      for (let i = 0; i < 3; i++) {
        const angle = rotation + (i * Math.PI * 2) / 3;
        const radius = 70 + i * 15;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.ellipse(0, 0, radius, radius * 0.3, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 - i * 0.1})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
      }

      // Particle effects when thinking
      if (isThinking) {
        for (let i = 0; i < 8; i++) {
          const particleAngle = rotation * 2 + (i * Math.PI * 2) / 8;
          const particleRadius = 80 + Math.sin(pulsePhase + i) * 10;
          const px = centerX + Math.cos(particleAngle) * particleRadius;
          const py = centerY + Math.sin(particleAngle) * particleRadius;

          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 0, 255, 0.6)';
          ctx.fill();
        }
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [isThinking]);

  return (
    <div className="relative flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      <div className="w-32 h-32 rounded-full bg-gradient-neon opacity-20 blur-xl animate-pulse" />
    </div>
  );
}
