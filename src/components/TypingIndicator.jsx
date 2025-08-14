/**
 * TypingIndicator Component
 * 
 * Displays an animated typing indicator when the AI is generating a response.
 * Provides visual feedback to users during response generation.
 */

'use client';

import { motion } from 'framer-motion';

/**
 * Animated typing indicator component
 * @param {Object} props - Component props
 * @param {string} [props.persona] - Current persona for styling
 * @returns {JSX.Element} Typing indicator component
 */
export default function TypingIndicator({ persona = 'hitesh' }) {
  return (
    <div className="flex items-center space-x-2 p-4">
      <div className="flex space-x-1">
        {/* Animated dots */}
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-slate-500 rounded-full"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
      <span className="text-sm text-slate-400 ml-2">
        AI is thinking...
      </span>
    </div>
  );
}
