import { Users, MessageCircle, Calendar, Award, TrendingUp, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarfieldBackground } from '@/components/StarfieldBackground';
import { HolographicButton } from '@/components/HolographicButton';

export default function Community() {
  const members = [
    { name: 'Dr. Sarah Chen', role: 'Astrobiology Lead', avatar: '👩‍🔬', contributions: 142 },
    { name: 'Prof. James Martinez', role: 'Microgravity Specialist', avatar: '👨‍🚀', contributions: 98 },
    { name: 'Dr. Amara Okafor', role: 'Space Medicine', avatar: '👩‍⚕️', contributions: 87 },
    { name: 'Dr. Yuki Tanaka', role: 'Mars Research', avatar: '👨‍🔬', contributions: 76 }
  ];

  const discussions = [
    { title: 'Latest findings on microgravity effects on cellular biology', author: 'Dr. Chen', replies: 23, date: '2 hours ago' },
    { title: 'Mars soil analysis: Implications for extremophile research', author: 'Prof. Martinez', replies: 18, date: '5 hours ago' },
    { title: 'ISS Experiment Results: Protein crystallization in space', author: 'Dr. Okafor', replies: 31, date: '1 day ago' },
    { title: 'New astrobiology protocols for deep space missions', author: 'Dr. Tanaka', replies: 15, date: '2 days ago' }
  ];

  const events = [
    { title: 'Virtual Symposium: Space Biology 2025', date: 'Jan 15, 2025', type: 'Conference' },
    { title: 'Webinar: Microgravity Research Methods', date: 'Jan 22, 2025', type: 'Workshop' },
    { title: 'Collaborative Project: Mars Life Detection', date: 'Feb 1, 2025', type: 'Collaboration' }
  ];

  return (
    <div className="min-h-screen relative">
      <StarfieldBackground />

      <div className="relative z-10 pt-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-gradient-neon mb-6">
              Community
            </h1>
            <p className="text-xl text-foreground/80 font-exo max-w-3xl mx-auto">
              Connect with researchers, share discoveries, and collaborate on space biology projects
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="holo-panel border-holo-border text-center">
              <CardContent className="pt-6">
                <Users className="w-8 h-8 text-neon-cyan mx-auto mb-2" />
                <p className="text-3xl font-orbitron font-bold text-foreground mb-1">1,247</p>
                <p className="text-sm text-foreground/70 font-exo">Active Members</p>
              </CardContent>
            </Card>

            <Card className="holo-panel border-holo-border text-center">
              <CardContent className="pt-6">
                <MessageCircle className="w-8 h-8 text-neon-magenta mx-auto mb-2" />
                <p className="text-3xl font-orbitron font-bold text-foreground mb-1">3,842</p>
                <p className="text-sm text-foreground/70 font-exo">Discussions</p>
              </CardContent>
            </Card>

            <Card className="holo-panel border-holo-border text-center">
              <CardContent className="pt-6">
                <TrendingUp className="w-8 h-8 text-neon-green mx-auto mb-2" />
                <p className="text-3xl font-orbitron font-bold text-foreground mb-1">567</p>
                <p className="text-sm text-foreground/70 font-exo">Research Papers</p>
              </CardContent>
            </Card>

            <Card className="holo-panel border-holo-border text-center">
              <CardContent className="pt-6">
                <Globe className="w-8 h-8 text-neon-electric mx-auto mb-2" />
                <p className="text-3xl font-orbitron font-bold text-foreground mb-1">42</p>
                <p className="text-sm text-foreground/70 font-exo">Countries</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Top Contributors */}
            <Card className="holo-panel border-holo-border lg:col-span-1">
              <CardHeader>
                <CardTitle className="font-orbitron text-gradient-neon flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {members.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-holo-base transition-colors">
                    <div className="text-3xl">{member.avatar}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{member.name}</p>
                      <p className="text-xs text-foreground/60">{member.role}</p>
                    </div>
                    <Badge variant="outline" className="border-neon-cyan text-neon-cyan">
                      {member.contributions}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Discussions */}
            <Card className="holo-panel border-holo-border lg:col-span-2">
              <CardHeader>
                <CardTitle className="font-orbitron text-gradient-neon flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Recent Discussions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {discussions.map((discussion, idx) => (
                  <div key={idx} className="p-4 rounded-lg border border-holo-border hover:border-neon-cyan transition-colors cursor-pointer">
                    <h3 className="font-semibold text-foreground mb-2">{discussion.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-foreground/60">
                      <span>by {discussion.author}</span>
                      <span>•</span>
                      <span>{discussion.replies} replies</span>
                      <span>•</span>
                      <span>{discussion.date}</span>
                    </div>
                  </div>
                ))}
                <HolographicButton icon={MessageCircle} className="w-full mt-4">
                  View All Discussions
                </HolographicButton>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <Card className="holo-panel border-holo-border mt-8">
            <CardHeader>
              <CardTitle className="font-orbitron text-gradient-neon flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {events.map((event, idx) => (
                  <div key={idx} className="p-6 rounded-lg border border-holo-border hover:border-neon-magenta transition-colors">
                    <Badge variant="outline" className="border-neon-magenta text-neon-magenta mb-3">
                      {event.type}
                    </Badge>
                    <h3 className="font-semibold text-foreground mb-2">{event.title}</h3>
                    <p className="text-sm text-foreground/60 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </p>
                    <Button variant="outline" className="w-full mt-4 border-holo-border hover:border-neon-magenta">
                      Learn More
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center mt-12 mb-12">
            <HolographicButton icon={Users} className="mx-auto">
              Join the Community
            </HolographicButton>
            <p className="text-sm text-foreground/60 font-exo mt-4">
              Connect with 1,247+ researchers worldwide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
