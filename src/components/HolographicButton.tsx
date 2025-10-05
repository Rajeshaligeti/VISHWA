import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HolographicButtonProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

export const HolographicButton = ({
  children,
  icon: Icon,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  href,
  disabled = false,
}: HolographicButtonProps) => {
  const baseClasses = cn(
    'relative overflow-hidden font-orbitron font-semibold transition-all duration-300',
    'border backdrop-blur-sm transform hover:scale-105 hover:-translate-y-1',
    {
      'bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 border-neon-cyan text-neon-cyan hover:shadow-neon hover:border-neon-magenta':
        variant === 'primary',
      'bg-gradient-to-r from-neon-magenta/20 to-neon-electric/20 border-neon-magenta text-neon-magenta hover:shadow-magenta hover:border-neon-electric':
        variant === 'secondary',
      'bg-holo-base/30 border-holo-border text-foreground hover:border-neon-cyan hover:text-neon-cyan hover:shadow-holo':
        variant === 'outline',
    },
    {
      'px-4 py-2 text-sm': size === 'sm',
      'px-6 py-3 text-base': size === 'md',
      'px-8 py-4 text-lg': size === 'lg',
    },
    className
  );

  const content = (
    <>
      {/* Holographic background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
      
      {/* Button content */}
      <div className="relative flex items-center justify-center space-x-2">
        {Icon && <Icon className="w-5 h-5" />}
        <span>{children}</span>
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      variant="ghost"
    >
      {content}
    </Button>
  );
};