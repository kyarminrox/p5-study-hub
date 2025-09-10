"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Globe, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useAi } from "@/hooks/useAi"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface AIResponse {
  answer: string
  suggestions?: string[]
}

export function QATutor() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [language, setLanguage] = useState<"english" | "luganda">("english")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const { chat, loading } = useAi()

  const clearChat = () => {
    setMessages([])
    setSuggestions([])
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    sendMessage(suggestion)
  }

  const sendMessage = async (messageText?: string) => {
    const messageContent = messageText || input
    if (!messageContent.trim()) return

    const userMessage: Message = { role: "user", content: messageContent }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setSuggestions([])

    try {
      const systemPrompt =
        language === "luganda"
          ? 'You are a kind, age-appropriate UNEB P5 tutor for Ugandan primary school students. IMPORTANT: You must ALWAYS respond ONLY in English. Never use Luganda or any other local language in your responses. Keep replies short (2-4 sentences), simple, step-by-step, and positive. Use vocabulary appropriate for 10-11 year old students. After your answer, suggest 2-3 follow-up questions that would help the student understand the topic better. Format your response as JSON: {"answer": "your answer here", "suggestions": ["question 1", "question 2", "question 3"]}'
          : 'You are a kind, age-appropriate UNEB P5 tutor for Ugandan primary school students. IMPORTANT: You must ALWAYS respond ONLY in English. Never use Luganda or any other local language in your responses. Keep replies short (2-4 sentences), simple, step-by-step, and positive. Use vocabulary appropriate for 10-11 year old students. After your answer, suggest 2-3 follow-up questions that would help the student understand the topic better. Format your response as JSON: {"answer": "your answer here", "suggestions": ["question 1", "question 2", "question 3"]}'

      const conversationHistory = messages.map((msg) => `${msg.role}: ${msg.content}`).join("\n")
      const contextualPrompt = conversationHistory
        ? `Previous conversation:\n${conversationHistory}\n\nCurrent question: ${messageContent}`
        : messageContent

      const response = await chat(contextualPrompt, systemPrompt)

      try {
        // First try to parse the entire response as JSON
        const parsedResponse: AIResponse = JSON.parse(response)
        const assistantMessage: Message = { role: "assistant", content: parsedResponse.answer }
        setMessages((prev) => [...prev, assistantMessage])

        if (parsedResponse.suggestions && parsedResponse.suggestions.length > 0) {
          setSuggestions(parsedResponse.suggestions)
        }
      } catch (parseError) {
        // If full JSON parsing fails, try to extract JSON from within the text
        const jsonMatch = response.match(/\{[^}]*"answer"[^}]*\}/s)
        if (jsonMatch) {
          try {
            const extractedJson = jsonMatch[0]
            const parsedResponse: AIResponse = JSON.parse(extractedJson)

            // Remove the JSON part from the original response to get clean text
            const cleanAnswer = response.replace(jsonMatch[0], "").trim()
            const finalAnswer = cleanAnswer || parsedResponse.answer

            const assistantMessage: Message = { role: "assistant", content: finalAnswer }
            setMessages((prev) => [...prev, assistantMessage])

            if (parsedResponse.suggestions && parsedResponse.suggestions.length > 0) {
              setSuggestions(parsedResponse.suggestions)
            }
          } catch (extractError) {
            // If extraction also fails, use the raw response but clean it up
            const cleanedResponse = response.replace(/\{[^}]*"answer"[^}]*\}/s, "").trim()
            const assistantMessage: Message = { role: "assistant", content: cleanedResponse || response }
            setMessages((prev) => [...prev, assistantMessage])
          }
        } else {
          // No JSON found, use the raw response
          const assistantMessage: Message = { role: "assistant", content: response }
          setMessages((prev) => [...prev, assistantMessage])
        }
      }
    } catch (error) {
      console.error("Failed to send message:", error)
      if (error instanceof Error && error.message.includes("limit")) {
        const errorMessage: Message = {
          role: "assistant",
          content: "I've reached my response limit. Please click the refresh button to start a new conversation!",
        }
        setMessages((prev) => [...prev, errorMessage])
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <header className="bg-white border-b border-neutral-200 px-4 py-6">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-slate-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-700">Q&A Tutor</h1>
            <p className="text-sm text-slate-600">Ask questions and get help</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={clearChat}
            className="rounded-xl mr-2 bg-transparent"
            title="Start new conversation"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === "english" ? "luganda" : "english")}
            className="rounded-xl"
          >
            <Globe className="h-4 w-4 mr-2" />
            {language === "english" ? "English" : "Luganda"}
          </Button>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 flex flex-col">
        {/* Chat Messages */}
        <Card className="flex-1 rounded-2xl border-neutral-200 mb-4">
          <CardContent className="p-4 h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center">
                <div>
                  <p className="text-slate-500 mb-2">Welcome to your AI tutor!</p>
                  <p className="text-sm text-slate-400">Ask any question about your P5 studies</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === "user" ? "bg-emerald-600 text-white" : "bg-neutral-100 text-slate-700"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-neutral-100 rounded-2xl px-4 py-3">
                      <p className="text-sm text-slate-500">Thinking...</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {suggestions.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-slate-500 mb-2">You might also want to ask:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs rounded-full bg-white hover:bg-emerald-50 hover:border-emerald-300 text-slate-600"
                  disabled={loading}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            placeholder={language === "english" ? "Ask a question..." : "Buuza ekibuuzo..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="rounded-xl"
            disabled={loading}
          />
          <Button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Footer */}
        <p className="text-xs text-slate-400 text-center mt-4">Powered by AI (Demo)</p>
      </main>
    </div>
  )
}
