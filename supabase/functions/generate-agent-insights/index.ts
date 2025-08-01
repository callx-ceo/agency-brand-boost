import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { agentData, yesterdayData } = await req.json()
    
    // Get the Perplexity API key from Supabase secrets
    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY')
    
    if (!perplexityApiKey) {
      throw new Error('Perplexity API key not configured. Please add PERPLEXITY_API_KEY to your Supabase Edge Function secrets.')
    }

    // Construct the prompt for Perplexity AI
    const prompt = `
    As an AI coach for insurance sales agents, analyze this agent's yesterday performance data and provide actionable insights:

    Agent Performance Data:
    - Calls made: ${yesterdayData.calls}
    - Applications generated: ${yesterdayData.applications}
    - Close rate: ${yesterdayData.closeRate}%
    - Average call duration: ${yesterdayData.avgCallDuration}
    - Top decline reasons: ${yesterdayData.topDeclineReasons.join(', ')}
    - Best performing time: ${yesterdayData.bestPerformingHour}
    - Most successful script: ${yesterdayData.mostSuccessfulScript}

    Please provide:
    1. A brief performance summary (2-3 sentences)
    2. 2-3 specific strengths they demonstrated
    3. 2-3 areas for improvement with specific suggestions
    4. 3-4 actionable recommendations for today's calls
    5. Overall sentiment (positive, neutral, or negative)
    6. Confidence score (0-100) for the analysis

    Format your response as a JSON object with these exact keys: summary, strengths, improvements, recommendations, sentiment, confidenceScore
    `

    // Call Perplexity API
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are an expert sales coach for insurance agents. Provide specific, actionable insights based on call performance data. Always respond with valid JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        top_p: 0.9,
        max_tokens: 1000,
        return_images: false,
        return_related_questions: false,
        frequency_penalty: 1,
        presence_penalty: 0
      }),
    })

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.statusText}`)
    }

    const data = await response.json()
    let insights
    
    try {
      // Try to parse the AI response as JSON
      insights = JSON.parse(data.choices[0].message.content)
    } catch (parseError) {
      // If parsing fails, create a structured response from the text
      const content = data.choices[0].message.content
      insights = {
        summary: content.substring(0, 200) + "...",
        strengths: ["Performance analysis completed", "Data reviewed successfully"],
        improvements: ["Review AI feedback", "Apply suggested changes"],
        recommendations: ["Follow AI guidance", "Monitor progress", "Adjust strategy as needed"],
        sentiment: "neutral",
        confidenceScore: 75
      }
    }

    return new Response(
      JSON.stringify(insights),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: error.message,
        summary: "Unable to generate insights at this time",
        strengths: ["Contact support for assistance"],
        improvements: ["Check API configuration"],
        recommendations: ["Try again later", "Contact technical support"],
        sentiment: "neutral",
        confidenceScore: 0
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})