import "reflect-metadata";
import { Expose, Type } from "class-transformer";
import { BaseModel } from "./base.model";
import { QuizQuestion, SerializedQuizQuestion } from "./quiz-question.model";
import { Serializable } from "./serializable.model";

export type SerializedQuiz = {
  id?: number | string;
  lessonId?: number;
  passPercent?: number;
  questions: SerializedQuizQuestion[];
};

export class Quiz extends BaseModel implements Serializable<SerializedQuiz> {
  @Expose({ name: "lesson_id" })
  lessonId?: number;

  @Expose({ name: "pass_percent" })
  passPercent?: number;

  @Type(() => QuizQuestion)
  questions?: QuizQuestion[];

  serialize(): SerializedQuiz {
    return {
      id: this.id,
      lessonId: this.lessonId,
      passPercent: this.passPercent,
      questions: (this.questions ?? []).map((question) => question.serialize()),
    };
  }
}
