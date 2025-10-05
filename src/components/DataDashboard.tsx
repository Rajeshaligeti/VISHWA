import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataDashboardProps {
  nasaCount: number;
  ncbiCount: number;
  categoryData: { name: string; value: number }[];
}

export function DataDashboard({ nasaCount, ncbiCount, categoryData }: DataDashboardProps) {
  const sourceData = [
    { name: 'NASA', value: nasaCount, fill: 'hsl(var(--neon-cyan))' },
    { name: 'NCBI', value: ncbiCount, fill: 'hsl(var(--neon-magenta))' }
  ];

  const trendData = [
    { month: 'Jan', nasa: 45, ncbi: 67 },
    { month: 'Feb', nasa: 52, ncbi: 71 },
    { month: 'Mar', nasa: 58, ncbi: 78 },
    { month: 'Apr', nasa: 63, ncbi: 82 },
    { month: 'May', nasa: nasaCount, ncbi: ncbiCount }
  ];

  const COLORS = ['hsl(var(--neon-cyan))', 'hsl(var(--neon-magenta))', 'hsl(var(--neon-purple))', 'hsl(var(--neon-yellow))', 'hsl(var(--neon-green))'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Data Source Distribution */}
      <Card className="holo-panel border-holo-border">
        <CardHeader>
          <CardTitle className="text-neon-cyan font-orbitron text-lg">Data Source Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                dataKey="value"
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--holo-base))',
                  border: '1px solid hsl(var(--holo-border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="holo-panel border-holo-border">
        <CardHeader>
          <CardTitle className="text-neon-cyan font-orbitron text-lg">Research Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--holo-border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--foreground))"
                style={{ fontSize: '12px', fontFamily: 'Exo 2' }}
              />
              <YAxis 
                stroke="hsl(var(--foreground))"
                style={{ fontSize: '12px', fontFamily: 'Exo 2' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--holo-base))',
                  border: '1px solid hsl(var(--holo-border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Bar dataKey="value" fill="hsl(var(--neon-magenta))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Research Trend */}
      <Card className="holo-panel border-holo-border lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-neon-cyan font-orbitron text-lg">Research Data Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--holo-border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--foreground))"
                style={{ fontSize: '12px', fontFamily: 'Exo 2' }}
              />
              <YAxis 
                stroke="hsl(var(--foreground))"
                style={{ fontSize: '12px', fontFamily: 'Exo 2' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--holo-base))',
                  border: '1px solid hsl(var(--holo-border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Legend 
                wrapperStyle={{ 
                  fontFamily: 'Exo 2',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="nasa" 
                stroke="hsl(var(--neon-cyan))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--neon-cyan))' }}
              />
              <Line 
                type="monotone" 
                dataKey="ncbi" 
                stroke="hsl(var(--neon-magenta))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--neon-magenta))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
