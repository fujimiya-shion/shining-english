'use client'

import { Button } from '@/shared/components/ui/button'
import { AppButton } from '@/shared/components/ui/app-button'
import { Card } from '@/shared/components/ui/card'
import { useState } from 'react'

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizProps {
  title: string
  description?: string
  passingScore?: number
  onComplete?: (score: number, passed: boolean) => void
}

export function QuizSystem({
  title,
  description,
  passingScore = 70,
  onComplete,
}: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([])
  const [showResults, setShowResults] = useState(false)

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: 'Which sentence uses the present perfect tense correctly?',
      options: [
        'I have been to Paris last year',
        'I have been in Paris for two years',
        'I am going to Paris yesterday',
        'I went to Paris every summer',
      ],
      correctAnswer: 1,
      explanation:
        'Option B is correct. The present perfect is used with "for" when expressing duration up to now. Option A is incorrect because "last year" requires simple past.',
    },
    {
      id: 2,
      question: 'What is the correct form of the passive voice for this sentence: "They cancelled the meeting"?',
      options: [
        'The meeting was cancelling by them',
        'The meeting was cancelled by them',
        'The meeting had been cancelled by them',
        'The meeting is being cancelled by them',
      ],
      correctAnswer: 1,
      explanation:
        'Option B is correct. The past simple passive is formed with "was/were + past participle". The verb "cancelled" becomes "was cancelled".',
    },
    {
      id: 3,
      question: 'Which word should you use to complete: "If I _____ you were here, I would have invited you"?',
      options: [
        'knew',
        'have known',
        'had known',
        'would know',
      ],
      correctAnswer: 2,
      explanation:
        'Option C is correct. In third conditional sentences, the if-clause requires past perfect: "had + past participle".',
    },
    {
      id: 4,
      question: 'What is the correct preposition in: "I am interested _____ learning English"?',
      options: [
        'in',
        'on',
        'at',
        'for',
      ],
      correctAnswer: 0,
      explanation:
        'Option A is correct. "Interested in" is the correct collocation in English.',
    },
    {
      id: 5,
      question: 'Which sentence has correct subject-verb agreement?',
      options: [
        'Neither of the students have completed their homework',
        'Neither of the students has completed their homework',
        'Both students has completed their homework',
        'The team are playing their best game',
      ],
      correctAnswer: 1,
      explanation:
        'Option B is correct. "Neither" takes a singular verb "has". In formal English, "team" also takes singular verbs in American English.',
    },
  ]

  const handleSelectAnswer = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = optionIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setShowResults(true)

    const correctCount = selectedAnswers.reduce<number>((count, answer, index) => {
      return answer === questions[index].correctAnswer ? count + 1 : count
    }, 0)

    const score = Math.round((correctCount / questions.length) * 100)
    const passed = score >= passingScore

    if (onComplete) {
      onComplete(score, passed)
    }
  }

  if (showResults) {
    const correctCount = selectedAnswers.reduce<number>((count, answer, index) => {
      return answer === questions[index].correctAnswer ? count + 1 : count
    }, 0)

    const score = Math.round((correctCount / questions.length) * 100)
    const passed = score >= passingScore

    return (
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 text-center">
          <div className="mb-6">
            {passed ? (
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                <svg
                  className="h-8 w-8 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            ) : (
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-destructive/20">
                <svg
                  className="h-8 w-8 text-destructive"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            )}
          </div>

          <h2 className="text-2xl font-bold mb-2">
            {passed ? 'Congratulations!' : 'Not Quite There Yet'}
          </h2>

          <div className="mb-6">
            <p className="text-4xl font-bold text-primary mb-1">{score}%</p>
            <p className="text-muted-foreground">
              You answered {correctCount} out of {questions.length} questions correctly
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Passing score required: {passingScore}%
            </p>
          </div>

          <div className="mb-8 space-y-3">
            {questions.map((q, index) => {
              const isCorrect = selectedAnswers[index] === q.correctAnswer
              return (
                <div
                  key={q.id}
                  className={`text-left p-4 rounded-lg border ${
                    isCorrect
                      ? 'border-accent/30 bg-accent/5'
                      : 'border-destructive/30 bg-destructive/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {isCorrect ? (
                        <svg
                          className="h-5 w-5 text-accent"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5 text-destructive"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{q.question}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        <span className="font-medium">Your answer:</span> {q.options[selectedAnswers[index] ?? -1] ?? 'Not answered'}
                      </p>
                      {!isCorrect && (
                        <p className="text-xs text-accent mt-1">
                          <span className="font-medium">Correct answer:</span> {q.options[q.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => {
                setCurrentQuestion(0)
                setSelectedAnswers([])
                setShowResults(false)
              }}
            >
              Retake Quiz
            </Button>
            <AppButton className="flex-1">Continue to Next Lesson</AppButton>
          </div>
        </Card>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          {description && <p className="text-muted-foreground">{description}</p>}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <div className="w-32 h-2 bg-muted rounded-full">
              <div
                className="h-2 bg-primary rounded-full transition-all"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-6">{question.question}</h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-primary bg-primary'
                        : 'border-border'
                    }`}
                  >
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                    )}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex-1 bg-transparent"
          >
            Previous
          </Button>

          {currentQuestion === questions.length - 1 ? (
            <AppButton
              onClick={handleSubmit}
              disabled={selectedAnswers.some((a, i) => a === null && i <= currentQuestion)}
              className="flex-1"
            >
              Submit Quiz
            </AppButton>
          ) : (
            <AppButton onClick={handleNext} className="flex-1">
              Next
            </AppButton>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 flex gap-1 justify-center">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentQuestion
                  ? 'bg-primary w-6'
                  : selectedAnswers[index] !== null
                    ? 'bg-primary/60'
                    : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </Card>
    </div>
  )
}
