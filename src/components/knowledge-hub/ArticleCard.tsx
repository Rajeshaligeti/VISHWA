import { ExternalLink, GitBranch } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataItem } from '@/hooks/useFetchArticles';

interface ArticleCardProps {
  item: DataItem;
  onOpenRelationships: (item: DataItem) => void;
}

export const ArticleCard = ({ item, onOpenRelationships }: ArticleCardProps) => {
  return (
    <Card className="holo-panel hover-scale border-holo-border h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-orbitron font-semibold text-foreground line-clamp-2">
            {item.title}
          </CardTitle>
          <Badge
            variant="outline"
            className={`text-xs whitespace-nowrap ${
              item.source === 'NASA'
                ? 'border-neon-cyan text-neon-cyan'
                : 'border-neon-magenta text-neon-magenta'
            }`}
          >
            {item.source}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-foreground/70 font-exo text-sm mb-4 line-clamp-3 flex-1">
          {item.description}
        </p>

        {item.authors && (
          <p className="text-xs text-foreground/60 mb-2">
            <strong>Authors:</strong> {item.authors}
          </p>
        )}

        {item.year && (
          <p className="text-xs text-foreground/60 mb-4">
            <strong>Year:</strong> {item.year}
          </p>
        )}

        <div className="flex gap-2 mt-auto">
          {item.url && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1 border-holo-border hover:border-neon-cyan"
            >
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 mr-1" />
                View
              </a>
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenRelationships(item)}
            className="flex-1 border-holo-border hover:border-neon-magenta text-neon-magenta"
          >
            <GitBranch className="w-3 h-3 mr-1" />
            Relations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
