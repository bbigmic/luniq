import { Card, CardContent } from '@/components/ui/card';

export function AboutTeam() {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      description: 'Visionary leader with 10+ years in e-commerce',
      image: '/api/placeholder/200/200'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      description: 'Tech expert passionate about scalable solutions',
      image: '/api/placeholder/200/200'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Customer Success',
      description: 'Dedicated to ensuring exceptional customer experiences',
      image: '/api/placeholder/200/200'
    },
    {
      name: 'David Kim',
      role: 'Lead Developer',
      description: 'Full-stack developer with a focus on performance',
      image: '/api/placeholder/200/200'
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The passionate people behind our success
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-muted-foreground">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">
                  {member.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
              <p className="text-muted-foreground mb-6">
                We're always looking for talented individuals who share our passion for 
                creating exceptional e-commerce experiences.
              </p>
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                View Open Positions
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
