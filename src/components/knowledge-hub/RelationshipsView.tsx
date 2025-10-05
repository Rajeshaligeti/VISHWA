import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { DataItem } from '@/hooks/useFetchArticles';

// Lazy load the graph component for performance
const VisGraph = lazy(() => import('./VisGraph'));

interface RelationshipsViewProps {
  data: DataItem[];
  focusedArticle?: DataItem | null;
}

export const RelationshipsView = ({ data, focusedArticle }: RelationshipsViewProps) => {
  return (
    <div className="h-full">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[600px] holo-panel rounded-xl">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-neon-cyan mx-auto mb-4" />
              <p className="text-foreground/70 font-exo">Loading knowledge graph...</p>
            </div>
          </div>
        }
      >
        <VisGraph data={data} focusedArticle={focusedArticle} />
      </Suspense>
    </div>
  );
};
