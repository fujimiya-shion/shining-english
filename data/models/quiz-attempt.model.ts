import "reflect-metadata";
import { Expose } from "class-transformer";
import { BaseModel } from "./base.model";
import { Serializable } from "./serializable.model";

export type SerializedQuizAttempt = {
  id?: number | string;
  userId?: number;
  quizId?: number;
  scorePercent?: number;
  passed?: boolean;
  submittedAt?: string;
};

export class QuizAttempt extends BaseModel implements Serializable<SerializedQuizAttempt> {
  @Expose({ name: "user_id" })
  userId?: number;

  @Expose({ name: "quiz_id" })
  quizId?: number;

  @Expose({ name: "score_percent" })
  scorePercent?: number;

  passed?: boolean;

  @Expose({ name: "submitted_at" })
  submittedAt?: string;

  serialize(): SerializedQuizAttempt {
    return {
      id: this.id,
      userId: this.userId,
      quizId: this.quizId,
      scorePercent: this.scorePercent,
      passed: this.passed,
      submittedAt: this.submittedAt,
    };
  }
}
