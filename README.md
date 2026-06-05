# P5 AI Study Hub

An **open-source AI-powered learning platform** designed specifically for Primary 5 (P5) students in Uganda, aligned with UNEB (Uganda National Examinations Board) curriculum standards. This hub leverages cutting-edge AI technology to provide personalized, age-appropriate tutoring and learning support.

## 🎯 About

P5 AI Study Hub is a community-driven educational platform that combines the power of AI with proven teaching methodologies. Whether you're a student seeking extra support, an educator looking for supplementary tools, or a developer interested in EdTech, this project welcomes your contributions.

**Key Features:**
- 🤖 AI-powered Q&A tutoring with context-aware responses
- 📝 Grammar coaching and writing feedback
- 🗣️ Bilingual support (English & Luganda)
- 👨‍🎓 UNEB P5 curriculum-aligned content
- 🎨 Child-friendly, intuitive interface
- ⚡ Fast, responsive design built with Next.js

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18 or higher
- **Package Manager**: pnpm (or npm/yarn)
- **API Key**: Either Groq or OpenAI (see [API Setup](#api-setup) below)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kyarminrox/p5-study-hub.git
   cd p5-study-hub
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Run the development server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🔑 API Setup

This project supports multiple AI providers. Choose one and configure it below.

### Option 1: Groq API (Recommended - Free & Fast)

Groq provides free, high-speed inference for open-source models like Llama.

1. **Get your Groq API Key:**
   - Visit [console.groq.com](https://console.groq.com)
   - Sign up for a free account
   - Navigate to API keys and create a new key

2. **Configure your `.env.local` file:**
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   GROQ_MODEL=llama-3.3-70b-versatile
   ```

3. **Supported Models:**
   - `llama-3.3-70b-versatile` (default) - Excellent for multi-task tutoring
   - `mixtral-8x7b-32768` - Good alternative
   - `gemma-7b-it` - Lightweight option

### Option 2: OpenAI API

For production deployments or if you prefer OpenAI's models.

1. **Get your OpenAI API Key:**
   - Visit [platform.openai.com](https://platform.openai.com)
   - Create an account and navigate to API keys
   - Create a new API key

2. **Configure your `.env.local` file:**
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Note:** OpenAI integration is currently placeholder. See `app/api/chat-tools/route.ts` for implementation details.

## 📁 Project Structure

```
p5-study-hub/
├── app/
│   ├── api/
│   │   ├── chat/              # Main chat API endpoint (Groq)
│   │   └── chat-tools/        # Advanced tool-calling endpoint (WIP)
│   ├── layout.tsx             # Root layout component
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/
│   ├── QATutor.tsx            # Q&A tutoring interface
│   ├── GrammarCoach.tsx       # Grammar feedback component
│   └── ui/                    # Reusable UI components (Radix UI)
├── hooks/
│   └── useAi.ts               # Custom hook for AI chat functionality
├── lib/
│   └── demoData.ts            # Sample data and constants
├── styles/
│   └── globals.css            # Tailwind CSS configuration
├── public/                    # Static assets
├── .env.example               # Environment variables template
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

## 🛠️ Technology Stack

- **Frontend Framework**: [Next.js 14](https://nextjs.org/) - React-based framework with API routes
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/) - Accessible component library
- **AI APIs**: [Groq](https://groq.com/) or [OpenAI](https://openai.com/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics) (optional)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 💡 How It Works

### Core Architecture

```
User Interface (React Components)
         ↓
Custom Hook (useAi)
         ↓
API Route (/api/chat)
         ↓
Groq/OpenAI API
         ↓
AI Response
         ↓
Parse & Format Response
         ↓
Update UI with Answer
```

### Key Components

**QATutor Component** (`components/QATutor.tsx`)
- Provides conversational Q&A interface
- Supports bilingual responses (English & Luganda)
- Generates follow-up suggestions for deeper learning
- Context-aware responses based on conversation history

**GrammarCoach Component** (`components/GrammarCoach.tsx`)
- Evaluates student writing
- Provides constructive feedback
- Suggests improvements aligned with P5 curriculum

**useAi Hook** (`hooks/useAi.ts`)
- Manages chat state and API communication
- Handles errors gracefully
- Loading states for better UX

## 🔄 API Endpoints

### POST `/api/chat`

Send a message to the AI tutor and get a response.

**Request:**
```json
{
  "messages": [
    {"role": "user", "content": "What is photosynthesis?"},
    {"role": "assistant", "content": "Photosynthesis is..."}
  ],
  "system": "You are a P5 tutor..."
}
```

**Response:**
```json
{
  "content": "Photosynthesis is the process where plants make food using sunlight..."
}
```

**Error Response:**
```json
{
  "error": "GROQ_API_KEY not configured"
}
```

## 📝 System Prompt

By default, the AI is configured with this system prompt:

> "You are a kind, age-appropriate UNEB P5 tutor. Keep replies short (3–6 lines), step-by-step, positive. If a local language is used, reply in that language then re-explain in simple English."

Custom prompts can be passed per-request for specialized responses (grammar coaching, etc.).

## 🌍 Bilingual Support

The application supports two languages:

- **English** - Default and primary language
- **Luganda** - Local language for students and parents in Uganda

The AI intelligently switches between languages based on user selection and automatically re-explains responses in simple English when needed.

## 🧪 Development

### Build

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

### Linting

```bash
pnpm lint
```

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server (http://localhost:3000) |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## 🤝 Contributing

We welcome contributions from educators, developers, designers, and anyone passionate about accessible education!

### Ways to Contribute

- **Report bugs** or suggest features via [Issues](https://github.com/kyarminrox/p5-study-hub/issues)
- **Submit pull requests** for bug fixes or new features
- **Improve documentation** and translate to other languages
- **Add educational content** aligned with P5 curriculum
- **Optimize performance** or improve UI/UX

### Development Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request with a clear description

## 📋 Roadmap

- [x] Basic Q&A tutoring with Groq
- [x] Grammar coaching
- [x] Bilingual support
- [ ] OpenAI integration (complete)
- [ ] Quiz generation and tracking
- [ ] Progress analytics dashboard
- [ ] Mobile app version
- [ ] Multi-subject curriculum expansion
- [ ] Offline mode support
- [ ] Teacher dashboard for monitoring student progress

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Groq](https://groq.com/) - Fast AI inference
- [Vercel](https://vercel.com/) - Hosting and deployment
- [Radix UI](https://www.radix-ui.com/) - Accessible component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Next.js](https://nextjs.org/) - React framework

## 📞 Support

- **Issues & Bug Reports**: [GitHub Issues](https://github.com/kyarminrox/p5-study-hub/issues)
- **Discussions**: [GitHub Discussions](https://github.com/kyarminrox/p5-study-hub/discussions)
- **Email**: kyarminrox@example.com (if applicable)

## 🎓 Educational Context

This platform is specifically designed for:
- **Primary 5 (P5)** students in Uganda
- **UNEB Curriculum** alignment
- **Age-appropriate** content (10-11 year-olds)
- **Inclusive learning** through bilingual support

---

**Made with ❤️ for students, educators, and lifelong learners.**

Happy learning! 🚀
