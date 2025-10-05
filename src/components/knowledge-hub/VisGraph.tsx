import { useEffect, useRef, useState } from 'react';
import { Network } from 'vis-network/standalone';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataItem } from '@/hooks/useFetchArticles';

interface VisGraphProps {
  data: DataItem[];
  focusedArticle?: DataItem | null;
}

const VisGraph = ({ data, focusedArticle }: VisGraphProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current?.parentElement) {
        const width = containerRef.current.parentElement.clientWidth;
        setDimensions({ width, height: 600 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!containerRef.current || data.length === 0) return;

    // Clear previous graph
    if (networkRef.current) {
      networkRef.current.destroy();
    }

    // Build nodes and edges from data
    const categoryMap = new Map<string, Set<string>>();
    data.forEach(item => {
      const category = item.category || 'general';
      if (!categoryMap.has(category)) {
        categoryMap.set(category, new Set());
      }
      categoryMap.get(category)!.add(item.id || item.title);
    });

    // Create topic nodes (categories)
    const topicNodes = Array.from(categoryMap.keys()).map((category, idx) => ({
      id: `topic-${category}`,
      label: category.charAt(0).toUpperCase() + category.slice(1),
      group: 'topic',
      shape: 'dot',
      size: 30,
      color: {
        background: 'hsl(180, 100%, 50%)',
        border: 'hsl(180, 100%, 40%)',
        highlight: { background: 'hsl(180, 100%, 60%)', border: 'hsl(180, 100%, 50%)' }
      }
    }));

    // Create article nodes
    const articleNodes = data.map(item => ({
      id: item.id || item.title,
      label: item.title.length > 30 ? item.title.substring(0, 30) + '...' : item.title,
      title: item.title, // tooltip
      group: item.source === 'NASA' ? 'nasa' : 'ncbi',
      shape: 'dot',
      size: 15,
      color:
        item.source === 'NASA'
          ? {
              background: 'hsl(180, 100%, 50%)',
              border: 'hsl(180, 100%, 40%)',
              highlight: { background: 'hsl(180, 100%, 60%)', border: 'hsl(180, 100%, 50%)' }
            }
          : {
              background: 'hsl(300, 100%, 60%)',
              border: 'hsl(300, 100%, 50%)',
              highlight: { background: 'hsl(300, 100%, 70%)', border: 'hsl(300, 100%, 60%)' }
            },
      url: item.url
    }));

    const nodes = [...topicNodes, ...articleNodes];

    // Create edges: link articles to their topic nodes
    const edges: any[] = [];
    data.forEach(item => {
      const category = item.category || 'general';
      edges.push({
        from: `topic-${category}`,
        to: item.id || item.title,
        color: { color: 'hsl(180, 50%, 30%)', highlight: 'hsl(180, 80%, 50%)' },
        width: 1
      });
    });

    // Initialize Vis.js Network
    const graphData = { nodes, edges };
    const options = {
      nodes: {
        font: {
          color: 'hsl(180, 100%, 95%)',
          size: 12,
          face: 'Exo 2'
        },
        borderWidth: 2,
        shadow: { enabled: true, color: 'hsl(180, 100%, 50%)', size: 10, x: 0, y: 0 }
      },
      edges: {
        smooth: { enabled: true, type: 'continuous', roundness: 0.5 }
      },
      physics: {
        stabilization: { iterations: 100 },
        barnesHut: {
          gravitationalConstant: -8000,
          springConstant: 0.04,
          springLength: 150
        }
      },
      interaction: {
        hover: true,
        tooltipDelay: 100,
        zoomView: true,
        dragView: true
      }
    };

    networkRef.current = new Network(containerRef.current, graphData, options);

    // Handle node clicks - open article URL in new tab
    networkRef.current.on('click', (params) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const node = articleNodes.find(n => n.id === nodeId);
        if (node?.url) {
          window.open(node.url, '_blank', 'noopener,noreferrer');
        }
      }
    });

    // Focus on specific article if provided
    if (focusedArticle) {
      const focusId = focusedArticle.id || focusedArticle.title;
      networkRef.current.once('stabilizationIterationsDone', () => {
        networkRef.current?.focus(focusId, {
          scale: 1.5,
          animation: { duration: 1000, easingFunction: 'easeInOutQuad' }
        });
        networkRef.current?.selectNodes([focusId]);
      });
    }

    return () => {
      if (networkRef.current) {
        networkRef.current.destroy();
      }
    };
  }, [data, focusedArticle, dimensions]);

  return (
    <Card className="holo-panel border-holo-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-orbitron text-gradient-neon mb-2">
              Knowledge Graph
            </CardTitle>
            <p className="text-sm text-foreground/70 font-exo">
              Interactive visualization of research relationships • Click nodes to explore
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          ref={containerRef}
          style={{ width: '100%', height: dimensions.height }}
          className="rounded-lg border border-holo-border bg-background/30"
        />

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[hsl(180,100%,50%)] shadow-neon" />
            <span className="text-sm font-exo text-foreground/70">Topics</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(180,100%,50%)]" />
            <span className="text-sm font-exo text-foreground/70">NASA Data</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(300,100%,60%)]" />
            <span className="text-sm font-exo text-foreground/70">NCBI Research</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisGraph;
