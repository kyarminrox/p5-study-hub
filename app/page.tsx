import { Badge } from "@/components/ui/badge"
import { BookOpen, MessageSquare, Map, Zap } from "lucide-react"
import { ActivityCard } from "@/components/ActivityCard"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 px-4 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-700">P5 AI Study Hub</h1>
            <p className="text-sm text-slate-600 mt-1">UNEB-aligned learning activities. Pilot designed for Riverside Academy</p>
          </div>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
            Version 1
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActivityCard
            icon={<BookOpen className="h-8 w-8 text-emerald-600" />}
            title="Vocabulary Flashcards"
            description="Learn P5 Term 1 vocabulary about Vehicle Repair & Maintenance"
            href="/flashcards"
          />

          <ActivityCard
            icon={<Zap className="h-8 w-8 text-emerald-600" />}
            title="Grammar Coach"
            description="Practice must/mustn't and present simple/continuous tenses"
            href="/grammar"
          />

          <ActivityCard
            icon={<MessageSquare className="h-8 w-8 text-emerald-600" />}
            title="Q&A Tutor"
            description="Ask questions in English or local language"
            href="/tutor"
          />

          <ActivityCard
            icon={<Map className="h-8 w-8 text-emerald-600" />}
            title="Map Quiz"
            description="Test your knowledge about Uganda's geography"
            href="/map"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-neutral-200 bg-white px-4 py-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-slate-600">UNEB-aligned pilot • P5 Term 1</p>
        </div>
      </footer>
    </div>
  )
}
