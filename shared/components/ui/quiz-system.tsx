'use client'

import { Button } from '@/shared/components/ui/button'
import { AppButton } from '@/shared/components/ui/app-button'
import { Card } from '@/shared/components/ui/card'
import { AppStatus } from '@/shared/enums/app-status'
import { useEffect, useMemo, useState } from 'react'

interface QuizQuestion {
  id: number | string
  content: string
  options: {
    id: number | string
    content: string
    isCorrect?: boolean
  }[]
}

interface QuizProps {
  title: string
  description?: string
  passingScore?: number
  questions: QuizQuestion[]
  submitStatus?: AppStatus
  allowRetake?: boolean
  onComplete?: (score: number, passed: boolean) => Promise<void> | void
  onContinue?: () => void
}

export function QuizSystem({
  title,
  description,
  passingScore = 70,
  questions,
  submitStatus = AppStatus.initial,
  allowRetake = true,
  onComplete,
  onContinue,
}: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    setCurrentQuestion(0)
    setShowResults(false)
    setSelectedAnswers(Array.from({ length: questions.length }, () => null))
  }, [questions])

  const result = useMemo(() => {
    const correctCount = selectedAnswers.reduce<number>((count, answer, index) => {
      const selectedOption = typeof answer === 'number' ? questions[index]?.options?.[answer] : undefined
      return selectedOption?.isCorrect ? count + 1 : count
    }, 0)

    const score = questions.length > 0
      ? Math.round((correctCount / questions.length) * 100)
      : 0
    const passed = score >= passingScore

    return {
      correctCount,
      score,
      passed,
    }
  }, [passingScore, questions, selectedAnswers])

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

  const handleSubmit = async () => {
    setShowResults(true)

    if (onComplete) {
      await onComplete(result.score, result.passed)
    }
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 text-center text-muted-foreground">
          Quiz hiện chưa có câu hỏi.
        </Card>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 text-center">
          <div className="mb-6">
            {result.passed ? (
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
            {result.passed ? 'Bạn đã đạt yêu cầu' : 'Bạn chưa đạt yêu cầu'}
          </h2>

          <div className="mb-6 rounded-xl border border-border/60 bg-muted/30 p-4">
            <p className="text-4xl font-bold text-primary mb-1">{result.score}%</p>
            <p className="text-muted-foreground">
              Đúng {result.correctCount}/{questions.length} câu
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Mức đạt yêu cầu: <span className="font-semibold text-foreground">{passingScore}%</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Trạng thái: {' '}
              <span className={result.passed ? 'font-semibold text-accent' : 'font-semibold text-destructive'}>
                {result.passed ? 'Đạt' : 'Chưa đạt'}
              </span>
            </p>
          </div>

          <div className="mb-4 text-left">
            <h3 className="text-base font-semibold">Kết quả chi tiết</h3>
          </div>

          <div className="mb-8 space-y-3">
            {questions.map((q, index) => {
              const selectedIndex = selectedAnswers[index]
              const selectedOption = typeof selectedIndex === 'number' ? q.options[selectedIndex] : undefined
              const correctOption = q.options.find((option) => option.isCorrect)
              const isCorrect = Boolean(selectedOption?.isCorrect)
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
                      <p className="font-medium text-sm">Câu {index + 1}: {q.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        <span className="font-medium">Bạn chọn:</span> {selectedOption?.content ?? 'Chưa trả lời'}
                      </p>
                      {!isCorrect && (
                        <p className="text-xs text-accent mt-1">
                          <span className="font-medium">Đáp án đúng:</span> {correctOption?.content ?? 'N/A'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex gap-3">
            {allowRetake ? (
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => {
                  setCurrentQuestion(0)
                  setSelectedAnswers(Array.from({ length: questions.length }, () => null))
                  setShowResults(false)
                }}
              >
                Làm lại
              </Button>
            ) : null}
            <AppButton type="button" className="flex-1" onClick={onContinue}>
              Tiếp tục học
            </AppButton>
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
          <h2 className="text-lg font-semibold mb-6">{question.content}</h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                type="button"
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
                  <span className="flex-1">{option.content}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex-1 bg-transparent"
          >
            Previous
          </Button>

          {currentQuestion === questions.length - 1 ? (
            <AppButton
              type="button"
              onClick={() => {
                void handleSubmit()
              }}
              disabled={
                submitStatus === AppStatus.loading
                || selectedAnswers.some((answer) => answer === null || answer === undefined)
              }
              className="flex-1"
            >
              {submitStatus === AppStatus.loading ? 'Submitting...' : 'Submit Quiz'}
            </AppButton>
          ) : (
            <AppButton
              type="button"
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === null}
              className="flex-1"
            >
              Next
            </AppButton>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 flex gap-1 justify-center">
          {questions.map((_, index) => (
            <button
              type="button"
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
