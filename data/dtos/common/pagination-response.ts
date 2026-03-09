import { ClassConstructor } from "class-transformer";
import { mapToModelList } from "@/shared/mappers/model.mapper";
import { ObjectResponse } from "./object-response";

function asInt(value: unknown, fallback = 0): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? Math.trunc(value) : fallback;
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? fallback : parsed;
  }

  return fallback;
}

export class PaginationResponse<T> extends ObjectResponse<T[]> {
  constructor(
    status: boolean,
    statusCode: number,
    data: T[],
    public readonly total: number,
    public readonly pageCount: number,
    public readonly page: number,
    public readonly perPage: number,
  ) {
    super(status, statusCode, data);
  }

  static fromJson<T>(
    json: Record<string, unknown>,
    modelClass: ClassConstructor<T>,
  ): PaginationResponse<T> {
    const parsedList = mapToModelList(json.data, modelClass);

    const meta = json.meta;
    const metaObj = meta && typeof meta === "object" ? (meta as Record<string, unknown>) : {};

    const page = asInt(metaObj.page ?? json.page, 1);
    const perPage = asInt(
      metaObj.per_page ?? metaObj.perPage ?? json.per_page ?? json.perPage,
      parsedList.length,
    );
    const total = asInt(metaObj.total ?? json.total, parsedList.length);

    let pageCount = asInt(
      metaObj.page_count ?? metaObj.pageCount ?? json.page_count ?? json.pageCount,
      0,
    );
    if (pageCount <= 0 && perPage > 0) {
      pageCount = Math.ceil(total / perPage);
      if (pageCount === 0) {
        pageCount = 1;
      }
    }
    if (pageCount === 0) {
      pageCount = 1;
    }

    const status = typeof json.status === "boolean" ? json.status : false;
    const statusCode = asInt(json.status_code ?? json.statusCode, 0);

    return new PaginationResponse<T>(
      status,
      statusCode,
      parsedList,
      total,
      pageCount,
      page,
      perPage,
    );
  }
}
