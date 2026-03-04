import "reflect-metadata";
import { ClassConstructor, plainToInstance } from "class-transformer";

type PlainObject = Record<string, unknown>;

function isPlainObject(value: unknown): value is PlainObject {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function normalizeBaseDates<T extends object>(target: T): T {
  const model = target as T & {
    createdAt?: unknown;
    updatedAt?: unknown;
    created_at?: unknown;
    updated_at?: unknown;
  };

  if (model.createdAt !== undefined) {
    model.createdAt = new Date(model.createdAt as string | number | Date);
  } else if (model.created_at !== undefined) {
    model.createdAt = new Date(model.created_at as string | number | Date);
  }

  if (model.updatedAt !== undefined) {
    model.updatedAt = new Date(model.updatedAt as string | number | Date);
  } else if (model.updated_at !== undefined) {
    model.updatedAt = new Date(model.updated_at as string | number | Date);
  }

  return target;
}

export function mapToModel<T>(
  plain: unknown,
  modelClass?: ClassConstructor<T>,
): T {
  if (!modelClass) {
    return plain as T;
  }

  const source = isPlainObject(plain) ? plain : {};
  const instance = plainToInstance(modelClass, source, {
    excludeExtraneousValues: false,
    enableImplicitConversion: true,
  });

  return normalizeBaseDates(instance as object) as T;
}

export function mapToModelList<T>(
  plain: unknown,
  modelClass: ClassConstructor<T>,
): T[] {
  if (!Array.isArray(plain)) {
    return [];
  }

  return plain
    .filter(isPlainObject)
    .map((item) => mapToModel(item, modelClass));
}
