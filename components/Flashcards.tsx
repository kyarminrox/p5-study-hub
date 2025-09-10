"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { FLASHCARDS } from "@/lib/demoData"

export function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMeaning, setShowMeaning] = useState(false)

  const currentCard = FLASHCARDS[currentIndex]
  const progress = ((currentIndex + 1) / FLASHCARDS.length) * 100

  const handleNext = () => {
    if (currentIndex < FLASHCARDS.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowMeaning(false)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowMeaning(false)
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
            <h1 className="text-xl font-bold text-slate-700">Vocabulary Flashcards</h1>
            <p className="text-sm text-slate-600">Vehicle Repair & Maintenance</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-600">Progress</span>
            <span className="text-sm text-slate-600">
              {currentIndex + 1} / {FLASHCARDS.length}
            </span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <Card className="rounded-2xl shadow-lg border-neutral-200 mb-6">
          <CardHeader className="text-center pb-4">
            <Badge variant="secondary" className="w-fit mx-auto mb-4">
              Term {currentIndex + 1}
            </Badge>
            <CardTitle className="text-3xl font-bold text-slate-700 mb-4">{currentCard.term}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {showMeaning ? (
              <div className="bg-emerald-50 rounded-xl p-6 mb-6">
                <p className="text-slate-700 leading-relaxed text-lg">{currentCard.meaning}</p>
              </div>
            ) : (
              <div className="h-24 flex items-center justify-center mb-6">
                <p className="text-slate-500">Click "Show meaning" to reveal the definition</p>
              </div>
            )}

            <Button onClick={() => setShowMeaning(!showMeaning)} variant="outline" className="mb-6 rounded-xl">
              {showMeaning ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Hide meaning
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Show meaning
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            variant="outline"
            className="rounded-xl bg-transparent"
          >
            Previous
          </Button>

          {currentIndex === FLASHCARDS.length - 1 ? (
            <Link href="/">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">Complete</Button>
            </Link>
          ) : (
            <Button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
              Next
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}
