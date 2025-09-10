// TODO: Uncomment and use this route when enabling Vercel AI SDK tool calling
// This demonstrates how to integrate tools with the Vercel AI SDK

/*
import { NextRequest } from 'next/server'
import { streamText, tool } from 'ai'
import { groq } from '@ai-sdk/groq'
import { z } from 'zod'

const generateQuizTool = tool({
  description: 'Create 5 UNEB-style P5 questions for a given topic',
  parameters: z.object({
    topic: z.string().describe('The topic to create quiz questions about'),
  }),
  execute: async ({ topic }) => {
    // Mock quiz generation - replace with actual logic
    const questions = [
      {
        q: `What is the main purpose of ${topic}?`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        answerIndex: 0
      },
      // ... generate 4 more questions
    ]
    return { questions }
  },
})

export async function POST(request: NextRequest) {
  const { messages } = await request.json()

  const result = await streamText({
    model: groq('llama-3.1-70b-versatile'),
    messages,
    tools: {
      generate_quiz: generateQuizTool,
    },
  })

  return result.toDataStreamResponse()
}
*/

// Placeholder export to prevent build errors
export async function POST() {
  return new Response("Tool calling not enabled", { status: 501 })
}
