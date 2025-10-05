import { Rocket, Users, Target, Zap, Globe, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarfieldBackground } from '@/components/StarfieldBackground';

export default function About() {
  const team = [
    { name: 'Dr. Emily Rodriguez', role: 'Founder & Chief Scientist', avatar: '👩‍🚀', bio: 'Pioneer in space biology research with 15+ years at NASA' },
    { name: 'Prof. Michael Zhang', role: 'AI Research Lead', avatar: '👨‍💻', bio: 'Leading expert in machine learning for space data analysis' },
    { name: 'Dr. Aisha Patel', role: 'Astrobiology Director', avatar: '👩‍🔬', bio: 'Specializes in extremophile research and Mars missions' },
    { name: 'Dr. Carlos Santos', role: 'Community Manager', avatar: '👨‍⚕️', bio: 'Building bridges between researchers worldwide' }
  ];

  const values = [
    { icon: Target, title: 'Mission-Driven', description: 'Advancing human knowledge of life beyond Earth' },
    { icon: Users, title: 'Collaborative', description: 'Fostering global scientific cooperation' },
    { icon: Zap, title: 'Innovative', description: 'Leveraging cutting-edge AI and data science' },
    { icon: Globe, title: 'Open Science', description: 'Making research accessible to all' }
  ];

  const milestones = [
    { year: '2020', event: 'VISHWA founded with mission to democratize space biology research' },
    { year: '2021', event: 'Launched AI-powered research assistant and knowledge graph' },
    { year: '2022', event: 'Reached 1,000+ researchers across 30 countries' },
    { year: '2023', event: 'Partnered with NASA and ESA for real-time mission data' },
    { year: '2024', event: 'Published 500+ collaborative research papers' },
    { year: '2025', event: 'Expanding to include Mars and deep space biology' }
  ];

  return (
    <div className="min-h-screen relative">
      <StarfieldBackground />

      <div className="relative z-10 pt-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-gradient-neon mb-6">
              About VISHWA
            </h1>
            <p className="text-xl text-foreground/80 font-exo max-w-3xl mx-auto">
              Pioneering the future of space biology through AI, collaboration, and open science
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="holo-panel border-holo-border mb-12">
            <CardContent className="p-8 md:p-12 text-center">
              <Rocket className="w-16 h-16 text-neon-cyan mx-auto mb-6" />
              <h2 className="text-3xl font-orbitron font-bold text-gradient-neon mb-4">Our Mission</h2>
              <p className="text-lg text-foreground/80 font-exo max-w-4xl mx-auto leading-relaxed">
                VISHWA Space Biology Platform empowers researchers worldwide to explore the frontiers of life in space. 
                We combine cutting-edge AI technology with comprehensive databases to accelerate discoveries in 
                astrobiology, microgravity research, and the search for life beyond Earth.
              </p>
            </CardContent>
          </Card>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-orbitron font-bold text-center text-gradient-neon mb-8">Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <Card key={idx} className="holo-panel border-holo-border text-center hover-scale">
                    <CardContent className="p-6">
                      <Icon className="w-12 h-12 text-neon-cyan mx-auto mb-4" />
                      <h3 className="text-xl font-orbitron font-bold text-foreground mb-2">{value.title}</h3>
                      <p className="text-sm text-foreground/70 font-exo">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Timeline */}
          <Card className="holo-panel border-holo-border mb-12">
            <CardHeader>
              <CardTitle className="font-orbitron text-gradient-neon text-center text-2xl">Our Journey</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {milestones.map((milestone, idx) => (
                  <div key={idx} className="flex gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-gradient-neon flex items-center justify-center">
                        <span className="text-background font-orbitron font-bold">{milestone.year}</span>
                      </div>
                    </div>
                    <div className="flex-1 pt-4">
                      <p className="text-foreground/80 font-exo text-lg">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-orbitron font-bold text-center text-gradient-neon mb-8">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, idx) => (
                <Card key={idx} className="holo-panel border-holo-border hover-scale text-center">
                  <CardContent className="p-6">
                    <div className="text-6xl mb-4">{member.avatar}</div>
                    <h3 className="text-xl font-orbitron font-bold text-foreground mb-1">{member.name}</h3>
                    <p className="text-sm text-neon-cyan font-exo mb-3">{member.role}</p>
                    <p className="text-sm text-foreground/70 font-exo">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <Card className="holo-panel border-holo-border text-center">
              <CardContent className="p-6">
                <p className="text-4xl font-orbitron font-bold text-neon-cyan mb-2">1,247</p>
                <p className="text-sm text-foreground/70 font-exo">Researchers</p>
              </CardContent>
            </Card>
            <Card className="holo-panel border-holo-border text-center">
              <CardContent className="p-6">
                <p className="text-4xl font-orbitron font-bold text-neon-magenta mb-2">567</p>
                <p className="text-sm text-foreground/70 font-exo">Publications</p>
              </CardContent>
            </Card>
            <Card className="holo-panel border-holo-border text-center">
              <CardContent className="p-6">
                <p className="text-4xl font-orbitron font-bold text-neon-green mb-2">42</p>
                <p className="text-sm text-foreground/70 font-exo">Countries</p>
              </CardContent>
            </Card>
            <Card className="holo-panel border-holo-border text-center">
              <CardContent className="p-6">
                <p className="text-4xl font-orbitron font-bold text-neon-electric mb-2">15K+</p>
                <p className="text-sm text-foreground/70 font-exo">Data Points</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
