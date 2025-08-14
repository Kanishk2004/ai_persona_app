/**
 * useChat Hook
 * 
 * Custom React hook that manages chat state, message history, and API interactions.
 * Handles sending messages, receiving responses, and persisting chat history.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { getDefaultPersona } from '../lib/personas';

/**
 * Custom hook for managing chat functionality
 * @returns {Object} Chat state and methods
 */
export function useChat() {
  // Chat state management
  const [messages, setMessages] = useState([]);
  const [currentPersona, setCurrentPersona] = useState(getDefaultPersona().id);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Local storage key for persisting chat history
  const STORAGE_KEY = 'ai-persona-chat-history';

  /**
   * Load chat history from localStorage on component mount
   */
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem(STORAGE_KEY);
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
        console.log('📚 Loaded chat history:', parsedMessages.length, 'messages');
      }
    } catch (error) {
      console.error('❌ Error loading chat history:', error);
      // Clear corrupted data
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  /**
   * Save chat history to localStorage whenever messages change
   */
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        console.log('💾 Saved chat history:', messages.length, 'messages');
      } catch (error) {
        console.error('❌ Error saving chat history:', error);
      }
    }
  }, [messages]);

  /**
   * Generate a unique ID for messages
   * @returns {string} Unique message ID
   */
  const generateMessageId = () => {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  /**
   * Add a new message to the chat
   * @param {'user'|'assistant'} role - Who sent the message
   * @param {string} content - Message content
   * @param {string} [persona] - Persona ID for assistant messages
   */
  const addMessage = useCallback((role, content, persona = null) => {
    const newMessage = {
      id: generateMessageId(),
      role,
      content,
      timestamp: Date.now(),
      ...(persona && { persona })
    };

    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  /**
   * Send a message and get AI response
   * @param {string} messageContent - The user's message
   */
  const sendMessage = useCallback(async (messageContent) => {
    if (!messageContent.trim() || isLoading) {
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // Add user message
      const userMessage = addMessage('user', messageContent.trim());
      console.log('📤 Sending message:', messageContent.trim());

      // Prepare API request
      const requestBody = {
        message: messageContent.trim(),
        persona: currentPersona,
        history: messages
      };

      // Call the API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      if (data.success && data.response) {
        // Add assistant response
        addMessage('assistant', data.response, currentPersona);
        console.log('📨 Received response from:', currentPersona);
      } else {
        throw new Error(data.error || 'Invalid response format');
      }

    } catch (error) {
      console.error('❌ Error sending message:', error);
      setError(error.message);
      
      // Add error message to chat
      addMessage('assistant', `Sorry, I encountered an error: ${error.message}`, currentPersona);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, currentPersona, messages, addMessage]);

  /**
   * Switch to a different persona
   * @param {string} personaId - ID of the persona to switch to
   */
  const switchPersona = useCallback((personaId) => {
    if (personaId !== currentPersona) {
      setCurrentPersona(personaId);
      console.log('🔄 Switched to persona:', personaId);
      
      // Add a system message about the persona switch
      addMessage('assistant', `Hello! I'm now responding as ${personaId}. How can I help you?`, personaId);
    }
  }, [currentPersona, addMessage]);

  /**
   * Clear all chat messages
   */
  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    localStorage.removeItem(STORAGE_KEY);
    console.log('🗑️ Chat history cleared');
  }, []);

  /**
   * Retry the last failed message
   */
  const retryLastMessage = useCallback(() => {
    if (messages.length > 0) {
      const lastUserMessage = messages
        .slice()
        .reverse()
        .find(msg => msg.role === 'user');
      
      if (lastUserMessage) {
        sendMessage(lastUserMessage.content);
      }
    }
  }, [messages, sendMessage]);

  return {
    // State
    messages,
    currentPersona,
    isLoading,
    error,
    
    // Actions
    sendMessage,
    switchPersona,
    clearChat,
    retryLastMessage,
    
    // Computed values
    hasMessages: messages.length > 0,
    lastMessage: messages[messages.length - 1] || null,
  };
}
