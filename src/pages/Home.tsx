import { Link } from 'react-router-dom';
import { StarfieldBackground } from '@/components/StarfieldBackground';
import { ParticleSystem } from '@/components/ParticleSystem';
import { FloatingElements } from '@/components/FloatingElements';
import { HolographicButton } from '@/components/HolographicButton';
import { 
  BookOpen, 
  FlaskConical, 
  Bot, 
  Rocket, 
  Dna, 
  Atom,
  ChevronDown,
  Play
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarfieldBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 parallax-section">
        <ParticleSystem count={60} />
        <FloatingElements />
        
        <div className="max-w-4xl mx-auto text-center z-10">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-orbitron font-bold text-gradient-neon mb-4 tracking-wider">
              VISHWA
            </h1>
            <h2 className="text-3xl md:text-5xl font-orbitron font-semibold text-foreground mb-6">
              Space Biology Engine
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-exo max-w-2xl mx-auto leading-relaxed">
              Explore Life Beyond Earth
            </p>
          </div>

          {/* Subheading */}
          <div className="mb-12">
            <p className="text-lg md:text-xl text-foreground/80 font-exo max-w-3xl mx-auto leading-relaxed">
              Cutting-edge research platform combining AI-powered experiments, 
              real-time simulations, and comprehensive biological databases to 
              unlock the mysteries of life in space.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link to="/ai-assistant">
              <HolographicButton 
                icon={Bot} 
                variant="primary" 
                size="lg"
                className="w-full sm:w-auto"
              >
                AI Assistant
              </HolographicButton>
            </Link>
            
            <Link to="/simulations">
              <HolographicButton 
                icon={FlaskConical} 
                variant="secondary" 
                size="lg"
                className="w-full sm:w-auto"
              >
                Experiments
              </HolographicButton>
            </Link>
            
            <Link to="/knowledge">
              <HolographicButton 
                icon={BookOpen} 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto"
              >
                Knowledge Hub
              </HolographicButton>
            </Link>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="holo-panel rounded-xl p-6 hover-scale">
              <Rocket className="w-12 h-12 text-neon-cyan mx-auto mb-4" />
              <h3 className="text-xl font-orbitron font-semibold text-neon-cyan mb-3">
                Space Missions
              </h3>
              <p className="text-foreground/70 font-exo">
                Real-time data from NASA missions and space biology experiments
              </p>
            </div>

            <div className="holo-panel rounded-xl p-6 hover-scale">
              <Dna className="w-12 h-12 text-neon-magenta mx-auto mb-4" />
              <h3 className="text-xl font-orbitron font-semibold text-neon-magenta mb-3">
                Bio Research
              </h3>
              <p className="text-foreground/70 font-exo">
                Access to NCBI databases and cutting-edge astrobiology research
              </p>
            </div>

            <div className="holo-panel rounded-xl p-6 hover-scale">
              <Atom className="w-12 h-12 text-neon-electric mx-auto mb-4" />
              <h3 className="text-xl font-orbitron font-semibold text-neon-electric mb-3">
                AI Simulations
              </h3>
              <p className="text-foreground/70 font-exo">
                Advanced modeling of biological systems in space environments
              </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 text-neon-cyan mx-auto" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-gradient-neon mb-6">
              Research Capabilities
            </h2>
            <p className="text-xl text-foreground/80 font-exo max-w-3xl mx-auto">
              Powered by advanced AI and real-time data from leading space agencies and research institutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="holo-panel rounded-xl p-8 interactive-glow">
                <Bot className="w-16 h-16 text-neon-cyan mb-6" />
                <h3 className="text-2xl font-orbitron font-bold text-neon-cyan mb-4">
                  VISHWA-AI Assistant
                </h3>
                <p className="text-foreground/80 font-exo mb-6 leading-relaxed">
                  Intelligent AI companion specialized in space biology, providing 
                  research insights, experiment suggestions, and real-time analysis 
                  of biological data from space missions.
                </p>
                <Link to="/ai-assistant">
                  <HolographicButton icon={Play} variant="primary">
                    Launch Assistant
                  </HolographicButton>
                </Link>
              </div>

              <div className="holo-panel rounded-xl p-8 interactive-glow">
                <FlaskConical className="w-16 h-16 text-neon-magenta mb-6" />
                <h3 className="text-2xl font-orbitron font-bold text-neon-magenta mb-4">
                  Virtual Experiments
                </h3>
                <p className="text-foreground/80 font-exo mb-6 leading-relaxed">
                  Simulate biological processes in microgravity, radiation exposure, 
                  and extreme space environments with interactive 3D visualizations 
                  and real-time parameter adjustments.
                </p>
                <Link to="/simulations">
                  <HolographicButton icon={Play} variant="secondary">
                    Start Simulation
                  </HolographicButton>
                </Link>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="holo-panel rounded-xl p-8 interactive-glow">
                <BookOpen className="w-16 h-16 text-neon-electric mb-6" />
                <h3 className="text-2xl font-orbitron font-bold text-neon-electric mb-4">
                  Knowledge Networks
                </h3>
                <p className="text-foreground/80 font-exo mb-6 leading-relaxed">
                  Interactive knowledge graphs connecting NASA missions, NCBI research, 
                  and space biology discoveries. Visualize relationships between 
                  organisms, experiments, and findings.
                </p>
                <Link to="/knowledge">
                  <HolographicButton icon={Play} variant="outline">
                    Explore Knowledge
                  </HolographicButton>
                </Link>
              </div>

              <div className="holo-panel rounded-xl p-8 interactive-glow">
                <Rocket className="w-16 h-16 text-neon-green mb-6" />
                <h3 className="text-2xl font-orbitron font-bold text-neon-green mb-4">
                  Mission Integration
                </h3>
                <p className="text-foreground/80 font-exo mb-6 leading-relaxed">
                  Live data feeds from ISS experiments, Mars rover biological 
                  sensors, and deep space missions. Track ongoing research and 
                  contribute to the global space biology community.
                </p>
                <Link to="/community">
                  <HolographicButton icon={Play} variant="outline">
                    Join Community
                  </HolographicButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-transparent to-space-deep/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="holo-panel rounded-xl p-6">
              <div className="text-3xl md:text-4xl font-orbitron font-bold text-neon-cyan mb-2">
                500+
              </div>
              <div className="text-foreground/70 font-exo">
                Research Papers
              </div>
            </div>
            
            <div className="holo-panel rounded-xl p-6">
              <div className="text-3xl md:text-4xl font-orbitron font-bold text-neon-magenta mb-2">
                50+
              </div>
              <div className="text-foreground/70 font-exo">
                Active Experiments
              </div>
            </div>
            
            <div className="holo-panel rounded-xl p-6">
              <div className="text-3xl md:text-4xl font-orbitron font-bold text-neon-electric mb-2">
                24/7
              </div>
              <div className="text-foreground/70 font-exo">
                AI Monitoring
              </div>
            </div>
            
            <div className="holo-panel rounded-xl p-6">
              <div className="text-3xl md:text-4xl font-orbitron font-bold text-neon-green mb-2">
                ∞
              </div>
              <div className="text-foreground/70 font-exo">
                Possibilities
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}