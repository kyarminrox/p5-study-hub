import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { ReactNode } from "react"

interface ActivityCardProps {
  icon: ReactNode
  title: string
  description: string
  href: string
}

export function ActivityCard({ icon, title, description, href }: ActivityCardProps) {
  return (
    <Card className="rounded-2xl shadow-sm border-neutral-200 hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          {icon}
          <CardTitle className="text-lg text-slate-700">{title}</CardTitle>
        </div>
        <CardDescription className="text-slate-600 leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={href}>
          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
            aria-label={`Start ${title} activity`}
          >
            Start
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
