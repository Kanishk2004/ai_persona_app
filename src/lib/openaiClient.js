/**
 * OpenAI API Client Configuration
 * 
 * This module sets up the OpenAI client for generating AI responses.
 * It handles API initialization, error handling, and response generation.
 */

import OpenAI from 'openai';

/**
 * Initialize OpenAI client with API key from environment variables
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate a response using OpenAI's GPT model
 * @param {string} systemPrompt - The system prompt that defines the AI's behavior
 * @param {import('../types/chat.js').Message[]} messages - Chat history for context
 * @param {string} userMessage - The current user message
 * @returns {Promise<string>} The AI-generated response
 * @throws {Error} If the API call fails or returns an invalid response
 */
export async function generateOpenAIResponse(systemPrompt, messages, userMessage) {
  try {
    // Format messages for OpenAI API
    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      // Include previous messages for context (last 10 to avoid token limits)
      ...messages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: userMessage }
    ];

    console.log('🤖 OpenAI Request:', {
      model: 'gpt-4',
      messages: formattedMessages.length,
      systemPrompt: systemPrompt.slice(0, 100) + '...'
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: formattedMessages,
      max_tokens: 1000,
      temperature: 0.7,
      stream: false,
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('No response generated from OpenAI');
    }

    console.log('✅ OpenAI Response generated successfully');
    return response.trim();

  } catch (error) {
    console.error('❌ OpenAI API Error:', error);
    
    // Handle specific OpenAI errors
    if (error.status === 401) {
      throw new Error('Invalid OpenAI API key. Please check your environment variables.');
    } else if (error.status === 429) {
      throw new Error('OpenAI API rate limit exceeded. Please try again later.');
    } else if (error.status === 500) {
      throw new Error('OpenAI service is currently unavailable. Please try again later.');
    }
    
    throw new Error(`OpenAI API error: ${error.message}`);
  }
}

/**
 * Check if OpenAI is properly configured
 * @returns {boolean} True if OpenAI API key is available
 */
export function isOpenAIConfigured() {
  return !!process.env.OPENAI_API_KEY;
}
