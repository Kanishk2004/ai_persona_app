# 🤖 AI Persona Chat App

An intelligent chat application featuring authentic AI personas of renowned tech educators **Hitesh Chaudhary** and **Piyush Garg**. Built with Next.js 15, this app provides interactive conversations with distinct personality-driven AI responses.

![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=for-the-badge&logo=openai)
![Google](https://img.shields.io/badge/Google-Gemini-4285F4?style=for-the-badge&logo=google)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎭 **Dual AI Personas**
- **Hitesh Chaudhary**: Full-stack developer & educator persona powered by OpenAI GPT-4
- **Piyush Garg**: Backend engineer & system design expert powered by Google Gemini

### 🎨 **Modern UI/UX**
- **Dark Theme**: Elegant slate-based color scheme
- **Responsive Design**: Seamless experience across all devices
- **Smooth Animations**: Framer Motion powered transitions
- **Persona Avatars**: Visual representation of each AI personality

### 💬 **Advanced Chat Features**
- **Real-time Messaging**: Instant AI responses
- **Markdown Support**: Rich text formatting in messages
- **Message History**: Persistent chat sessions with localStorage
- **Typing Indicators**: Visual feedback during AI processing
- **Error Handling**: Graceful error recovery and retry mechanisms

### 🔧 **Technical Highlights**
- **Next.js App Router**: Modern routing and server components
- **API Integration**: OpenAI and Google Gemini APIs
- **TypeScript Support**: Type-safe development with JSDoc
- **Component Architecture**: Modular and reusable React components
- **Performance Optimized**: Image optimization and lazy loading

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn** package manager
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kanishk2004/ai_persona_app.git
   cd ai_persona_chat_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   GOOGLE_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/chat/          # API routes for AI interactions
│   ├── chat/              # Chat page
│   ├── layout.js          # Root layout
│   ├── page.js            # Landing page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ChatWindow.jsx     # Main chat interface
│   ├── MessageBubble.jsx  # Individual message component
│   ├── PersonaSelector.jsx # AI persona switcher
│   ├── TypingIndicator.jsx # Loading animation
│   └── DeveloperContact.jsx # Developer info
├── hooks/                 # Custom React hooks
│   └── useChat.js         # Chat state management
├── lib/                   # Utility libraries
│   ├── personas.js        # AI persona configurations
│   ├── openaiClient.js    # OpenAI API client
│   └── geminiClient.js    # Google Gemini API client
└── types/                 # Type definitions
    └── chat.js            # Chat-related types (JSDoc)
```

## 🎭 AI Personas

### Hitesh Chaudhary
- **Provider**: OpenAI GPT-4
- **Specialty**: Full-stack development, React, Node.js
- **Style**: Hinglish communication, practical teaching approach
- **Personality**: Energetic, motivational, hands-on educator

### Piyush Garg
- **Provider**: Google Gemini
- **Specialty**: Backend engineering, system design, DevOps
- **Style**: Technical depth, clear explanations
- **Personality**: Analytical, detail-oriented, friendly mentor

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15.4.6 with App Router
- **UI Library**: React 19.1.0
- **Styling**: TailwindCSS 4.1.11
- **Animations**: Framer Motion 12.23.12
- **Markdown**: react-markdown for rich text rendering

### Backend & APIs
- **API Routes**: Next.js serverless functions
- **AI Providers**: 
  - OpenAI GPT-4 for Hitesh persona
  - Google Gemini for Piyush persona
- **Data Storage**: Browser localStorage for chat persistence

### Development Tools
- **Linting**: ESLint 9.x
- **Code Quality**: JavaScript ES6+ with JSDoc types
- **Package Manager**: npm

## 🔌 API Reference

### Chat Endpoint
```http
POST /api/chat
```

**Request Body:**
```json
{
  "message": "Your message here",
  "persona": "hitesh" | "piyush",
  "history": [/* previous messages */]
}
```

**Response:**
```json
{
  "response": "AI generated response",
  "persona": "hitesh" | "piyush"
}
```

## 🎨 Customization

### Adding New Personas

1. **Update personas configuration** in `src/lib/personas.js`
2. **Add API client** in `src/lib/` directory
3. **Update API route** in `src/app/api/chat/route.js`
4. **Add persona avatar** to `public/` directory

### Styling Modifications

- **Colors**: Modify TailwindCSS config or update CSS variables
- **Animations**: Customize Framer Motion variants in components
- **Layout**: Adjust responsive breakpoints in component classes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Kanishk Chandna** - Full Stack Developer & AI Enthusiast

- 🌐 **Portfolio**: [kanishk.codes](https://www.kanishk.codes/)
- 💼 **LinkedIn**: [kanishk-chandna](https://www.linkedin.com/in/kanishk-chandna-9553931b0/)
- 🐙 **GitHub**: [Kanishk2004](https://github.com/Kanishk2004)
- 🐦 **Twitter**: [@Kanishk_fr](https://x.com/Kanishk_fr)

## 🙏 Acknowledgments

- **Hitesh Chaudhary** - Inspiration for the educator persona
- **Piyush Garg** - Inspiration for the technical mentor persona
- **OpenAI** - GPT-4 API for natural language processing
- **Google** - Gemini API for advanced AI capabilities
- **Vercel** - Next.js framework and deployment platform

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Kanishk2004/ai_persona_app/issues) page
2. Create a new issue with detailed description
3. Contact the developer through social media links above

---

<div align="center">
  <strong>Built with ❤️ using Next.js and AI</strong>
</div>
