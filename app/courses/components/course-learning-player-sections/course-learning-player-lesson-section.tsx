'use client'

import {
  CourseLearningPlayerComment,
  CourseLearningPlayerLessonDetail,
  CourseLearningPlayerNote,
  CourseLearningPlayerLessonSummary,
} from '@/app/courses/components/course-learning-player-sections/course-learning-player-types'
import { AppButton } from '@/shared/components/ui/app-button'
import { Button } from '@/shared/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { AppStatus } from '@/shared/enums/app-status'
import { BarChart3, CircleCheckBig, CircleDashed, RotateCcw, XCircle } from 'lucide-react'

export function CourseLearningPlayerLessonSection({
  comments,
  currentLesson,
  currentLessonData,
  currentLessonDetail,
  currentLessonIndex,
  currentLessonVideoUrl,
  lessonIds,
  lessonNotes,
  lessonNotesStatus,
  notes,
  noteActionStatus,
  onChangeNotes,
  onDeleteNote,
  onSaveNote,
  onCompleteLesson,
  onOpenQuiz,
  onViewQuizResult,
  onSelectLesson,
  onVideoEnded,
  onVideoError,
  showQuizAction = false,
  quizStatus = AppStatus.initial,
  quizSummary,
  shouldShowVideo,
  showLessonOnlyContent = false,
}: {
  comments: CourseLearningPlayerComment[]
  currentLesson: number
  currentLessonData?: CourseLearningPlayerLessonSummary
  currentLessonDetail?: CourseLearningPlayerLessonDetail
  currentLessonIndex: number
  currentLessonVideoUrl: string
  lessonIds: number[]
  lessonNotes: CourseLearningPlayerNote[]
  lessonNotesStatus: AppStatus
  notes: string
  noteActionStatus: AppStatus
  onChangeNotes: (value: string) => void
  onDeleteNote: (noteId: number) => void
  onSaveNote: () => void
  onCompleteLesson: () => void
  onOpenQuiz: () => void
  onViewQuizResult: () => void
  onSelectLesson: (lessonId: number) => void
  onVideoEnded: () => void
  onVideoError: () => void
  showQuizAction?: boolean
  quizStatus?: AppStatus
  quizSummary?: {
    passPercent: number
    hasAttempt: boolean
    scorePercent?: number
    passed?: boolean
  }
  shouldShowVideo: boolean
  showLessonOnlyContent?: boolean
}) {
  if (!showLessonOnlyContent) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted/40">
        <div className="relative flex aspect-video items-center justify-center bg-primary/10">
          {shouldShowVideo ? (
            <video
              key={currentLesson}
              className="h-full w-full"
              controls
              controlsList="nodownload"
              preload="metadata"
              src={currentLessonVideoUrl}
              onEnded={onVideoEnded}
              onError={onVideoError}
            >
              Trình duyệt của bạn không hỗ trợ phát video.
            </video>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-tr from-black/35 via-black/10 to-transparent" />
              <div className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="mt-4 text-white/90">
                  {currentLessonVideoUrl
                    ? `Không tải được video: ${currentLessonData?.title ?? 'Đang cập nhật'}`
                    : `Video bài học: ${currentLessonData?.title ?? 'Đang cập nhật'}`}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">{currentLessonData?.title ?? 'Bài học đang cập nhật'}</h2>
        {typeof currentLessonData?.duration === 'number' && currentLessonData.duration > 0 ? (
          <p className="mt-1 text-muted-foreground">Thời lượng: {currentLessonData.duration} phút</p>
        ) : null}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="notes">Ghi chú</TabsTrigger>
          <TabsTrigger value="resources">Tài liệu</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4 space-y-4">
          <div className="whitespace-pre-line text-sm text-muted-foreground">
            {currentLessonDetail?.description || 'Nội dung tổng quan của bài học đang được cập nhật.'}
          </div>
        </TabsContent>
        <TabsContent value="notes" className="mt-4 space-y-4">
          <div className="space-y-3">
            <textarea
              value={notes}
              onChange={(event) => onChangeNotes(event.target.value)}
              placeholder="Ghi chú nhanh trong lúc học..."
              className="h-32 w-full resize-none rounded-lg border border-border bg-background p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <AppButton
              disabled={noteActionStatus === AppStatus.loading || !notes.trim()}
              onClick={onSaveNote}
            >
              {noteActionStatus === AppStatus.loading ? 'Đang lưu...' : 'Lưu ghi chú'}
            </AppButton>
            <div className="space-y-3">
              {lessonNotesStatus === AppStatus.loading ? (
                <div className="rounded-lg border border-border/60 bg-muted/30 p-4 text-sm text-muted-foreground">
                  Đang tải ghi chú của bài học này...
                </div>
              ) : null}
              {lessonNotes.map((note) => (
                <div key={note.id} className="rounded-lg border border-border/60 bg-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{note.lessonName}</p>
                      <p className="text-xs text-muted-foreground">{note.time}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto px-2 py-1 text-xs text-muted-foreground hover:text-destructive"
                      onClick={() => onDeleteNote(Number(note.id))}
                    >
                      Xóa
                    </Button>
                  </div>
                  <p className="mt-3 whitespace-pre-line text-sm text-muted-foreground">{note.content}</p>
                </div>
              ))}
              {lessonNotesStatus !== AppStatus.loading && lessonNotes.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border/60 bg-muted/20 p-4 text-sm text-muted-foreground">
                  Chưa có ghi chú nào cho bài học này.
                </div>
              ) : null}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="resources" className="mt-4 space-y-4">
          <div className="space-y-2">
            {currentLessonDetail?.resources?.map((resource) => (
              <a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
              >
                <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 012-2h6a2 2 0 012 2v12a1 1 0 110 2h-6a1 1 0 110-2h6V4H6v12a1 1 0 110 2H4a2 2 0 01-2-2V4z" />
                </svg>
                <span className="text-sm font-medium">{resource.name}</span>
              </a>
            ))}
            {!currentLessonDetail?.resources?.length ? (
              <div className="rounded-lg border border-dashed border-border/60 bg-muted/20 p-4 text-sm text-muted-foreground">
                Bài học này chưa có tài liệu đính kèm.
              </div>
            ) : null}
          </div>
        </TabsContent>
      </Tabs>

      {showQuizAction ? (
        <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-muted/40 p-5 shadow-[0_20px_50px_-40px_rgba(15,23,42,0.7)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                <BarChart3 className="h-3.5 w-3.5" />
                Quiz Tracker
              </div>
              <h3 className="text-lg font-semibold text-foreground">Bài tập trắc nghiệm của bài học</h3>
              {quizStatus === AppStatus.loading ? (
                <p className="text-sm text-muted-foreground">Đang tải dữ liệu quiz...</p>
              ) : quizSummary?.hasAttempt ? (
                <p className="text-sm text-muted-foreground">
                  Điểm gần nhất <span className="font-semibold text-foreground">{quizSummary.scorePercent ?? 0}%</span>
                  {' '}• Mức đạt <span className="font-semibold text-foreground">{quizSummary.passPercent}%</span>
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Chưa có lượt làm nào • Mức đạt <span className="font-semibold text-foreground">{quizSummary?.passPercent ?? 70}%</span>
                </p>
              )}
            </div>

            <div className="shrink-0">
              {quizStatus === AppStatus.loading ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1.5 text-sm text-muted-foreground">
                  <CircleDashed className="h-4 w-4 animate-spin" />
                  Đang kiểm tra
                </div>
              ) : quizSummary?.hasAttempt ? (
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${
                    quizSummary.passed
                      ? 'border border-emerald-300/50 bg-emerald-500/10 text-emerald-600'
                      : 'border border-rose-300/50 bg-rose-500/10 text-rose-600'
                  }`}
                >
                  {quizSummary.passed ? <CircleCheckBig className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  {quizSummary.passed ? 'Đạt' : 'Chưa đạt'}
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/50 bg-amber-500/10 px-3 py-1.5 text-sm font-semibold text-amber-600">
                  <CircleDashed className="h-4 w-4" />
                  Chưa làm quiz
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <AppButton type="button" className="min-w-44" onClick={onOpenQuiz}>
              <RotateCcw className="h-4 w-4" />
              Làm lại bài tập
            </AppButton>
            <Button
              type="button"
              variant="outline"
              className="min-w-44 bg-transparent"
              disabled={!quizSummary?.hasAttempt}
              onClick={onViewQuizResult}
            >
              <BarChart3 className="h-4 w-4" />
              Xem lại kết quả
            </Button>
          </div>
        </div>
      ) : null}

      <div className="flex gap-3 pt-4">
        <Button
          variant="outline"
          className="flex-1 bg-transparent"
          disabled={currentLessonIndex <= 0}
          onClick={() => {
            const previousLessonId = lessonIds[currentLessonIndex - 1]
            if (typeof previousLessonId === 'number') {
              onSelectLesson(previousLessonId)
            }
          }}
        >
          Bài trước
        </Button>
        <AppButton className="flex-1" onClick={onCompleteLesson}>
          {currentLessonData?.completed ? 'Tiếp tục' : 'Hoàn thành'} & Bài tiếp theo
        </AppButton>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card/70 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">Thảo luận bài học</h3>
            <p className="text-sm text-muted-foreground">
              Hỏi đáp trong bài học {currentLessonData?.title?.toLowerCase() ?? 'đang xem'}
            </p>
          </div>
          <Button variant="outline">Viết bình luận</Button>
        </div>
        <div className="mt-6 space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="rounded-xl border border-border/60 bg-background p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 font-semibold text-accent-foreground">
                    {comment.name.slice(0, 1)}
                  </div>
                  <div>
                    <p className="font-medium">{comment.name}</p>
                    <p className="text-xs text-muted-foreground">{comment.time}</p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{comment.content}</p>
            </div>
          ))}
          {comments.length === 0 ? (
            <div className="rounded-xl border border-border/60 bg-background p-4 text-sm text-muted-foreground">
              Bài học này chưa có thảo luận.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
