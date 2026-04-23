import "reflect-metadata";
import { Expose } from "class-transformer";
import { BaseModel } from "./base.model";
import { Serializable } from "./serializable.model";

export type SerializedQuizAnswer = {
  id?: number | string;
  quizQuestionId?: number;
  content?: string;
  isCorrect?: boolean;
};

export class QuizAnswer extends BaseModel implements Serializable<SerializedQuizAnswer> {
  @Expose({ name: "quiz_question_id" })
  quizQuestionId?: number;

  content?: string;

  @Expose({ name: "is_correct" })
  isCorrect?: boolean;

  serialize(): SerializedQuizAnswer {
    return {
      id: this.id,
      quizQuestionId: this.quizQuestionId,
      content: this.content,
      isCorrect: this.isCorrect,
    };
  }
}
