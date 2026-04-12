import { ListResponse } from '@/data/dtos/common/list-response'
import { ObjectResponse } from '@/data/dtos/common/object-response'
import { LessonNote } from '@/data/models/lesson-note.model'
import { ApiException } from '@/data/types/api-exception'
import { ApiResult } from '@/data/types/api-result'
import { AppEndpoints } from '@/shared/constants/app-endpoints'
import { BaseRepository } from '../base.repository'
import { ILessonNoteRepository } from './lesson-note.repository.interface'

export class LessonNoteRepository extends BaseRepository implements ILessonNoteRepository {
  async getAll(): Promise<ApiResult<ListResponse<LessonNote>, ApiException>> {
    return this.get({
      url: AppEndpoints.lessonNote.index,
      map: (raw) => ListResponse.fromApiJson(raw, LessonNote),
    })
  }

  async getByLesson(lessonId: number): Promise<ApiResult<ListResponse<LessonNote>, ApiException>> {
    return this.get({
      url: AppEndpoints.lessonNote.byLesson(lessonId),
      map: (raw) => ListResponse.fromApiJson(raw, LessonNote),
    })
  }

  async create(lessonId: number, content: string): Promise<ApiResult<ObjectResponse<LessonNote>, ApiException>> {
    return this.post({
      url: AppEndpoints.lessonNote.byLesson(lessonId),
      body: { content },
      map: (raw) => ObjectResponse.fromApiJson(raw, LessonNote),
    })
  }

  async deleteNote(noteId: number): Promise<ApiResult<ObjectResponse<unknown>, ApiException>> {
    return super.delete({
      url: AppEndpoints.lessonNote.detail(noteId),
      map: (raw) => ObjectResponse.fromApiJson(raw),
    })
  }
}
