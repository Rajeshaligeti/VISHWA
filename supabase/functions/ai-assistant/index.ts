import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, stream = false } = await req.json();
    console.log('AI Assistant request:', { stream, messageCount: messages?.length });

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY') || 'AIzaSyAG6jKebhqrfU59nK_DFgNDHXWiNQfvIkg';
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    let systemPrompt = `You are VISHWA-AI, an advanced AI assistant specializing in astronomy, space science,and astrobiology research. You have expertise in:

- Microgravity effects on biological systems
- Space medicine and life support systems  
- Astrobiology and extremophiles
- NASA space missions and research
- NCBI biomedical databases and research
- Biological experiments in space environments
- Mars colonization biology challenges
- Radiation effects on living organisms

Provide accurate, scientific responses with a futuristic, space-exploration tone. Always suggest relevant experiments or research when appropriate. Keep responses concise but informative.`;

    // Convert messages to Gemini format
    const geminiMessages = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Add system prompt as first user message
    geminiMessages.unshift({
      role: 'user',
      parts: [{ text: systemPrompt }]
    });

    const requestBody = {
      contents: geminiMessages,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    console.log('Calling Gemini API directly with model: gemini-2.5-flash');

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again in a moment.',
          type: 'rate_limit'
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 403) {
        return new Response(JSON.stringify({ 
          error: 'API key invalid or quota exceeded. Please check your Gemini API key.',
          type: 'auth_error'
        }), {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      throw new Error(`Gemini API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini API response received successfully');

    // Extract the response content from Gemini format
    let responseContent = '';
    if (data.candidates && data.candidates.length > 0) {
      const candidate = data.candidates[0];
      if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
        responseContent = candidate.content.parts[0].text;
      }
    }

    if (!responseContent) {
      throw new Error('No response content received from Gemini API');
    }

    return new Response(JSON.stringify({ 
      response: responseContent,
      model_used: 'gemini-2.5-flash'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-assistant function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      type: 'server_error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});