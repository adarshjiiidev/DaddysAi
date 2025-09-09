import { NextResponse } from 'next/server';

// Replace Gemini API with OpenRouter API
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "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"; // Replace with your API key
const endpoint = "https://openrouter.ai/api/v1/chat/completions";

async function generateChatResponse(messages: any[], systemPrompt: string, useDeepAnalysis: boolean = false) {
  try {
    // Select model based on deep analysis flag
    const model = useDeepAnalysis 
      ? "deepseek/deepseek-r1-0528:free" // DeepSeek R1 for deep analysis
      : "deepseek/deepseek-chat-v3-0324:free"; // Default DeepSeek v3 model
    
    // Enhance system prompt for deep analysis if needed
    let enhancedSystemPrompt = systemPrompt;
    if (useDeepAnalysis) {
      enhancedSystemPrompt = `${systemPrompt}\n\nPlease provide a deep, thorough analysis with detailed explanations. Consider multiple perspectives, analyze implications, and provide comprehensive insights. Your response should be well-structured, nuanced, and demonstrate expert-level understanding.`;
    }

    // Format the conversation with system prompt as context
    const requestPayload = {
      model: model,
      messages: [
        {
          role: "system",
          content: enhancedSystemPrompt
        },
        ...messages.map(msg => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content
        }))
      ],
      temperature: useDeepAnalysis ? 0.5 : 0.7, // Lower temperature for more focused responses in deep analysis
      max_tokens: useDeepAnalysis ? 4096 : 2048, // More tokens for deep analysis
      stream: false
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://www.optionforbeginner.com',
        'X-Title': 'Daddy AI'
      },
      body: JSON.stringify(requestPayload)
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${responseText}`);
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      throw new Error(`Failed to parse API response as JSON: ${responseText}`);
    }

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from API');
    }

    return data.choices[0].message.content;
  } catch (error) {
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, systemPrompt, useDeepAnalysis } = body;

    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === "your-openrouter-api-key-here") {
      throw new Error('OpenRouter API key not configured');
    }

    if (!Array.isArray(messages)) {
      throw new Error('Messages must be an array');
    }

    if (typeof systemPrompt !== 'string') {
      throw new Error('System prompt must be a string');
    }

    let responseContent = await generateChatResponse(messages, systemPrompt, useDeepAnalysis);
    
    // Extract thinking content if present (enclosed in <think></think> tags)
    let thinking = "";
    const thinkingMatch = responseContent.match(/<think>(.*?)<\/think>/s);
    if (thinkingMatch) {
      thinking = thinkingMatch[1].trim();
      // Remove the thinking section from the main content
      responseContent = responseContent.replace(/<think>.*?<\/think>/s, '').trim();
    }
    
    // Remove asterisks and hash symbols from the response to prevent text-to-speech from reading them
    // This is in addition to the client-side cleaning in the speakText function
    responseContent = responseContent
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/#+\s?/g, ''); // Remove hash symbols used for headings

    return NextResponse.json({
      message: responseContent,
      thinking: thinking || null
    });

  } catch (error: any) {
    return NextResponse.json(
      { 
        error: error?.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? {
          stack: error?.stack,
          name: error?.name
        } : undefined
      },
      { status: 500 }
    );
  }
}