/**
 * PersonaSelector Component
 *
 * UI component for switching between different AI personas.
 * Provides smooth animations and visual feedback for persona changes.
 */

'use client';

import { motion } from 'framer-motion';
import { personas } from '../lib/personas';
import Image from 'next/image';

/**
 * Persona selection component
 * @param {Object} props - Component props
 * @param {string} props.currentPersona - ID of currently selected persona
 * @param {function} props.onPersonaChange - Callback when persona is changed
 * @param {boolean} [props.disabled] - Whether the selector is disabled
 * @returns {JSX.Element} Persona selector component
 */
export default function PersonaSelector({
	currentPersona,
	onPersonaChange,
	disabled = false,
}) {
	return (
		<div className="flex flex-col space-y-3 p-3 sm:p-4 bg-slate-800 rounded-lg shadow-sm border border-slate-700">
			<h3 className="text-xs sm:text-sm font-semibold text-slate-200 mb-2">
				Choose AI Persona
			</h3>

			<div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
				{personas.map((persona) => {
					const isSelected = persona.id === currentPersona;

					return (
						<motion.button
							key={persona.id}
							onClick={() => !disabled && onPersonaChange(persona.id)}
							disabled={disabled}
							className={`relative flex flex-row sm:flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 ${
								isSelected
									? 'border-current shadow-md'
									: 'border-slate-600 hover:border-slate-500'
							} ${
								disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
							}`}
							style={{
								borderColor: isSelected ? persona.color : undefined,
								backgroundColor: isSelected ? `${persona.color}08` : undefined,
							}}
							whileHover={!disabled ? { scale: 1.02 } : {}}
							whileTap={!disabled ? { scale: 0.98 } : {}}>
							{/* Avatar */}
							<div
								className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mb-0 sm:mb-2 mr-3 sm:mr-0 flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
								style={{ backgroundColor: persona.color }}>
								<Image
									src={persona.avatar}
									alt={persona.name}
									className="rounded-full"
									height={48}
									width={48}
								/>
							</div>

							{/* Persona Info */}
							<div className="text-left sm:text-center flex-1">
								<h4 className="text-sm font-medium text-white">
									{persona.name}
								</h4>
								<p className="text-xs text-slate-400 mt-1 line-clamp-2 sm:line-clamp-none">
									{persona.description}
								</p>
							</div>

							{/* Selection indicator */}
							{isSelected && (
								<motion.div
									className="w-4 h-4 rounded-full flex items-center justify-center ml-2 sm:ml-0 sm:absolute sm:-top-1 sm:-right-1"
									style={{ backgroundColor: persona.color }}
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
									<svg
										className="w-2.5 h-2.5 text-white"
										fill="currentColor"
										viewBox="0 0 20 20">
										<path
											fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd"
										/>
									</svg>
								</motion.div>
							)}
						</motion.button>
					);
				})}
			</div>

			{/* Current persona info */}
			{currentPersona && (
				<motion.div
					className="mt-3 p-3 bg-slate-700 rounded-lg"
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: 'auto' }}
					transition={{ duration: 0.2 }}>
					<div className="flex items-center space-x-2">
						<div
							className="w-2 h-2 rounded-full flex-shrink-0"
							style={{
								backgroundColor: personas.find((p) => p.id === currentPersona)
									?.color,
							}}
						/>
						<span className="text-xs sm:text-sm text-slate-300">
							Currently chatting with{' '}
							<span className="font-medium text-white">
								{personas.find((p) => p.id === currentPersona)?.name}
							</span>
						</span>
					</div>
				</motion.div>
			)}
		</div>
	);
}
