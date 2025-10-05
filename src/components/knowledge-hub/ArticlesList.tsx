import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArticleCard } from './ArticleCard';
import { DataItem } from '@/hooks/useFetchArticles';

interface ArticlesListProps {
  articles: DataItem[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onGoToPage: (page: number) => void;
  onOpenRelationships: (item: DataItem) => void;
}

export const ArticlesList = ({
  articles,
  loading,
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  onGoToPage,
  onOpenRelationships
}: ArticlesListProps) => {
  if (loading && articles.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="holo-panel p-6 rounded-xl">
            <Skeleton className="h-6 w-3/4 mb-4 bg-holo-border" />
            <Skeleton className="h-4 w-full mb-2 bg-holo-border" />
            <Skeleton className="h-4 w-full mb-2 bg-holo-border" />
            <Skeleton className="h-4 w-2/3 bg-holo-border" />
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0 && !loading) {
    return (
      <div className="text-center py-20 holo-panel rounded-xl">
        <div className="text-6xl mb-4">🔭</div>
        <h3 className="text-xl font-orbitron text-foreground/70 mb-2">No Articles Found</h3>
        <p className="text-foreground/50 font-exo">Try adjusting your search terms or filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((item, index) => (
          <ArticleCard
            key={item.id || index}
            item={item}
            onOpenRelationships={onOpenRelationships}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevPage}
            disabled={currentPage === 1}
            className="border-holo-border hover:border-neon-cyan"
          >
            Previous
          </Button>

          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            let pageNum: number;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => onGoToPage(pageNum)}
                className={
                  currentPage === pageNum
                    ? 'bg-neon-cyan text-background'
                    : 'border-holo-border hover:border-neon-cyan'
                }
              >
                {pageNum}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            onClick={onNextPage}
            disabled={currentPage === totalPages}
            className="border-holo-border hover:border-neon-cyan"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};
