import { useEffect, useRef } from 'react';
import { Dna, Atom, Satellite, Globe } from 'lucide-react';

const floatingElements = [
  { Icon: Dna, delay: 0, duration: 8, color: 'text-neon-cyan' },
  { Icon: Atom, delay: 2, duration: 10, color: 'text-neon-magenta' },
  { Icon: Satellite, delay: 4, duration: 12, color: 'text-neon-electric' },
  { Icon: Globe, delay: 6, duration: 9, color: 'text-neon-green' },
];

interface FloatingElementsProps {
  className?: string;
}

export const FloatingElements = ({ className = '' }: FloatingElementsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('.floating-element');
    
    elements.forEach((element, index) => {
      const htmlElement = element as HTMLElement;
      const randomX = Math.random() * 80 + 10; // 10-90% of container width
      const randomY = Math.random() * 80 + 10; // 10-90% of container height
      
      htmlElement.style.left = `${randomX}%`;
      htmlElement.style.top = `${randomY}%`;
      htmlElement.style.animationDelay = `${floatingElements[index]?.delay || 0}s`;
    });
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {floatingElements.map((element, index) => {
        const { Icon, duration, color } = element;
        return (
          <div
            key={index}
            className={`floating-element absolute transform transition-all duration-1000 ${color}`}
            style={{
              animation: `floating ${duration}s ease-in-out infinite`,
            }}
          >
            <div className="relative">
              <Icon 
                className="w-8 h-8 opacity-60 hover:opacity-100 transition-opacity duration-300"
                style={{
                  filter: 'drop-shadow(0 0 10px currentColor)',
                }}
              />
              <div className="absolute inset-0 animate-pulse">
                <Icon className="w-8 h-8 opacity-30" />
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Additional DNA strand animation */}
      <div className="absolute top-1/4 right-1/4 dna-strand">
        <div className="relative w-16 h-32">
          <div className="absolute inset-0 border-l-2 border-neon-cyan opacity-40 transform rotate-12"></div>
          <div className="absolute inset-0 border-r-2 border-neon-magenta opacity-40 transform -rotate-12"></div>
          <div className="absolute top-2 left-2 w-2 h-2 bg-neon-cyan rounded-full opacity-60"></div>
          <div className="absolute top-6 right-2 w-2 h-2 bg-neon-magenta rounded-full opacity-60"></div>
          <div className="absolute top-10 left-2 w-2 h-2 bg-neon-electric rounded-full opacity-60"></div>
          <div className="absolute top-14 right-2 w-2 h-2 bg-neon-green rounded-full opacity-60"></div>
        </div>
      </div>
    </div>
  );
};