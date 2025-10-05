import { useState, useEffect } from 'react';
import { StarfieldBackground } from '@/components/StarfieldBackground';
import { ParticleSystem } from '@/components/ParticleSystem';
import { HolographicButton } from '@/components/HolographicButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  FlaskConical, 
  Atom, 
  Dna, 
  Radiation,
  Thermometer,
  Gauge,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Orbit,
  Activity
} from 'lucide-react';

interface SimulationData {
  gravity: number;
  radiation: number;
  temperature: number;
  pressure: number;
  oxygenLevel: number;
  cellViability: number;
  dnaStability: number;
  metabolismRate: number;
  growthRate: number;
}

const initialData: SimulationData = {
  gravity: 9.8,
  radiation: 0,
  temperature: 22,
  pressure: 101.3,
  oxygenLevel: 21,
  cellViability: 100,
  dnaStability: 100,
  metabolismRate: 100,
  growthRate: 100,
};

const experiments = [
  {
    id: 'microgravity',
    title: 'Microgravity Cell Culture',
    description: 'Study how reduced gravity affects cellular behavior and growth patterns',
    category: 'Microgravity',
    duration: '7 days',
    difficulty: 'Intermediate',
    icon: Orbit
  },
  {
    id: 'radiation',
    title: 'Radiation Exposure Study',
    description: 'Analyze DNA damage and repair mechanisms under cosmic radiation',
    category: 'Radiation',
    duration: '14 days',
    difficulty: 'Advanced',
    icon: Radiation
  },
  {
    id: 'temperature',
    title: 'Extreme Temperature Adaptation',
    description: 'Observe how organisms adapt to temperature fluctuations in space',
    category: 'Environmental',
    duration: '5 days',
    difficulty: 'Beginner',
    icon: Thermometer
  },
  {
    id: 'metabolism',
    title: 'Metabolic Rate Analysis',
    description: 'Monitor metabolic changes in space-like conditions',
    category: 'Physiology',
    duration: '10 days',
    difficulty: 'Intermediate',
    icon: Activity
  }
];

export default function Simulations() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentExperiment, setCurrentExperiment] = useState(experiments[0]);
  const [simulationData, setSimulationData] = useState<SimulationData>(initialData);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Simulation update effect
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
      
      setSimulationData(prev => {
        const newData = { ...prev };
        
        // Calculate biological responses based on environmental conditions
        const gravityFactor = (9.8 - prev.gravity) / 9.8;
        const radiationFactor = Math.max(0, (100 - prev.radiation) / 100);
        const tempFactor = Math.max(0, 1 - Math.abs(prev.temperature - 37) / 50);
        const pressureFactor = Math.max(0, prev.pressure / 101.3);
        const oxygenFactor = Math.max(0, prev.oxygenLevel / 21);
        
        // Update biological parameters
        newData.cellViability = Math.max(0, Math.min(100, 
          radiationFactor * tempFactor * pressureFactor * oxygenFactor * 100
        ));
        
        newData.dnaStability = Math.max(0, Math.min(100, 
          radiationFactor * 100 - (prev.radiation * 0.5)
        ));
        
        newData.metabolismRate = Math.max(0, Math.min(150, 
          tempFactor * oxygenFactor * (100 + gravityFactor * 20)
        ));
        
        newData.growthRate = Math.max(0, Math.min(120, 
          newData.cellViability * newData.metabolismRate / 100
        ));
        
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleParameterChange = (parameter: keyof SimulationData, value: number[]) => {
    setSimulationData(prev => ({
      ...prev,
      [parameter]: value[0]
    }));
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    setSimulationData(initialData);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getParameterColor = (value: number, min: number, max: number, optimal: number) => {
    const distance = Math.abs(value - optimal) / (max - min);
    if (distance < 0.1) return 'text-neon-green';
    if (distance < 0.3) return 'text-neon-cyan';
    if (distance < 0.6) return 'text-neon-electric';
    return 'text-neon-magenta';
  };

  return (
    <div className="min-h-screen relative">
      <StarfieldBackground />
      
      <div className="relative z-10 pt-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-gradient-neon mb-6">
              Simulations & Experiments
            </h1>
            <p className="text-xl text-foreground/80 font-exo max-w-3xl mx-auto">
              Interactive biological simulations in space environments with real-time parameter control
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Experiment Selection */}
            <div className="lg:col-span-1">
              <Card className="holo-panel border-holo-border">
                <CardHeader>
                  <CardTitle className="text-xl font-orbitron text-neon-cyan flex items-center gap-2">
                    <FlaskConical className="w-6 h-6" />
                    Available Experiments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {experiments.map((experiment) => {
                    const Icon = experiment.icon;
                    const isActive = currentExperiment.id === experiment.id;
                    
                    return (
                      <div
                        key={experiment.id}
                        onClick={() => setCurrentExperiment(experiment)}
                        className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                          isActive 
                            ? 'bg-neon-cyan/20 border border-neon-cyan' 
                            : 'bg-holo-base/30 hover:bg-holo-base/50 border border-transparent hover:border-holo-border'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className={`w-6 h-6 mt-1 ${isActive ? 'text-neon-cyan' : 'text-foreground/70'}`} />
                          <div className="flex-1">
                            <h3 className={`font-orbitron font-semibold mb-2 ${isActive ? 'text-neon-cyan' : 'text-foreground'}`}>
                              {experiment.title}
                            </h3>
                            <p className="text-sm text-foreground/70 mb-3">
                              {experiment.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="text-xs">
                                {experiment.category}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {experiment.duration}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {experiment.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Main Simulation Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Experiment Info */}
              <Card className="holo-panel border-holo-border">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-orbitron text-neon-magenta mb-2">
                        {currentExperiment.title}
                      </CardTitle>
                      <p className="text-foreground/80 font-exo">
                        {currentExperiment.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-orbitron font-bold text-neon-electric">
                        {formatTime(timeElapsed)}
                      </div>
                      <div className="text-sm text-foreground/60">
                        Simulation Time
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 justify-center">
                    <HolographicButton
                      onClick={() => setIsRunning(!isRunning)}
                      icon={isRunning ? Pause : Play}
                      variant="primary"
                    >
                      {isRunning ? 'Pause' : 'Start'}
                    </HolographicButton>
                    
                    <HolographicButton
                      onClick={resetSimulation}
                      icon={RotateCcw}
                      variant="outline"
                    >
                      Reset
                    </HolographicButton>
                  </div>
                </CardContent>
              </Card>

              {/* Environmental Controls */}
              <Card className="holo-panel border-holo-border">
                <CardHeader>
                  <CardTitle className="text-xl font-orbitron text-neon-cyan">
                    Environmental Parameters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-exo text-foreground/80">
                          Gravity (m/s²)
                        </label>
                        <span className={`font-orbitron ${getParameterColor(simulationData.gravity, 0, 9.8, 9.8)}`}>
                          {simulationData.gravity.toFixed(1)}
                        </span>
                      </div>
                      <Slider
                        value={[simulationData.gravity]}
                        onValueChange={(value) => handleParameterChange('gravity', value)}
                        min={0}
                        max={9.8}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-exo text-foreground/80">
                          Radiation (mSv/day)
                        </label>
                        <span className={`font-orbitron ${getParameterColor(simulationData.radiation, 0, 100, 0)}`}>
                          {simulationData.radiation.toFixed(1)}
                        </span>
                      </div>
                      <Slider
                        value={[simulationData.radiation]}
                        onValueChange={(value) => handleParameterChange('radiation', value)}
                        min={0}
                        max={100}
                        step={0.5}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-exo text-foreground/80">
                          Temperature (°C)
                        </label>
                        <span className={`font-orbitron ${getParameterColor(simulationData.temperature, -50, 80, 37)}`}>
                          {simulationData.temperature.toFixed(1)}
                        </span>
                      </div>
                      <Slider
                        value={[simulationData.temperature]}
                        onValueChange={(value) => handleParameterChange('temperature', value)}
                        min={-50}
                        max={80}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-exo text-foreground/80">
                          Pressure (kPa)
                        </label>
                        <span className={`font-orbitron ${getParameterColor(simulationData.pressure, 0, 200, 101.3)}`}>
                          {simulationData.pressure.toFixed(1)}
                        </span>
                      </div>
                      <Slider
                        value={[simulationData.pressure]}
                        onValueChange={(value) => handleParameterChange('pressure', value)}
                        min={0}
                        max={200}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-exo text-foreground/80">
                          Oxygen Level (%)
                        </label>
                        <span className={`font-orbitron ${getParameterColor(simulationData.oxygenLevel, 0, 100, 21)}`}>
                          {simulationData.oxygenLevel.toFixed(1)}
                        </span>
                      </div>
                      <Slider
                        value={[simulationData.oxygenLevel]}
                        onValueChange={(value) => handleParameterChange('oxygenLevel', value)}
                        min={0}
                        max={100}
                        step={0.5}
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Biological Responses */}
              <Card className="holo-panel border-holo-border">
                <CardHeader>
                  <CardTitle className="text-xl font-orbitron text-neon-electric">
                    Biological Responses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="relative w-20 h-20 mx-auto mb-3">
                        <div className="absolute inset-0 rounded-full border-4 border-holo-border"></div>
                        <div 
                          className="absolute inset-0 rounded-full border-4 border-neon-green border-t-transparent transition-all duration-1000"
                          style={{ 
                            transform: `rotate(${(simulationData.cellViability / 100) * 360}deg)`,
                            borderTopColor: simulationData.cellViability > 70 ? '#00ff00' : 
                                            simulationData.cellViability > 40 ? '#ffff00' : '#ff00ff'
                          }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-orbitron font-bold text-foreground">
                            {simulationData.cellViability.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <div className="text-sm font-exo text-foreground/70">Cell Viability</div>
                    </div>

                    <div className="text-center">
                      <div className="relative w-20 h-20 mx-auto mb-3">
                        <div className="absolute inset-0 rounded-full border-4 border-holo-border"></div>
                        <div 
                          className="absolute inset-0 rounded-full border-4 border-neon-cyan border-t-transparent transition-all duration-1000"
                          style={{ 
                            transform: `rotate(${(simulationData.dnaStability / 100) * 360}deg)`,
                            borderTopColor: simulationData.dnaStability > 80 ? '#00ffff' : 
                                            simulationData.dnaStability > 50 ? '#ffff00' : '#ff00ff'
                          }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-orbitron font-bold text-foreground">
                            {simulationData.dnaStability.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <div className="text-sm font-exo text-foreground/70">DNA Stability</div>
                    </div>

                    <div className="text-center">
                      <div className="relative w-20 h-20 mx-auto mb-3">
                        <div className="absolute inset-0 rounded-full border-4 border-holo-border"></div>
                        <div 
                          className="absolute inset-0 rounded-full border-4 border-neon-magenta border-t-transparent transition-all duration-1000"
                          style={{ 
                            transform: `rotate(${(simulationData.metabolismRate / 150) * 360}deg)`
                          }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-orbitron font-bold text-foreground">
                            {simulationData.metabolismRate.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <div className="text-sm font-exo text-foreground/70">Metabolism</div>
                    </div>

                    <div className="text-center">
                      <div className="relative w-20 h-20 mx-auto mb-3">
                        <div className="absolute inset-0 rounded-full border-4 border-holo-border"></div>
                        <div 
                          className="absolute inset-0 rounded-full border-4 border-neon-electric border-t-transparent transition-all duration-1000"
                          style={{ 
                            transform: `rotate(${(simulationData.growthRate / 120) * 360}deg)`
                          }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-orbitron font-bold text-foreground">
                            {simulationData.growthRate.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <div className="text-sm font-exo text-foreground/70">Growth Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        <ParticleSystem count={30} className="opacity-30" />
      </div>
    </div>
  );
}