/**
 * Home Page Component
 *
 * Landing page for the AI Persona Chat application.
 * Provides navigation to the main chat interface and app overview.
 */

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<div className="min-h-screen bg-slate-900">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
				{/* Header */}
				<div className="text-center mb-12 sm:mb-16">
					<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
						AI Persona Chat
					</h1>
					<p className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
						Experience conversations with different AI personalities. Chat with
						industry experts like{' '}
						<span className="font-semibold text-blue-400">
							Hitesh Chaudhary
						</span>{' '}
						and{' '}
						<span className="font-semibold text-green-400">Piyush Garg</span>,
						each with their unique expertise and personality.
					</p>

					{/* CTA Button */}
					<Link
						href="/chat"
						className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white text-base sm:text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
						Start Chatting
						<Image
							src="/chat_icon.svg"
							alt="Chat Icon"
							className="ml-2 sm:ml-4"
							height={24}
							width={24}
						/>
					</Link>
				</div>

				{/* Features Grid */}
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
					<div className="bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg border border-slate-700">
						<div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
							<svg
								className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
						</div>
						<h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
							Multiple Personas
						</h3>
						<p className="text-sm sm:text-base text-slate-300">
							Switch between different AI personalities, each with unique
							expertise and communication styles.
						</p>
					</div>

					<div className="bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg border border-slate-700">
						<div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-900 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
							<svg
								className="w-5 h-5 sm:w-6 sm:h-6 text-green-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
								/>
							</svg>
						</div>
						<h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
							Expert Knowledge
						</h3>
						<p className="text-sm sm:text-base text-slate-300">
							Get insights on web development, system design, and modern
							programming practices.
						</p>
					</div>

					<div className="bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg border border-slate-700">
						<div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-900 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
							<svg
								className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-7-4L3 20l4-9c2.79-2.79 6.29-3.52 9.5-3.5a8 8 0 015.5 13.5z"
								/>
							</svg>
						</div>
						<h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
							Natural Conversations
						</h3>
						<p className="text-sm sm:text-base text-slate-300">
							Enjoy fluid, context-aware conversations with persistent chat
							history and smooth UX.
						</p>
					</div>
				</div>

				{/* Personas Preview */}
				<div className="bg-slate-800 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-slate-700">
					<h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6 sm:mb-8">
						Meet Your AI Mentors
					</h2>

					<div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
						{/* Hitesh Persona */}
						<div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 p-4 sm:p-6 bg-slate-700 rounded-xl border border-slate-600">
							<div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
								<Image
									src={'/hiteshSirAvatar.jpg'}
									alt="Hitesh Chaudhary"
									className="rounded-full"
									height={56}
									width={56}
								/>
							</div>
							<div className="text-center sm:text-left">
								<h3 className="text-lg sm:text-xl font-semibold text-white">
									Hitesh Chaudhary
								</h3>
								<p className="text-blue-400 font-medium text-sm sm:text-base">
									Full Stack Developer & Educator
								</p>
								<p className="text-slate-300 text-sm mt-1">
									Passionate about teaching web development with practical,
									hands-on approach.
								</p>
							</div>
						</div>

						{/* Piyush Persona */}
						<div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 p-4 sm:p-6 bg-slate-700 rounded-xl border border-slate-600">
							<div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
								<Image
									src={'/piyushSirAvatar.webp'}
									alt="Piyush Garg"
									className="rounded-full"
									height={56}
									width={56}
								/>
							</div>
							<div className="text-center sm:text-left">
								<h3 className="text-lg sm:text-xl font-semibold text-white">
									Piyush Garg
								</h3>
								<p className="text-green-400 font-medium text-sm sm:text-base">
									Backend Engineer & System Design Expert
								</p>
								<p className="text-slate-300 text-sm mt-1">
									Expert in scalable architecture, system design, and backend
									technologies.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="text-center mt-12 sm:mt-16 space-y-4">
					<div className="text-slate-400 text-sm sm:text-base">
						<p>Built with Next.js, OpenAI, Google Gemini, and TailwindCSS</p>
					</div>

					{/* Developer Info */}
					<div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700 max-w-md mx-auto">
						<div className="flex items-center justify-center mb-3 sm:mb-4">
							<div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
								<Image
									src={'/picofme.png'}
									alt="Kanishk Chandna"
									className="rounded-full"
									height={48}
									width={48}
								/>
							</div>
						</div>
						<h3 className="text-base sm:text-lg font-semibold text-white mb-2">
							Developed by Kanishk Chandna
						</h3>
						<p className="text-slate-300 text-xs sm:text-sm mb-3 sm:mb-4">
							Full Stack Developer passionate about AI and modern web
							technologies
						</p>

						{/* Social Links */}
						<div className="flex justify-center flex-wrap gap-2 sm:gap-3">
							<a
								href="https://www.kanishk.codes/"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white transition-colors text-sm">
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
								className="flex items-center px-2 sm:px-3 py-1.5 sm:py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 hover:text-white transition-colors text-sm">
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
								className="flex items-center px-2 sm:px-3 py-1.5 sm:py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 hover:text-white transition-colors text-sm">
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
								className="flex items-center px-2 sm:px-3 py-1.5 sm:py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 hover:text-white transition-colors text-sm">
								<svg
									className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
									fill="currentColor"
									viewBox="0 0 24 24">
									<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
								</svg>
								<span className="hidden sm:inline">LinkedIn</span>
								<span className="sm:hidden">In</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
