/**
 * Chat Types and Data Structures
 * 
 * This file contains JSDoc type definitions for the chat application.
 * These help with IDE intellisense and code documentation.
 */

/**
 * @typedef {Object} Message
 * @property {string} id - Unique identifier for the message
 * @property {'user'|'assistant'} role - Who sent the message
 * @property {string} content - The message text content
 * @property {number} timestamp - When the message was created (Unix timestamp)
 * @property {string} [persona] - Which persona responded (for assistant messages)
 */

/**
 * @typedef {Object} Persona
 * @property {string} id - Unique identifier for the persona
 * @property {string} name - Display name of the persona
 * @property {string} description - Brief description of the persona
 * @property {string} systemPrompt - System prompt that defines the persona's behavior
 * @property {string} avatar - Path to the persona's avatar image
 * @property {string} color - Primary color theme for the persona
 * @property {string} provider - AI provider to use ('openai' or 'gemini')
 */

/**
 * @typedef {Object} ChatState
 * @property {Message[]} messages - Array of chat messages
 * @property {string} currentPersona - ID of the currently selected persona
 * @property {boolean} isLoading - Whether a response is being generated
 * @property {string|null} error - Current error message, if any
 */

/**
 * @typedef {Object} ChatRequest
 * @property {string} message - The user's message
 * @property {string} persona - The selected persona ID
 * @property {Message[]} history - Previous messages for context
 */

/**
 * @typedef {Object} ChatResponse
 * @property {string} response - The AI-generated response
 * @property {boolean} success - Whether the request was successful
 * @property {string} [error] - Error message if success is false
 */

// Export an empty object to make this a proper ES module
export {};
