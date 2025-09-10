import { type NextRequest, NextResponse } from "next/server"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

interface ChatRequest {
  messages: Message[]
  system?: string
}

const DEFAULT_SYSTEM_PROMPT =
  "You are a kind, age-appropriate UNEB P5 tutor. Keep replies short (3–6 lines), step-by-step, positive. If a local language is used, reply in that language then re-explain in simple English."

export async function POST(request: NextRequest) {
  try {
    const { messages, system }: ChatRequest = await request.json()

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "GROQ_API_KEY not configured" }, { status: 500 })
    }

    // Prepare messages array with system prompt
    const systemPrompt = system || DEFAULT_SYSTEM_PROMPT
    const chatMessages = [{ role: "system", content: systemPrompt }, ...messages]

    console.log("[v0] Making Groq API call with messages:", chatMessages.length)

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        messages: chatMessages,
        temperature: 0.3,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Groq API error:", response.status, errorText)
      throw new Error(`Groq API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || "No response generated"

    console.log("[v0] Groq API response received successfully")

    return NextResponse.json({ content })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to process chat request"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
