/**
 * ChatWindow Component
 *
 * Main chat interface component that orchestrates the entire chat experience.
 * Handles message display, input, and persona managem            className="flex items-center justify-between p-4 bg-red-900 border border-red-700 rounded-lg">nt.
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageBubble from './MessageBubble';
import PersonaSelector from './PersonaSelector';
import TypingIndicator from './TypingIndicator';
import { useChat } from '../hooks/useChat';
import Image from 'next/image';

/**
 * Main chat window component
 * @returns {JSX.Element} Chat window component
 */
export default function ChatWindow() {
	const [inputMessage, setInputMessage] = useState('');
	const [showPersonaSelector, setShowPersonaSelector] = useState(false);
	const [showDeveloperInfo, setShowDeveloperInfo] = useState(false);
	const messagesEndRef = useRef(null);
	const inputRef = useRef(null);

	const {
		messages,
		currentPersona,
		isLoading,
		error,
		sendMessage,
		switchPersona,
		clearChat,
		hasMessages,
		retryLastMessage,
	} = useChat();

	/**
	 * Auto-scroll to bottom when new messages arrive
	 */
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages, isLoading]);

	/**
	 * Handle form submission
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!inputMessage.trim() || isLoading) return;

		const message = inputMessage;
		setInputMessage('');
		await sendMessage(message);

		// Focus back on input
		inputRef.current?.focus();
	};

	/**
	 * Handle keyboard shortcuts
	 */
	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	return (
		<div className="flex flex-col h-screen bg-slate-900">
			{/* Header */}
			<div className="flex items-center justify-between p-3 sm:p-4 bg-slate-800 border-b border-slate-700 shadow-sm">
				<div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
					<h1 className="text-lg sm:text-xl font-bold text-white truncate">
						<a href="/">AI Persona Chat</a>
					</h1>
					<div className="hidden sm:block text-xs text-slate-400">
						by{' '}
						<a
							href="https://github.com/Kanishk2004"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-400 hover:text-blue-300 underline">
							Kanishk Chandna
						</a>
					</div>
				</div>

				<div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
					{/* Developer Info Button */}
					<motion.button
						onClick={() => setShowDeveloperInfo(!showDeveloperInfo)}
						className="px-2 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						title="Developer Info">
						<div className="flex items-center space-x-2">
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
							</svg>
							<span>KC</span>
						</div>
					</motion.button>

					{/* Persona toggle button */}
					<motion.button
						onClick={() => setShowPersonaSelector(!showPersonaSelector)}
						className="px-2 sm:px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}>
						<span className="hidden sm:inline">Switch Persona</span>
						<span className="sm:hidden">Switch</span>
					</motion.button>

					{/* Clear chat button */}
					{hasMessages && (
						<motion.button
							onClick={clearChat}
							className="px-2 sm:px-4 py-2 bg-red-900 hover:bg-red-800 text-red-200 rounded-lg text-xs sm:text-sm font-medium transition-colors"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}>
							<span className="hidden sm:inline">Clear Chat</span>
							<span className="sm:hidden">Clear</span>
						</motion.button>
					)}
				</div>
			</div>

			{/* Developer Info Panel */}
			<AnimatePresence>
				{showDeveloperInfo && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
						className="border-b bg-slate-800 border-slate-700">
						<div className="p-3 sm:p-4">
							<div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-4 sm:p-6 border border-slate-600">
								<div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 mb-4">
									<div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
										<Image
											src={'/picofme.png'}
											alt="Kanishk Chandna"
											className="rounded-full"
											height={48}
											width={48}
										/>
									</div>
									<div className="text-center sm:text-left">
										<h3 className="text-lg sm:text-xl font-bold text-white">
											Kanishk Chandna
										</h3>
										<p className="text-blue-300 text-sm sm:text-base">
											Full Stack Developer & AI Enthusiast
										</p>
									</div>
								</div>

								<p className="text-slate-300 mb-4 text-sm sm:text-base text-center sm:text-left">
									Passionate about building modern web applications with AI
									integration. This chat app showcases the power of multiple AI
									personas and seamless user experience.
								</p>

								<div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
									<a
										href="https://www.kanishk.codes/"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white transition-colors text-sm">
										<Image
											src="/portfolio.svg"
											alt="Portfolio"
											className="mr-1 sm:mr-2"
											width={16}
											height={16}
										/>
										<span className="hidden sm:inline">Portfolio</span>
										<span className="sm:hidden">Site</span>
									</a>

									<a
										href="https://github.com/Kanishk2004"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center px-3 sm:px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 hover:text-white transition-colors text-sm">
										<svg
											className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
											fill="currentColor"
											viewBox="0 0 24 24">
											<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
										</svg>
										<span className="hidden sm:inline">GitHub</span>
										<span className="sm:hidden">Git</span>
									</a>

									<a
										href="https://x.com/Kanishk_fr"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center px-3 sm:px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 hover:text-white transition-colors text-sm">
										<svg
											className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
											fill="currentColor"
											viewBox="0 0 24 24">
											<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
										</svg>
										<span className="hidden sm:inline">Twitter</span>
										<span className="sm:hidden">X</span>
									</a>

									<a
										href="https://www.linkedin.com/in/kanishk-chandna-9553931b0/"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center px-3 sm:px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 hover:text-white transition-colors text-sm">
										<svg
											className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
											fill="currentColor"
											viewBox="0 0 24 24">
											<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
										</svg>
										<span className="hidden sm:inline">LinkedIn</span>
										<span className="sm:hidden">In</span>
									</a>

									<button
										onClick={() => setShowDeveloperInfo(false)}
										className="flex items-center px-3 sm:px-4 py-2 bg-red-900 hover:bg-red-800 rounded-lg text-red-200 hover:text-white transition-colors ml-auto text-sm">
										<svg
											className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
										<span className="hidden sm:inline">Close</span>
										<span className="sm:hidden">×</span>
									</button>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Persona Selector */}
			<AnimatePresence>
				{showPersonaSelector && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
						className="border-b bg-slate-800">
						<PersonaSelector
							currentPersona={currentPersona}
							onPersonaChange={(personaId) => {
								switchPersona(personaId);
								setShowPersonaSelector(false);
							}}
							disabled={isLoading}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Chat Messages */}
			<div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
				{!hasMessages && (
					<motion.div
						className="flex flex-col items-center justify-center h-full text-center px-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}>
						<div className="max-w-md mx-auto">
							<h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
								Welcome to AI Persona Chat! 👋
							</h2>
							<p className="text-slate-300 mb-4 text-sm sm:text-base">
								Start a conversation with Hitesh Chaudhary or Piyush Garg. Each
								persona has their unique expertise and personality!
							</p>
							<p className="text-slate-400 text-xs sm:text-sm mb-6">
								Crafted with ❤️ by{' '}
								<span className="text-blue-400 font-medium">
									Kanishk Chandna
								</span>{' '}
								using Next.js, OpenAI, and Gemini AI.
							</p>
							<div className="bg-blue-900 border border-blue-700 rounded-lg p-4">
								<p className="text-sm text-blue-200">
									💡 <strong>Tip:</strong> Try asking about web development,
									system design, or any technical topic to see how each persona
									responds differently!
								</p>
							</div>
						</div>
					</motion.div>
				)}

				{/* Message list */}
				{messages.map((message, index) => (
					<MessageBubble
						key={message.id}
						message={message}
						isLast={index === messages.length - 1}
					/>
				))}

				{/* Typing indicator */}
				{isLoading && <TypingIndicator persona={currentPersona} />}

				{/* Error message */}
				{error && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
						<div className="flex items-center space-x-2">
							<svg
								className="w-5 h-5 text-red-400"
								fill="currentColor"
								viewBox="0 0 20 20">
								<path
									fillRule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
									clipRule="evenodd"
								/>
							</svg>
							<span className="text-sm text-red-200">{error}</span>
						</div>
						<button
							onClick={retryLastMessage}
							className="text-sm text-red-300 hover:text-red-100 font-medium">
							Retry
						</button>
					</motion.div>
				)}

				{/* Scroll anchor */}
				<div ref={messagesEndRef} />
			</div>

			{/* Message Input */}
			<div className="p-3 sm:p-4 bg-slate-800 border-t border-slate-700">
				<form onSubmit={handleSubmit} className="flex space-x-2 sm:space-x-3">
					<div className="flex-1">
						<textarea
							ref={inputRef}
							value={inputMessage}
							onChange={(e) => setInputMessage(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
							className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-600 bg-slate-700 text-white placeholder-slate-400 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
							rows={1}
							disabled={isLoading}
							style={{ minHeight: '40px', maxHeight: '120px' }}
						/>
					</div>

					<motion.button
						type="submit"
						disabled={!inputMessage.trim() || isLoading}
						className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base ${
							!inputMessage.trim() || isLoading
								? 'bg-slate-600 text-slate-400 cursor-not-allowed'
								: 'bg-blue-600 hover:bg-blue-700 text-white'
						}`}
						whileHover={
							!inputMessage.trim() || isLoading ? {} : { scale: 1.02 }
						}
						whileTap={!inputMessage.trim() || isLoading ? {} : { scale: 0.98 }}>
						{isLoading ? (
							<div className="flex items-center space-x-1 sm:space-x-2">
								<div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
								<span className="hidden sm:inline">Sending...</span>
								<span className="sm:hidden">...</span>
							</div>
						) : (
							<span>Send</span>
						)}
					</motion.button>
				</form>

				{/* Character count and tips */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 space-y-1 sm:space-y-0">
					<p className="text-xs text-slate-400">
						Current persona:{' '}
						<span className="font-medium text-slate-300">{currentPersona}</span>
					</p>
					<p className="text-xs text-slate-500">
						{inputMessage.length}/1000 characters
					</p>
				</div>
			</div>
		</div>
	);
}
