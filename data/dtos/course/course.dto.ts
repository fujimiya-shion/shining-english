import "reflect-metadata";
import { Expose, Type } from "class-transformer";

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

export class CourseFilterDurationHoursResponse {
  @Expose({ name: "min_hours" })
  minHours?: number | null;

  @Expose({ name: "max_hours" })
  maxHours?: number | null;

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

  @Expose({ name: "duration_hours" })
  @Type(() => CourseFilterDurationHoursResponse)
  durationHours?: CourseFilterDurationHoursResponse[];
}

export class CourseFilterRequest {
  constructor(
    public readonly categoryId?: number,
    public readonly status?: boolean,
    public readonly levelId?: number,
    public readonly priceMin?: number,
    public readonly priceMax?: number,
    public readonly durationMinHours?: number,
    public readonly durationMaxHours?: number,
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
      duration_min_hours: this.durationMinHours,
      duration_max_hours: this.durationMaxHours,
      q: this.query,
      page: this.page,
      perPage: this.perPage,
    };
  }
}
