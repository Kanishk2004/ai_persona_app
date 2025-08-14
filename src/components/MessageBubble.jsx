/**
 * MessageBubble Component
 * 
 * Renders individual chat messages with persona-specific styling.
 * Handles both user and assistant messages with appropriate formatting.
 */

'use client';

import { motion } from 'framer-motion';
import { personas } from '../lib/personas';
import Image from 'next/image';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

/**
 * Individual message bubble component
 * @param {Object} props - Component props
 * @param {import('../types/chat.js').Message} props.message - Message data
 * @param {boolean} [props.isLast] - Whether this is the last message
 * @returns {JSX.Element} Message bubble component
 */
export default function MessageBubble({ message, isLast = false }) {
  const isUser = message.role === 'user';
  const persona = personas.find(p => p.id === message.persona);
  const [imageError, setImageError] = useState(false);
  
  // Format timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 ${
        isLast ? 'mb-6' : ''
      }`}
    >
      <div className={`max-w-[70%] ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Message content */}
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-md'
              : `rounded-bl-md text-slate-200 shadow-md ${
                  persona ? 'border-l-4' : 'bg-slate-800'
                }`
          }`}
          style={{
            backgroundColor: !isUser && persona ? `${persona.color}15` : undefined,
            borderLeftColor: !isUser && persona ? persona.color : undefined,
          }}
        >
          {/* Assistant persona label */}
          {!isUser && persona && (
            <div className="flex items-center mb-2">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: persona.color }}
              />
              <span 
                className="text-sm font-semibold"
                style={{ color: persona.color }}
              >
                {persona.name}
              </span>
            </div>
          )}
          
          {/* Message text */}
          <div className="text-sm leading-relaxed">
            <ReactMarkdown
              components={{
                // Custom styling for markdown elements
                strong: ({ children }) => (
                  <strong className="font-bold text-white">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic">{children}</em>
                ),
                code: ({ children }) => (
                  <code className="bg-slate-700 px-1 py-0.5 rounded text-xs font-mono">
                    {children}
                  </code>
                ),
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc ml-4 mb-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal ml-4 mb-2">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="mb-1">{children}</li>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
        
        {/* Timestamp */}
        <div className={`text-xs text-slate-500 mt-1 ${
          isUser ? 'text-right' : 'text-left'
        }`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
      
      {/* Avatar for assistant messages */}
      {!isUser && persona && (
        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center mr-3 order-0 overflow-hidden border-2 border-slate-600">
          {!imageError ? (
            <Image
              src={persona.avatar}
              alt={`${persona.name} avatar`}
              width={32}
              height={32}
              className="w-full h-full object-cover rounded-full"
              onError={() => setImageError(true)}
            />
          ) : (
            // Fallback colored circle if image fails to load
            <div 
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: persona.color }}
            />
          )}
        </div>
      )}
    </motion.div>
  );
}
