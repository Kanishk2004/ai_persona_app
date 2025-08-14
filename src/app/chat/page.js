/**
 * Chat Page Component
 * 
 * Main chat page that renders the ChatWindow component.
 * This is the primary interface for the AI Persona Chat application.
 */

import ChatWindow from '../../components/ChatWindow';

/**
 * Chat page metadata for SEO and browser tab
 */
export const metadata = {
  title: 'AI Persona Chat | Interactive AI Conversations',
  description: 'Chat with different AI personas including Hitesh Chaudhary and Piyush Garg. Each persona has unique expertise and personality.',
  keywords: 'AI chat, persona chat, Hitesh Chaudhary, Piyush Garg, web development, system design',
};

/**
 * Main chat page component
 * @returns {JSX.Element} Chat page
 */
export default function ChatPage() {
  return (
    <main className="h-screen">
      <ChatWindow />
    </main>
  );
}
