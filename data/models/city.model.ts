import { Expose } from "class-transformer";
import { BaseModel } from "./base.model";

export class City extends BaseModel {
  @Expose({ name: "name" })
  name?: string;

  @Expose({ name: "sort_order" })
  sortOrder?: number | null;
}

