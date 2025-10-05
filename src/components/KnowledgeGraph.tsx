import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as d3 from 'd3';

interface Node {
  id: string;
  label: string;
  type: 'nasa' | 'ncbi' | 'topic';
  group: number;
}

interface Link {
  source: string;
  target: string;
  value: number;
}

interface KnowledgeGraphProps {
  data: {
    title: string;
    source: string;
    category?: string;
  }[];
}

export function KnowledgeGraph({ data }: KnowledgeGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current?.parentElement) {
        const width = svgRef.current.parentElement.clientWidth;
        setDimensions({ width, height: 600 });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    // Clear previous graph
    d3.select(svgRef.current).selectAll('*').remove();

    // Create nodes from data
    const nodes: Node[] = [];
    const links: Link[] = [];
    const nodeMap = new Map<string, Node>();

    // Add center topic nodes
    const topics = new Set<string>();
    data.forEach(item => {
      if (item.category) topics.add(item.category);
    });

    const topicsArray = Array.from(topics);
    topicsArray.forEach((topic, i) => {
      const node: Node = {
        id: `topic-${topic}`,
        label: topic,
        type: 'topic',
        group: i
      };
      nodes.push(node);
      nodeMap.set(node.id, node);
    });

    // Add research nodes and links
    data.slice(0, 20).forEach((item, i) => {
      const nodeId = `${item.source}-${i}`;
      const node: Node = {
        id: nodeId,
        label: item.title.substring(0, 30) + '...',
        type: item.source === 'NASA' ? 'nasa' : 'ncbi',
        group: item.category ? topicsArray.indexOf(item.category) : 0
      };
      nodes.push(node);
      nodeMap.set(node.id, node);

      // Link to topic
      const topicId = item.category ? `topic-${item.category}` : `topic-${topicsArray[0]}`;
      if (nodeMap.has(topicId)) {
        links.push({
          source: nodeId,
          target: topicId,
          value: 1
        });
      }
    });

    const svg = d3.select(svgRef.current);
    const width = dimensions.width;
    const height = dimensions.height;

    // Create simulation
    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links as any).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40));

    // Create links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', 'hsl(var(--neon-cyan))')
      .attr('stroke-opacity', 0.3)
      .attr('stroke-width', 2);

    // Create nodes
    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .call(d3.drag<any, any>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any);

    // Add circles
    node.append('circle')
      .attr('r', (d: any) => d.type === 'topic' ? 30 : 20)
      .attr('fill', (d: any) => {
        if (d.type === 'topic') return 'hsl(var(--neon-magenta))';
        if (d.type === 'nasa') return 'hsl(var(--neon-cyan))';
        return 'hsl(var(--neon-purple))';
      })
      .attr('stroke', 'hsl(var(--holo-border))')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', (d: any) => d.type === 'topic' ? 35 : 25);
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', (d: any) => d.type === 'topic' ? 30 : 20);
      });

    // Add labels
    node.append('text')
      .text((d: any) => d.label)
      .attr('font-size', (d: any) => d.type === 'topic' ? '14px' : '10px')
      .attr('dx', 0)
      .attr('dy', (d: any) => d.type === 'topic' ? -40 : -25)
      .attr('text-anchor', 'middle')
      .attr('fill', 'hsl(var(--foreground))')
      .style('pointer-events', 'none')
      .style('font-family', 'Exo 2, sans-serif');

    // Update positions
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [data, dimensions]);

  return (
    <Card className="holo-panel border-holo-border">
      <CardHeader>
        <CardTitle className="text-neon-cyan font-orbitron">Research Knowledge Graph</CardTitle>
        <p className="text-sm text-foreground/70 font-exo">
          Interactive visualization of research connections and topics
        </p>
      </CardHeader>
      <CardContent>
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="w-full"
        />
        <div className="flex gap-4 mt-4 text-sm font-exo">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-neon-magenta" />
            <span className="text-foreground/70">Topics</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-neon-cyan" />
            <span className="text-foreground/70">NASA Data</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-neon-purple" />
            <span className="text-foreground/70">NCBI Research</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
