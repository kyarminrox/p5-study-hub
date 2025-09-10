"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useAi } from "@/hooks/useAi"
import { GRAMMAR_TIPS } from "@/lib/demoData"

interface GrammarFeedback {
  verdict: string
  tip: string
  improved: string
}

export function GrammarCoach() {
  const [sentence, setSentence] = useState("")
  const [feedback, setFeedback] = useState<GrammarFeedback | null>(null)
  const { chat, loading, error } = useAi()

  const checkGrammar = async () => {
    if (!sentence.trim()) return

    const systemPrompt =
      "Check P5 grammar (must/mustn't; present simple/continuous). Return three labeled lines: Verdict:, Tip:, Improved:"

    try {
      const response = await chat(sentence, systemPrompt)

      // Parse the response into structured feedback
      const lines = response.split("\n").filter((line) => line.trim())
      const parsedFeedback: GrammarFeedback = {
        verdict:
          lines
            .find((line) => line.startsWith("Verdict:"))
            ?.replace("Verdict:", "")
            .trim() || "Good job!",
        tip:
          lines
            .find((line) => line.startsWith("Tip:"))
            ?.replace("Tip:", "")
            .trim() || "Keep practicing!",
        improved:
          lines
            .find((line) => line.startsWith("Improved:"))
            ?.replace("Improved:", "")
            .trim() || sentence,
      }

      setFeedback(parsedFeedback)
    } catch (err) {
      console.error("Grammar check failed:", err)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200 px-4 py-6">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-slate-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-700">Grammar Coach</h1>
            <p className="text-sm text-slate-600">Practice your grammar skills</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Grammar Tips */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Grammar Tips</h2>
          <div className="space-y-4">
            {GRAMMAR_TIPS.map((tip, index) => (
              <Card key={index} className="rounded-2xl border-neutral-200">
                <CardContent className="p-4">
                  <h3 className="font-medium text-slate-700 mb-2">{tip.rule}</h3>
                  <p className="text-sm text-slate-600 mb-3">{tip.explanation}</p>
                  <div className="space-y-1">
                    {tip.examples.map((example, i) => (
                      <p key={i} className="text-sm text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">
                        {example}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Grammar Checker */}
        <Card className="rounded-2xl shadow-lg border-neutral-200">
          <CardHeader>
            <CardTitle className="text-slate-700">Check Your Sentence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Write your sentence here..."
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              className="min-h-24 rounded-xl"
            />

            <Button
              onClick={checkGrammar}
              disabled={loading || !sentence.trim()}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
            >
              {loading ? "Checking..." : "Check my sentence"}
            </Button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-700 text-sm">Error: {error}</p>
              </div>
            )}

            {feedback && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-700">Verdict</span>
                  </div>
                  <p className="text-blue-700">{feedback.verdict}</p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-700">Tip</span>
                  </div>
                  <p className="text-yellow-700">{feedback.tip}</p>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium text-emerald-700">Improved</span>
                  </div>
                  <p className="text-emerald-700">{feedback.improved}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
