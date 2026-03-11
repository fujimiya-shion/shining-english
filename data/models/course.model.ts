import { Expose } from "class-transformer";
import { BaseModel } from "./base.model";
import { Serializable } from "./serializable.model";

export type SerializedCourse = {
  id?: number | string;
  name?: string;
  slug?: string;
  description?: string;
  rating?: number;
  learned?: number;
  price?: number;
  thumbnail?: string;
};

export class Course extends BaseModel implements Serializable<SerializedCourse> {
  name?: string;
  slug?: string;
  price?: number;
  status?: number;
  thumbnail?: string;

  @Expose({ name: "category_id" })
  categoryId?: number;

  description?: string;
  rating?: number;
  learned?: number;

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
    };
  }
}
