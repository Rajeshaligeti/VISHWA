import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  BookOpen, 
  FlaskConical, 
  Bot, 
  Users, 
  Info, 
  Mail,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Knowledge Hub', path: '/knowledge', icon: BookOpen },
  { name: 'Simulations', path: '/simulations', icon: FlaskConical },
  { name: 'AI Assistant', path: '/ai-assistant', icon: Bot },
  { name: 'Community', path: '/community', icon: Users },
  { name: 'About', path: '/about', icon: Info },
  { name: 'Contact', path: '/contact', icon: Mail },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-holo-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-neon p-2 group-hover:shadow-neon transition-all duration-300">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <span className="text-neon-cyan font-orbitron font-bold text-lg">V</span>
                </div>
              </div>
              <span className="text-xl font-orbitron font-bold text-gradient-neon">
                Vishwa Space Biology
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                      isActive
                        ? 'bg-holo-base border border-neon-cyan text-neon-cyan shadow-neon'
                        : 'hover:bg-holo-base hover:border-holo-border hover:shadow-holo text-foreground hover:text-neon-cyan'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-exo">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-neon-cyan hover:bg-holo-base hover:text-neon-cyan"
              onClick={toggleMenu}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-background/95 backdrop-blur-lg" onClick={toggleMenu} />
          <div className="fixed top-16 left-0 right-0 bg-card/95 backdrop-blur-lg border-b border-holo-border">
            <div className="px-6 py-4 space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={toggleMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-holo-base border border-neon-cyan text-neon-cyan shadow-neon'
                        : 'hover:bg-holo-base hover:border-holo-border hover:shadow-holo text-foreground hover:text-neon-cyan'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-exo text-lg">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};