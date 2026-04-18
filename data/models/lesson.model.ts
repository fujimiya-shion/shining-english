import "reflect-metadata";
import { Expose, Type } from "class-transformer";
import { BaseModel } from "./base.model";
import { LessonComment, SerializedLessonComment } from "./lesson-comment.model";
import { LessonNote, SerializedLessonNote } from './lesson-note.model'
import { Serializable } from "./serializable.model";

export type SerializedLesson = {
  id?: number | string;
  name?: string;
  slug?: string;
  videoUrl?: string;
  documents?: string[];
  documentNames?: Record<string, string>;
  groupName?: string;
  description?: string;
  durationMinutes?: number;
  hasQuiz?: boolean;
  comments: SerializedLessonComment[];
  notes: SerializedLessonNote[];
};

export class Lesson extends BaseModel implements Serializable<SerializedLesson> {
  name?: string;
  slug?: string;

  @Expose({ name: "course_id" })
  courseId?: number;

  @Expose({ name: "video_url" })
  videoUrl?: string;

  documents?: string[];

  @Expose({ name: "document_names" })
  documentNames?: Record<string, string>;

  @Expose({ name: "group_name" })
  groupName?: string;

  description?: string;

  @Expose({ name: "duration_minutes" })
  durationMinutes?: number;

  @Expose({ name: "star_reward_video" })
  starRewardVideo?: number;

  @Expose({ name: "star_reward_quiz" })
  starRewardQuiz?: number;

  @Expose({ name: "has_quiz" })
  hasQuiz?: boolean;

  @Type(() => LessonComment)
  comments?: LessonComment[];

  @Type(() => LessonNote)
  notes?: LessonNote[]

  serialize(): SerializedLesson {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      videoUrl: this.videoUrl,
      documents: this.documents ?? [],
      documentNames: this.documentNames ?? {},
      groupName: this.groupName,
      description: this.description,
      durationMinutes: this.durationMinutes,
      hasQuiz: this.hasQuiz,
      comments: (this.comments ?? []).map((comment) => comment.serialize()),
      notes: (this.notes ?? []).map((note) => note.serialize()),
    };
  }
}
