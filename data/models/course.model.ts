import { Expose } from "class-transformer";
import { BaseModel } from "./base.model";

export class Course extends BaseModel {
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
}
