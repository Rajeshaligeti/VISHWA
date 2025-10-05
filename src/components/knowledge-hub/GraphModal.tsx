import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RelationshipsView } from './RelationshipsView';
import { DataItem } from '@/hooks/useFetchArticles';

interface GraphModalProps {
  isOpen: boolean;
  onClose: () => void;
  focusedArticle: DataItem | null;
  allData: DataItem[];
}

export const GraphModal = ({ isOpen, onClose, focusedArticle, allData }: GraphModalProps) => {
  if (!isOpen || !focusedArticle) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/95 backdrop-blur-lg z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 z-50 flex items-center justify-center"
          >
            <div className="w-full h-full max-w-7xl max-h-[90vh] flex flex-col lg:flex-row gap-4">
              {/* Side Panel - Article Info */}
              <Card className="holo-panel border-holo-border lg:w-80 flex-shrink-0 overflow-auto">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg font-orbitron text-foreground">
                      Article Details
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      className="text-foreground/70 hover:text-neon-cyan"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{focusedArticle.title}</h3>
                    <Badge
                      variant="outline"
                      className={
                        focusedArticle.source === 'NASA'
                          ? 'border-neon-cyan text-neon-cyan'
                          : 'border-neon-magenta text-neon-magenta'
                      }
                    >
                      {focusedArticle.source}
                    </Badge>
                  </div>

                  {focusedArticle.description && (
                    <div>
                      <p className="text-sm text-foreground/70 font-exo">
                        {focusedArticle.description}
                      </p>
                    </div>
                  )}

                  {focusedArticle.authors && (
                    <div>
                      <p className="text-xs font-semibold text-foreground/80 mb-1">Authors</p>
                      <p className="text-xs text-foreground/60">{focusedArticle.authors}</p>
                    </div>
                  )}

                  {focusedArticle.year && (
                    <div>
                      <p className="text-xs font-semibold text-foreground/80 mb-1">Year</p>
                      <p className="text-xs text-foreground/60">{focusedArticle.year}</p>
                    </div>
                  )}

                  {focusedArticle.category && (
                    <div>
                      <p className="text-xs font-semibold text-foreground/80 mb-1">Category</p>
                      <p className="text-xs text-foreground/60 capitalize">{focusedArticle.category}</p>
                    </div>
                  )}

                  {focusedArticle.url && (
                    <Button
                      asChild
                      className="w-full bg-gradient-neon hover:opacity-90 text-background font-orbitron"
                    >
                      <a href={focusedArticle.url} target="_blank" rel="noopener noreferrer">
                        Open Source
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Main Graph Area */}
              <div className="flex-1 overflow-auto">
                <RelationshipsView data={allData} focusedArticle={focusedArticle} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
