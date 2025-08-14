/**
 * Chat API Route
 * 
 * Handles POST requests to generate AI responses using OpenAI or Gemini APIs.
 * Routes requests to appropriate AI providers based on persona configuration.
 */

import { NextResponse } from 'next/server';
import { getPersonaById } from '../../../lib/personas';
import { generateOpenAIResponse, isOpenAIConfigured } from '../../../lib/openaiClient';
import { generateGeminiResponse, isGeminiConfigured } from '../../../lib/geminiClient';

/**
 * Handle POST requests to the chat API
 * @param {Request} request - The incoming request
 * @returns {Promise<NextResponse>} The API response
 */
export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();
    const { message, persona: personaId, history = [] } = body;

    // Validate request
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    if (!personaId || typeof personaId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Persona ID is required and must be a string' },
        { status: 400 }
      );
    }

    // Get persona configuration
    const persona = getPersonaById(personaId);
    if (!persona) {
      return NextResponse.json(
        { success: false, error: `Persona '${personaId}' not found` },
        { status: 404 }
      );
    }

    console.log('🎭 Processing chat request:', {
      persona: persona.name,
      provider: persona.provider,
      messageLength: message.length,
      historyLength: history.length
    });

    // Validate message length
    if (message.length > 2000) {
      return NextResponse.json(
        { success: false, error: 'Message is too long. Please keep it under 2000 characters.' },
        { status: 400 }
      );
    }

    // Generate response based on persona's provider
    let response;
    
    if (persona.provider === 'openai') {
      // Check if OpenAI is configured
      if (!isOpenAIConfigured()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'OpenAI is not configured. Please set your OPENAI_API_KEY environment variable.' 
          },
          { status: 500 }
        );
      }
      
      response = await generateOpenAIResponse(
        persona.systemPrompt,
        history,
        message
      );
      
    } else if (persona.provider === 'gemini') {
      // Check if Gemini is configured
      if (!isGeminiConfigured()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Gemini is not configured. Please set your GEMINI_API_KEY environment variable.' 
          },
          { status: 500 }
        );
      }
      
      response = await generateGeminiResponse(
        persona.systemPrompt,
        history,
        message
      );
      
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: `Unsupported AI provider: ${persona.provider}` 
        },
        { status: 400 }
      );
    }

    // Validate response
    if (!response || typeof response !== 'string') {
      throw new Error('Invalid response generated from AI provider');
    }

    console.log('✅ Successfully generated response:', {
      persona: persona.name,
      provider: persona.provider,
      responseLength: response.length
    });

    // Return successful response
    return NextResponse.json({
      success: true,
      response: response.trim(),
      persona: personaId,
      provider: persona.provider
    });

  } catch (error) {
    console.error('❌ Chat API Error:', error);
    
    // Handle specific error types
    const errorMessage = error.message || 'An unexpected error occurred';
    const statusCode = error.status || 500;
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: statusCode }
    );
  }
}

/**
 * Handle GET requests (method not allowed)
 * @returns {NextResponse} Error response
 */
export async function GET() {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Method not allowed. Use POST to send chat messages.' 
    },
    { status: 405 }
  );
}

/**
 * Handle other HTTP methods (method not allowed)
 * @returns {NextResponse} Error response
 */
export async function PUT() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
}
