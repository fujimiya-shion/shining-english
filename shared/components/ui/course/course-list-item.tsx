import { CheckCircle2, Lock, Circle } from 'lucide-react'

export type CourseListItemData = {
  id: number
  title: string
  duration?: number
  completed: boolean
  locked: boolean
}

type CourseListItemProps = {
  lesson: CourseListItemData
  isActive: boolean
  onSelect: (id: number) => void
}

export function CourseListItem({ lesson, isActive, onSelect }: CourseListItemProps) {
  const icon = lesson.completed ? (
    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
  ) : lesson.locked ? (
    <Lock className="h-4 w-4 flex-shrink-0" />
  ) : (
    <Circle className="h-4 w-4 flex-shrink-0" />
  )

  return (
    <button
      onClick={() => onSelect(lesson.id)}
      disabled={lesson.locked}
      className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
        isActive
          ? 'bg-primary text-primary-foreground'
          : lesson.locked
            ? 'text-muted-foreground bg-muted/50 cursor-not-allowed'
            : 'hover:bg-muted'
      }`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="flex-1 line-clamp-2">{lesson.title}</span>
      </div>
      {typeof lesson.duration === 'number' && lesson.duration > 0 ? (
        <div className="mt-1 ml-6 text-xs text-muted-foreground">
          {lesson.duration}m
        </div>
      ) : null}
    </button>
  )
}
