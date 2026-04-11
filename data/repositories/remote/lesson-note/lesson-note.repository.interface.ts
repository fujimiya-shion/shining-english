import { ListResponse } from '@/data/dtos/common/list-response'
import { ObjectResponse } from '@/data/dtos/common/object-response'
import { LessonNote } from '@/data/models/lesson-note.model'
import { ApiException } from '@/data/types/api-exception'
import { ApiResult } from '@/data/types/api-result'

export interface ILessonNoteRepository {
  getAll(): Promise<ApiResult<ListResponse<LessonNote>, ApiException>>
  getByLesson(lessonId: number): Promise<ApiResult<ListResponse<LessonNote>, ApiException>>
  create(lessonId: number, content: string): Promise<ApiResult<ObjectResponse<LessonNote>, ApiException>>
  deleteNote(noteId: number): Promise<ApiResult<ObjectResponse<unknown>, ApiException>>
}
