import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GitBranch, BarChart3, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StarfieldBackground } from '@/components/StarfieldBackground';
import { FiltersPanel } from '@/components/knowledge-hub/FiltersPanel';
import { ArticlesList } from '@/components/knowledge-hub/ArticlesList';
import { RelationshipsView } from '@/components/knowledge-hub/RelationshipsView';
import { InsightsView } from '@/components/knowledge-hub/InsightsView';
import { GraphModal } from '@/components/knowledge-hub/GraphModal';
import { useFetchArticles, DataItem } from '@/hooks/useFetchArticles';
import { usePagination } from '@/hooks/usePagination';

type TabType = 'articles' | 'relationships' | 'insights';

export default function KnowledgeHub() {
  const [activeTab, setActiveTab] = useState<TabType>('articles');
  const [searchTerm, setSearchTerm] = useState('space biology');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDataset, setSelectedDataset] = useState<'all' | 'nasa' | 'ncbi'>('all');
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(false);
  const [graphModalOpen, setGraphModalOpen] = useState(false);
  const [focusedArticle, setFocusedArticle] = useState<DataItem | null>(null);

  const { nasaData, ncbiData, loading, handleSearch } = useFetchArticles(searchTerm, selectedCategory, selectedDataset);
  const allData = [...nasaData, ...ncbiData];
  const { paginatedData, currentPage, totalPages, goToPage, nextPage, prevPage, reset: resetPagination } = usePagination(allData, 12);

  useEffect(() => { resetPagination(); }, [selectedCategory, selectedDataset, searchTerm, resetPagination]);

  const handleOpenRelationships = useCallback((item: DataItem) => {
    setFocusedArticle(item);
    setGraphModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen relative">
      <StarfieldBackground />
      <div className="relative z-10 pt-20 px-6">
        <div className="max-w-[1600px] mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-gradient-neon mb-6">Knowledge Hub</h1>
            <p className="text-xl text-foreground/80 font-exo max-w-3xl mx-auto">Explore space biology research from NASA and NCBI</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 mb-8 justify-center flex-wrap">
            <Button variant={activeTab === 'articles' ? 'default' : 'outline'} onClick={() => setActiveTab('articles')} className={activeTab === 'articles' ? 'bg-neon-cyan text-background' : 'border-holo-border'}>
              <BookOpen className="w-4 h-4 mr-2" />Articles
            </Button>
            <Button variant={activeTab === 'relationships' ? 'default' : 'outline'} onClick={() => setActiveTab('relationships')} className={activeTab === 'relationships' ? 'bg-neon-cyan text-background' : 'border-holo-border'}>
              <GitBranch className="w-4 h-4 mr-2" />Relationships
            </Button>
            <Button variant={activeTab === 'insights' ? 'default' : 'outline'} onClick={() => setActiveTab('insights')} className={activeTab === 'insights' ? 'bg-neon-cyan text-background' : 'border-holo-border'}>
              <BarChart3 className="w-4 h-4 mr-2" />Insights
            </Button>
          </motion.div>

          <div className="flex gap-6 relative">
            <div className="hidden lg:block">
              <FiltersPanel searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} selectedDataset={selectedDataset} setSelectedDataset={setSelectedDataset} onSearch={handleSearch} isCollapsed={isFiltersCollapsed} onToggleCollapse={() => setIsFiltersCollapsed(!isFiltersCollapsed)} loading={loading} />
            </div>
            <div className="lg:hidden fixed bottom-6 right-6 z-40">
              <Button size="icon" onClick={() => setIsFiltersCollapsed(!isFiltersCollapsed)} className="w-14 h-14 rounded-full bg-gradient-neon shadow-neon">
                <Filter className="w-6 h-6" />
              </Button>
            </div>
            <div className="flex-1 min-w-0">
              <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                {activeTab === 'articles' && <ArticlesList articles={paginatedData} loading={loading} currentPage={currentPage} totalPages={totalPages} onNextPage={nextPage} onPrevPage={prevPage} onGoToPage={goToPage} onOpenRelationships={handleOpenRelationships} />}
                {activeTab === 'relationships' && <RelationshipsView data={allData} />}
                {activeTab === 'insights' && <InsightsView nasaData={nasaData} ncbiData={ncbiData} />}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <GraphModal isOpen={graphModalOpen} onClose={() => { setGraphModalOpen(false); setFocusedArticle(null); }} focusedArticle={focusedArticle} allData={allData} />
    </div>
  );
}
