import "reflect-metadata";
import { Type } from "class-transformer";

export class CourseFilterRangeResponse {
  min?: number | null;
  max?: number | null;
}

export class CourseFilterCategoryResponse {
  id?: number;
  name?: string;
  slug?: string;
  course_count?: number;
}

export class CourseFilterLevelResponse {
  value?: number;
  label?: string;
  count?: number;
}

export class CourseFilterResponse {
  @Type(() => CourseFilterCategoryResponse)
  categories?: CourseFilterCategoryResponse[];

  @Type(() => CourseFilterRangeResponse)
  price?: CourseFilterRangeResponse;

  @Type(() => CourseFilterRangeResponse)
  rating?: CourseFilterRangeResponse;

  @Type(() => CourseFilterRangeResponse)
  learned?: CourseFilterRangeResponse;

  @Type(() => CourseFilterLevelResponse)
  levels?: CourseFilterLevelResponse[];
}

export class CourseFilterRequest {
  constructor(
    public readonly categoryId?: number,
    public readonly status?: boolean,
    public readonly levelId?: number,
    public readonly priceMin?: number,
    public readonly priceMax?: number,
    public readonly query?: string,
    public readonly page?: number,
    public readonly perPage?: number,
  ) {}

  toParameters(): Record<string, string | number | boolean | undefined> {
    return {
      category_id: this.categoryId,
      status: this.status === undefined ? undefined : (this.status ? 1 : 0),
      level_id: this.levelId,
      price_min: this.priceMin,
      price_max: this.priceMax,
      q: this.query,
      page: this.page,
      perPage: this.perPage,
    };
  }
}
