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
    const { endpoint = 'planetary/apod', limit = 10, search = '' } = await req.json();
    console.log('NASA API request:', { endpoint, limit, search });

    const NASA_API_KEY = 'DEMO_KEY'; // Using demo key for NASA API
    let url = '';

    switch (endpoint) {
      case 'planetary/apod':
        url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=${limit}`;
        break;
      case 'mars-photos':
        url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NASA_API_KEY}&page=1`;
        break;
      case 'exoplanets':
        url = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,pl_bmasse,pl_rade,st_dist+from+ps+where+pl_bmasse+is+not+null+and+rownum<=${limit}&format=json`;
        break;
      case 'earth-imagery':
        url = `https://api.nasa.gov/planetary/earth/imagery?lon=-95.33&lat=29.78&dim=0.15&api_key=${NASA_API_KEY}`;
        break;
      default:
        url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=${limit}`;
    }

    console.log('Fetching from NASA API:', url);

    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('NASA API error:', response.status, errorText);
      throw new Error(`NASA API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('NASA data received:', Array.isArray(data) ? data.length : 1, 'items');

    // Transform data for consistent structure
    let transformedData = data;
    
    if (endpoint === 'exoplanets' && Array.isArray(data)) {
      transformedData = data.map((planet: any) => ({
        name: planet.pl_name || 'Unknown',
        mass: planet.pl_bmasse || 'Unknown',
        radius: planet.pl_rade || 'Unknown',
        distance: planet.st_dist || 'Unknown',
        type: 'exoplanet',
        source: 'NASA Exoplanet Archive'
      }));
    } else if (endpoint === 'mars-photos' && data.photos) {
      transformedData = data.photos.slice(0, limit).map((photo: any) => ({
        id: photo.id,
        img_src: photo.img_src,
        earth_date: photo.earth_date,
        rover: photo.rover.name,
        camera: photo.camera.full_name,
        type: 'mars-photo',
        source: 'NASA Mars Rover Photos'
      }));
    }

    return new Response(JSON.stringify({
      data: transformedData,
      endpoint,
      count: Array.isArray(transformedData) ? transformedData.length : 1,
      source: 'NASA Open Data'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in fetch-nasa-data function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      endpoint: 'nasa'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});