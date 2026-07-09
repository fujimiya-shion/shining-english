import {
  Award,
  BookOpen,
  CheckCircle,
  CircleHelp,
  Clock,
  MessageCircle,
  Rocket,
  Users,
  type LucideIcon,
} from 'lucide-react'

const HOME_ICON_MAP: Record<string, LucideIcon> = {
  award: Award,
  'book-open': BookOpen,
  'check-circle': CheckCircle,
  clock: Clock,
  'message-circle': MessageCircle,
  rocket: Rocket,
  users: Users,
}

export function resolveHomeIcon(iconType?: string | null): LucideIcon {
  if (!iconType) {
    return CircleHelp
  }

  return HOME_ICON_MAP[iconType] ?? CircleHelp
}
