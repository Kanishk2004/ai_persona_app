/**
 * Google Gemini API Client Configuration
 * 
 * This module sets up the Gemini client for generating AI responses.
 * It handles API initialization, error handling, and response generation.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Initialize Gemini client with API key from environment variables
 */
let genAI;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

/**
 * Generate a response using Google's Gemini model
 * @param {string} systemPrompt - The system prompt that defines the AI's behavior
 * @param {import('../types/chat.js').Message[]} messages - Chat history for context
 * @param {string} userMessage - The current user message
 * @returns {Promise<string>} The AI-generated response
 * @throws {Error} If the API call fails or returns an invalid response
 */
export async function generateGeminiResponse(systemPrompt, messages, userMessage) {
  try {
    if (!genAI) {
      throw new Error('Gemini API not configured. Please check your GEMINI_API_KEY environment variable.');
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Format the conversation with system prompt and history
    let conversationContext = `${systemPrompt}\n\nConversation History:\n`;
    
    // Include previous messages for context (last 10 to avoid token limits)
    const recentMessages = messages.slice(-10);
    recentMessages.forEach(msg => {
      const role = msg.role === 'user' ? 'Human' : 'Assistant';
      conversationContext += `${role}: ${msg.content}\n`;
    });
    
    conversationContext += `\nHuman: ${userMessage}\nAssistant:`;

    console.log('🤖 Gemini Request:', {
      model: 'gemini-1.5-flash',
      messages: recentMessages.length,
      systemPrompt: systemPrompt.slice(0, 100) + '...'
    });

    const result = await model.generateContent(conversationContext);
    const response = result.response;
    const text = response.text();

    if (!text) {
      throw new Error('No response generated from Gemini');
    }

    console.log('✅ Gemini Response generated successfully');
    return text.trim();

  } catch (error) {
    console.error('❌ Gemini API Error:', error);
    
    // Handle specific Gemini errors
    if (error.message?.includes('API_KEY_INVALID')) {
      throw new Error('Invalid Gemini API key. Please check your environment variables.');
    } else if (error.message?.includes('QUOTA_EXCEEDED')) {
      throw new Error('Gemini API quota exceeded. Please try again later.');
    } else if (error.message?.includes('SERVICE_UNAVAILABLE')) {
      throw new Error('Gemini service is currently unavailable. Please try again later.');
    }
    
    throw new Error(`Gemini API error: ${error.message}`);
  }
}

/**
 * Check if Gemini is properly configured
 * @returns {boolean} True if Gemini API key is available
 */
export function isGeminiConfigured() {
  return !!process.env.GEMINI_API_KEY;
}
