'use client'

import { QuizSystem } from '@/components/quiz-system'

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <QuizSystem
        title="Module Assessment: Core Concepts"
        description="Test your understanding of the concepts covered in this module. You must score at least 70% to unlock the next lesson."
        passingScore={70}
      />
    </main>
  )
}
