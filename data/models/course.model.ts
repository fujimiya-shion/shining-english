import { Expose, Type } from "class-transformer";
import { BaseModel } from "./base.model";
import { Serializable } from "./serializable.model";
import { Lesson, SerializedLesson } from "./lesson.model";

export type SerializedCourse = {
  id?: number | string;
  name?: string;
  slug?: string;
  description?: string;
  rating?: number;
  learned?: number;
  price?: number;
  thumbnail?: string;
  category?: {
    id?: number | string;
    name?: string;
    slug?: string;
  };
  level?: {
    id?: number | string;
    name?: string;
  };
  lessons: SerializedLesson[];
};

class CourseCategoryRelation {
  id?: number | string;
  name?: string;
  slug?: string;
}

class CourseLevelRelation {
  id?: number | string;
  name?: string;
}

export class Course extends BaseModel implements Serializable<SerializedCourse> {
  name?: string;
  slug?: string;
  price?: number;
  status?: boolean;
  thumbnail?: string;

  @Expose({ name: "category_id" })
  categoryId?: number;

  @Expose({ name: "level_id" })
  levelId?: number;

  description?: string;
  rating?: number;
  learned?: number;

  @Type(() => CourseCategoryRelation)
  category?: CourseCategoryRelation;

  @Type(() => CourseLevelRelation)
  level?: CourseLevelRelation;

  @Type(() => Lesson)
  lessons?: Lesson[];

  serialize(): SerializedCourse {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      description: this.description,
      rating: this.rating,
      learned: this.learned,
      price: this.price,
      thumbnail: this.thumbnail,
      category: this.category
        ? {
            id: this.category.id,
            name: this.category.name,
            slug: this.category.slug,
          }
        : undefined,
      level: this.level
        ? {
            id: this.level.id,
            name: this.level.name,
          }
        : undefined,
      lessons: (this.lessons ?? []).map((lesson) => lesson.serialize()),
    };
  }
}
