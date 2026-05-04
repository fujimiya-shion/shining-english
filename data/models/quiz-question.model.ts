import "reflect-metadata";
import { Expose, Type } from "class-transformer";
import { BaseModel } from "./base.model";
import { QuizAnswer, SerializedQuizAnswer } from "./quiz-answer.model";
import { Serializable } from "./serializable.model";

export type SerializedQuizQuestion = {
  id?: number | string;
  quizId?: number;
  content?: string;
  answers: SerializedQuizAnswer[];
};

export class QuizQuestion extends BaseModel implements Serializable<SerializedQuizQuestion> {
  @Expose({ name: "quiz_id" })
  quizId?: number;

  content?: string;

  @Type(() => QuizAnswer)
  answers?: QuizAnswer[];

  serialize(): SerializedQuizQuestion {
    return {
      id: this.id,
      quizId: this.quizId,
      content: this.content,
      answers: (this.answers ?? []).map((answer) => answer.serialize()),
    };
  }
}
