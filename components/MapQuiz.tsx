"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { MAP_QUESTIONS } from "@/lib/demoData"

type QuizState = "playing" | "completed"

export function MapQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [state, setState] = useState<QuizState>("playing")

  const question = MAP_QUESTIONS[currentQuestion]
  const isLastQuestion = currentQuestion === MAP_QUESTIONS.length - 1

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    setShowFeedback(true)
    if (selectedAnswer === question.answerIndex) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (isLastQuestion) {
      setState("completed")
    } else {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setScore(0)
    setState("playing")
  }

  if (state === "completed") {
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
              <h1 className="text-xl font-bold text-slate-700">Map Quiz</h1>
              <p className="text-sm text-slate-600">Quiz Complete!</p>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8">
          <Card className="rounded-2xl shadow-lg border-neutral-200 text-center">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-700">Well Done!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-emerald-50 rounded-xl p-6">
                <p className="text-3xl font-bold text-emerald-600 mb-2">
                  {score} / {MAP_QUESTIONS.length}
                </p>
                <p className="text-slate-600">Questions Correct</p>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleRestart}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
                >
                  Try Again
                </Button>
                <Link href="/">
                  <Button variant="outline" className="w-full rounded-xl bg-transparent">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
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
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-700">Map Quiz</h1>
            <p className="text-sm text-slate-600">Test your Uganda geography knowledge</p>
          </div>
          <Badge variant="secondary">
            {currentQuestion + 1} / {MAP_QUESTIONS.length}
          </Badge>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Simple Uganda Map SVG */}
        <Card className="rounded-2xl border-neutral-200 mb-6">
          <CardContent className="p-6 text-center">
            <svg
              viewBox="0 0 200 150"
              className="w-48 h-36 mx-auto mb-4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Simple Uganda outline */}
              <path
                d="M50 40 L150 35 L155 45 L160 60 L155 80 L150 100 L140 110 L120 115 L100 120 L80 115 L60 110 L45 100 L40 80 L45 60 Z"
                fill="#10b981"
                stroke="#065f46"
                strokeWidth="2"
              />
              <text x="100" y="80" textAnchor="middle" className="fill-white text-sm font-semibold">
                UGANDA
              </text>
            </svg>
            <p className="text-sm text-slate-600">Simplified map of Uganda</p>
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="rounded-2xl shadow-lg border-neutral-200">
          <CardHeader>
            <CardTitle className="text-lg text-slate-700">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedAnswer === index
                      ? showFeedback
                        ? index === question.answerIndex
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-red-500 bg-red-50 text-red-700"
                        : "border-emerald-500 bg-emerald-50"
                      : showFeedback && index === question.answerIndex
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showFeedback && index === question.answerIndex && (
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                    )}
                    {showFeedback && selectedAnswer === index && index !== question.answerIndex && (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showFeedback && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-blue-700 text-sm">{question.explanation}</p>
              </div>
            )}

            <div className="flex justify-between">
              {!showFeedback ? (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="ml-auto bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="ml-auto bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
                >
                  {isLastQuestion ? "Finish Quiz" : "Next Question"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
