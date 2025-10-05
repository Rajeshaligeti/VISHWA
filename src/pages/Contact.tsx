import { Mail, MapPin, Phone, Send, MessageSquare, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { StarfieldBackground } from '@/components/StarfieldBackground';
import { HolographicButton } from '@/components/HolographicButton';
import { toast } from 'sonner';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.');
  };

  const contactInfo = [
    { icon: Mail, title: 'Email', content: 'contact@vishwa-space.org', href: 'mailto:contact@vishwa-space.org' },
    { icon: Phone, title: 'Phone', content: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: MapPin, title: 'Location', content: 'Space Biology Institute, Houston, TX', href: null },
    { icon: Clock, title: 'Hours', content: 'Mon-Fri: 9AM-6PM EST', href: null }
  ];

  const departments = [
    { icon: MessageSquare, title: 'General Inquiries', email: 'info@vishwa-space.org' },
    { icon: Mail, title: 'Research Collaboration', email: 'research@vishwa-space.org' },
    { icon: MessageSquare, title: 'Technical Support', email: 'support@vishwa-space.org' },
    { icon: Mail, title: 'Media & Press', email: 'press@vishwa-space.org' }
  ];

  return (
    <div className="min-h-screen relative">
      <StarfieldBackground />

      <div className="relative z-10 pt-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-gradient-neon mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-foreground/80 font-exo max-w-3xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Form */}
            <Card className="holo-panel border-holo-border lg:col-span-2">
              <CardHeader>
                <CardTitle className="font-orbitron text-gradient-neon text-2xl">Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-exo text-foreground/70 mb-2 block">First Name</label>
                      <Input
                        placeholder="John"
                        className="bg-background/50 border-holo-border focus:border-neon-cyan"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-exo text-foreground/70 mb-2 block">Last Name</label>
                      <Input
                        placeholder="Doe"
                        className="bg-background/50 border-holo-border focus:border-neon-cyan"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-exo text-foreground/70 mb-2 block">Email</label>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      className="bg-background/50 border-holo-border focus:border-neon-cyan"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-exo text-foreground/70 mb-2 block">Subject</label>
                    <Input
                      placeholder="How can we help you?"
                      className="bg-background/50 border-holo-border focus:border-neon-cyan"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-exo text-foreground/70 mb-2 block">Message</label>
                    <Textarea
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      className="bg-background/50 border-holo-border focus:border-neon-cyan resize-none"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-neon hover:opacity-90 text-background font-orbitron">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="holo-panel border-holo-border">
                <CardHeader>
                  <CardTitle className="font-orbitron text-gradient-neon">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info, idx) => {
                    const Icon = info.icon;
                    const content = info.href ? (
                      <a href={info.href} className="text-neon-cyan hover:text-neon-magenta transition-colors">
                        {info.content}
                      </a>
                    ) : (
                      <span className="text-foreground/80">{info.content}</span>
                    );

                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <Icon className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">{info.title}</p>
                          <p className="text-sm font-exo">{content}</p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card className="holo-panel border-holo-border">
                <CardHeader>
                  <CardTitle className="font-orbitron text-gradient-neon">Departments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {departments.map((dept, idx) => {
                    const Icon = dept.icon;
                    return (
                      <div key={idx} className="p-3 rounded-lg border border-holo-border hover:border-neon-cyan transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="w-4 h-4 text-neon-cyan" />
                          <p className="text-sm font-semibold text-foreground">{dept.title}</p>
                        </div>
                        <a
                          href={`mailto:${dept.email}`}
                          className="text-xs text-neon-cyan hover:text-neon-magenta transition-colors font-exo"
                        >
                          {dept.email}
                        </a>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <Card className="holo-panel border-holo-border mb-12">
            <CardHeader>
              <CardTitle className="font-orbitron text-gradient-neon text-2xl text-center">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg border border-holo-border">
                  <h3 className="font-semibold text-foreground mb-2">How do I join the research community?</h3>
                  <p className="text-sm text-foreground/70 font-exo">
                    Visit our Community page and click "Join the Community" to create your account and start collaborating.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-holo-border">
                  <h3 className="font-semibold text-foreground mb-2">Can I contribute my research data?</h3>
                  <p className="text-sm text-foreground/70 font-exo">
                    Yes! Contact our Research Collaboration team to learn about data sharing protocols.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-holo-border">
                  <h3 className="font-semibold text-foreground mb-2">Is VISHWA free to use?</h3>
                  <p className="text-sm text-foreground/70 font-exo">
                    Basic access is free for all researchers. Premium features are available for institutional members.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-holo-border">
                  <h3 className="font-semibold text-foreground mb-2">How often is data updated?</h3>
                  <p className="text-sm text-foreground/70 font-exo">
                    Our databases sync with NASA and NCBI daily to provide the latest research findings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
