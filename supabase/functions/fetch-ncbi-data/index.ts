import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { term = 'space biology', database = 'pubmed', retmax = 20, retstart = 0 } = await req.json();
    console.log('NCBI API request:', { term, database, retmax, retstart });

    // First, search for IDs
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=${database}&term=${encodeURIComponent(term)}&retmax=${retmax}&retstart=${retstart}&retmode=json`;
    
    console.log('Searching NCBI:', searchUrl);

    const searchResponse = await fetch(searchUrl);
    if (!searchResponse.ok) {
      throw new Error(`NCBI search failed: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    const idList = searchData.esearchresult?.idlist || [];

    if (idList.length === 0) {
      return new Response(JSON.stringify({
        data: [],
        total: 0,
        term,
        source: 'NCBI PubMed'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch article details
    const fetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=${database}&id=${idList.join(',')}&retmode=xml`;
    
    console.log('Fetching NCBI details for', idList.length, 'articles');

    const fetchResponse = await fetch(fetchUrl);
    if (!fetchResponse.ok) {
      throw new Error(`NCBI fetch failed: ${fetchResponse.status}`);
    }

    const xmlText = await fetchResponse.text();
    
    // Parse XML to extract article information
    const articles = parseNCBIXML(xmlText, idList);

    console.log('NCBI data parsed:', articles.length, 'articles');

    return new Response(JSON.stringify({
      data: articles,
      total: parseInt(searchData.esearchresult?.count || '0'),
      term,
      source: 'NCBI PubMed'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in fetch-ncbi-data function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      source: 'NCBI'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function parseNCBIXML(xmlText: string, idList: string[]): any[] {
  const articles: any[] = [];
  
  // Simple XML parsing for PubMed articles
  const articleMatches = xmlText.match(/<PubmedArticle>[\s\S]*?<\/PubmedArticle>/g) || [];
  
  articleMatches.forEach((articleXml, index) => {
    try {
      const pmid = idList[index] || '';
      
      // Extract title
      const titleMatch = articleXml.match(/<ArticleTitle>(.*?)<\/ArticleTitle>/s);
      const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '') : 'No title available';
      
      // Extract authors
      const authorMatches = articleXml.match(/<Author[^>]*>[\s\S]*?<\/Author>/g) || [];
      const authors = authorMatches.slice(0, 3).map(authorXml => {
        const lastNameMatch = authorXml.match(/<LastName>(.*?)<\/LastName>/);
        const firstNameMatch = authorXml.match(/<ForeName>(.*?)<\/ForeName>/);
        const lastName = lastNameMatch ? lastNameMatch[1] : '';
        const firstName = firstNameMatch ? firstNameMatch[1] : '';
        return `${firstName} ${lastName}`.trim();
      }).filter(name => name);
      
      // Extract publication date
      const pubDateMatch = articleXml.match(/<PubDate>[\s\S]*?<Year>(\d{4})<\/Year>[\s\S]*?<\/PubDate>/);
      const year = pubDateMatch ? pubDateMatch[1] : '';
      
      // Extract journal
      const journalMatch = articleXml.match(/<Title>(.*?)<\/Title>/);
      const journal = journalMatch ? journalMatch[1] : '';
      
      // Extract abstract
      const abstractMatch = articleXml.match(/<AbstractText[^>]*>(.*?)<\/AbstractText>/s);
      const abstract = abstractMatch ? abstractMatch[1].replace(/<[^>]*>/g, '').substring(0, 300) + '...' : 'No abstract available';

      articles.push({
        pmid,
        title,
        authors: authors.join(', ') || 'Unknown authors',
        journal,
        year,
        abstract,
        url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
        type: 'research-article',
        source: 'NCBI PubMed'
      });
    } catch (error) {
      console.error('Error parsing article:', error);
    }
  });
  
  return articles;
}