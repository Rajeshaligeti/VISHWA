import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface DataItem {
  id?: string;
  title: string;
  description?: string;
  source: string;
  type: string;
  url?: string;
  authors?: string;
  year?: string;
  category?: string;
}

export const useFetchArticles = (
  searchTerm: string,
  selectedCategory: string,
  selectedDataset: 'all' | 'nasa' | 'ncbi'
) => {
  const [nasaData, setNasaData] = useState<DataItem[]>([]);
  const [ncbiData, setNcbiData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNASAData = async (category: string = '') => {
    try {
      setLoading(true);
      
      // Determine search term based on category
      let searchQuery = 'space biology';
      if (category === 'astrobiology') searchQuery = 'astrobiology';
      if (category === 'microgravity') searchQuery = 'microgravity';
      if (category === 'mars') searchQuery = 'mars biology';
      if (category === 'space medicine') searchQuery = 'space medicine';
      
      const { data, error } = await supabase.functions.invoke('fetch-nasa-data', {
        body: { 
          endpoint: 'planetary/apod',
          limit: 12,
          search: searchQuery
        }
      });

      if (error) throw error;

      const transformedData = (data.data || []).map((item: any) => ({
        id: item.date || Math.random().toString(),
        title: item.title || 'NASA Data',
        description: item.explanation || item.description || 'NASA space data',
        source: 'NASA',
        type: 'space-data',
        url: item.url || item.hdurl,
        category: category || 'nasa'
      }));

      setNasaData(transformedData);
    } catch (error) {
      console.error('Error fetching NASA data:', error);
      toast.error('Failed to fetch NASA data');
    }
  };

  const fetchNCBIData = async (category: string = '') => {
    try {
      setLoading(true);
      
      // Build search query based on category
      let searchQuery = searchTerm;
      if (category) {
        if (category === 'nasa') {
          searchQuery = `${searchTerm} space missions`;
        } else if (category === 'astrobiology') {
          searchQuery = `${searchTerm} astrobiology extremophiles`;
        } else if (category === 'microgravity') {
          searchQuery = `${searchTerm} microgravity weightlessness`;
        } else if (category === 'mars') {
          searchQuery = `${searchTerm} mars exploration`;
        } else if (category === 'space medicine') {
          searchQuery = `${searchTerm} space medicine astronaut health`;
        } else {
          searchQuery = `${searchTerm} ${category}`;
        }
      }
      
      const { data, error } = await supabase.functions.invoke('fetch-ncbi-data', {
        body: { 
          term: searchQuery,
          retmax: 15
        }
      });

      if (error) throw error;

      const transformedData = (data.data || []).map((item: any) => ({
        id: item.pmid || Math.random().toString(),
        title: item.title,
        description: item.abstract,
        source: 'NCBI PubMed',
        type: 'research-article',
        url: item.url,
        authors: item.authors,
        year: item.year,
        category: category || 'research'
      }));

      setNcbiData(transformedData);
    } catch (error) {
      console.error('Error fetching NCBI data:', error);
      toast.error('Failed to fetch NCBI data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDataset === 'all' || selectedDataset === 'nasa') {
      fetchNASAData(selectedCategory);
    }
    if (selectedDataset === 'all' || selectedDataset === 'ncbi') {
      fetchNCBIData(selectedCategory);
    }
  }, [selectedCategory, selectedDataset]);

  const handleSearch = async () => {
    if (selectedDataset === 'all' || selectedDataset === 'nasa') {
      await fetchNASAData(selectedCategory);
    }
    if (selectedDataset === 'all' || selectedDataset === 'ncbi') {
      await fetchNCBIData(selectedCategory);
    }
  };

  return { nasaData, ncbiData, loading, handleSearch };
};
