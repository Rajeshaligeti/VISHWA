import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FiltersPanelProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedDataset: 'all' | 'nasa' | 'ncbi';
  setSelectedDataset: (dataset: 'all' | 'nasa' | 'ncbi') => void;
  onSearch: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  loading: boolean;
}

const categories = [
  { name: 'All', value: '', icon: '🌌' },
  { name: 'NASA Missions', value: 'nasa', icon: '🚀' },
  { name: 'Astrobiology', value: 'astrobiology', icon: '🦠' },
  { name: 'Microgravity', value: 'microgravity', icon: '⚖️' },
  { name: 'Mars Research', value: 'mars', icon: '🔴' },
  { name: 'Space Medicine', value: 'space medicine', icon: '⚕️' },
];

export const FiltersPanel = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedDataset,
  setSelectedDataset,
  onSearch,
  isCollapsed,
  onToggleCollapse,
  loading
}: FiltersPanelProps) => {
  const activeFilters = [
    selectedCategory && { type: 'category', value: selectedCategory, label: categories.find(c => c.value === selectedCategory)?.name },
    selectedDataset !== 'all' && { type: 'dataset', value: selectedDataset, label: selectedDataset.toUpperCase() }
  ].filter(Boolean) as { type: string; value: string; label: string }[];

  const clearFilter = (type: string) => {
    if (type === 'category') setSelectedCategory('');
    if (type === 'dataset') setSelectedDataset('all');
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 0 : 320 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="relative overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="w-80 h-full p-6 holo-panel border-r border-holo-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-orbitron font-bold text-neon-cyan">Filters</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleCollapse}
                className="text-foreground/70 hover:text-neon-cyan"
              >
                <ChevronUp className="w-5 h-5" />
              </Button>
            </div>

            {/* Search Input */}
            <div className="mb-6">
              <label className="text-sm font-exo text-foreground/70 mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-cyan w-4 h-4" />
                <Input
                  placeholder="space biology research..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                  className="pl-10 bg-background/50 border-holo-border focus:border-neon-cyan"
                />
              </div>
            </div>

            {/* Dataset Selector */}
            <div className="mb-6">
              <label className="text-sm font-exo text-foreground/70 mb-2 block">Dataset</label>
              <Select value={selectedDataset} onValueChange={(value: any) => setSelectedDataset(value)}>
                <SelectTrigger className="bg-background/50 border-holo-border focus:border-neon-cyan">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="nasa">NASA</SelectItem>
                  <SelectItem value="ncbi">NCBI PubMed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category Selector */}
            <div className="mb-6">
              <label className="text-sm font-exo text-foreground/70 mb-2 block">Category</label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.value)}
                    className={`w-full justify-start ${
                      selectedCategory === category.value
                        ? 'bg-neon-cyan text-background hover:bg-neon-cyan/80'
                        : 'border-holo-border hover:border-neon-cyan'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="mb-6">
                <label className="text-sm font-exo text-foreground/70 mb-2 block">Active Filters</label>
                <div className="flex flex-wrap gap-2">
                  {activeFilters.map((filter) => (
                    <Badge
                      key={filter.type}
                      variant="outline"
                      className="border-neon-cyan text-neon-cyan pr-1"
                    >
                      {filter.label}
                      <button
                        onClick={() => clearFilter(filter.type)}
                        className="ml-1 hover:bg-neon-cyan/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Search Button */}
            <Button
              onClick={onSearch}
              disabled={loading}
              className="w-full bg-gradient-neon hover:opacity-90 text-background font-orbitron"
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed Toggle */}
      {isCollapsed && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="absolute top-4 left-2 text-neon-cyan hover:bg-holo-base"
        >
          <ChevronDown className="w-5 h-5" />
        </Button>
      )}
    </motion.div>
  );
};
