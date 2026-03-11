import { Expose } from "class-transformer";
import { BaseModel } from "./base.model";
import { Serializable } from "./serializable.model";

export type SerializedLesson = {
  id?: number | string;
  name?: string;
  slug?: string;
  videoUrl?: string;
  hasQuiz?: boolean;
};

export class Lesson extends BaseModel implements Serializable<SerializedLesson> {
  name?: string;
  slug?: string;

  @Expose({ name: "course_id" })
  courseId?: number;

  @Expose({ name: "video_url" })
  videoUrl?: string;

  @Expose({ name: "star_reward_video" })
  starRewardVideo?: number;

  @Expose({ name: "star_reward_quiz" })
  starRewardQuiz?: number;

  @Expose({ name: "has_quiz" })
  hasQuiz?: boolean;

  serialize(): SerializedLesson {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      videoUrl: this.videoUrl,
      hasQuiz: this.hasQuiz,
    };
  }
}
