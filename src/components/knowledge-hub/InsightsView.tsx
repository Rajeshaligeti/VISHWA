import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { DataItem } from '@/hooks/useFetchArticles';

interface InsightsViewProps {
  nasaData: DataItem[];
  ncbiData: DataItem[];
}

const COLORS = [
  'hsl(180, 100%, 50%)', // cyan
  'hsl(300, 100%, 60%)', // magenta
  'hsl(140, 100%, 50%)', // green
  'hsl(200, 100%, 65%)', // electric blue
  'hsl(260, 80%, 50%)',  // purple
];

export const InsightsView = ({ nasaData, ncbiData }: InsightsViewProps) => {
  // Calculate category distribution
  const categoryData = useMemo(() => {
    const categories = new Map<string, number>();
    
    [...nasaData, ...ncbiData].forEach(item => {
      const cat = item.category || 'general';
      categories.set(cat, (categories.get(cat) || 0) + 1);
    });

    return Array.from(categories.entries())
      .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }))
      .sort((a, b) => b.value - a.value);
  }, [nasaData, ncbiData]);

  // Source distribution
  const sourceData = [
    { name: 'NASA', value: nasaData.length },
    { name: 'NCBI PubMed', value: ncbiData.length }
  ];

  // Year distribution for NCBI data
  const yearData = useMemo(() => {
    const years = new Map<string, number>();
    ncbiData.forEach(item => {
      if (item.year) {
        years.set(item.year, (years.get(item.year) || 0) + 1);
      }
    });

    return Array.from(years.entries())
      .map(([year, count]) => ({ year, count }))
      .sort((a, b) => a.year.localeCompare(b.year))
      .slice(-10); // last 10 years
  }, [ncbiData]);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="holo-panel border-holo-border">
          <CardHeader>
            <CardTitle className="text-sm font-exo text-foreground/70">Total Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-orbitron font-bold text-neon-cyan">
              {nasaData.length + ncbiData.length}
            </p>
          </CardContent>
        </Card>

        <Card className="holo-panel border-holo-border">
          <CardHeader>
            <CardTitle className="text-sm font-exo text-foreground/70">NASA Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-orbitron font-bold text-neon-cyan">{nasaData.length}</p>
          </CardContent>
        </Card>

        <Card className="holo-panel border-holo-border">
          <CardHeader>
            <CardTitle className="text-sm font-exo text-foreground/70">NCBI Research</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-orbitron font-bold text-neon-magenta">{ncbiData.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card className="holo-panel border-holo-border">
          <CardHeader>
            <CardTitle className="font-orbitron text-gradient-neon">Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--holo-border))" />
                <XAxis dataKey="name" stroke="hsl(var(--foreground))" tick={{ fill: 'hsl(var(--foreground))' }} />
                <YAxis stroke="hsl(var(--foreground))" tick={{ fill: 'hsl(var(--foreground))' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--holo-border))',
                    borderRadius: '0.5rem'
                  }}
                />
                <Bar dataKey="value" fill="hsl(180, 100%, 50%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Source Distribution */}
        <Card className="holo-panel border-holo-border">
          <CardHeader>
            <CardTitle className="font-orbitron text-gradient-neon">Source Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="hsl(180, 100%, 50%)"
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--holo-border))',
                    borderRadius: '0.5rem'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Year Distribution */}
        {yearData.length > 0 && (
          <Card className="holo-panel border-holo-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-orbitron text-gradient-neon">Publication Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={yearData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--holo-border))" />
                  <XAxis dataKey="year" stroke="hsl(var(--foreground))" tick={{ fill: 'hsl(var(--foreground))' }} />
                  <YAxis stroke="hsl(var(--foreground))" tick={{ fill: 'hsl(var(--foreground))' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--holo-border))',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(300, 100%, 60%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
