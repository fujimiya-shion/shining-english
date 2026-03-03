import { ClassConstructor } from "class-transformer";
import { mapToModel } from "@/shared/mappers/model.mapper";

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

export class ObjectResponse<T> {
  constructor(
    public readonly status: boolean,
    public readonly statusCode: number,
    public readonly data: T,
  ) {}

  static fromApiJson<T>(
    json: Record<string, unknown>,
    modelClass?: ClassConstructor<T>,
  ): ObjectResponse<T> {
    const status = typeof json.status === "boolean" ? json.status : false;
    const statusCode = asInt(json.status_code ?? json.statusCode, 0);
    const data = mapToModel(json.data, modelClass);

    return new ObjectResponse<T>(status, statusCode, data);
  }
}
