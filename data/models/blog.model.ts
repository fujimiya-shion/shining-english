import 'reflect-metadata'
import { Expose, Type } from 'class-transformer'
import { BaseModel } from './base.model'
import { Serializable } from './serializable.model'

export type SerializedBlogTag = {
  id?: number
  name?: string
  slug?: string
}

export type SerializedBlog = {
  id?: number | string
  title?: string
  slug?: string
  description?: string
  shortDescription?: string | null
  thumbnail?: string | null
  content?: string | null
  readTimeMinutes?: number
  publishedAt?: string | null
  tag?: SerializedBlogTag | null
}

export class BlogTagModel {
  id?: number
  name?: string
  slug?: string
}

export class Blog extends BaseModel implements Serializable<SerializedBlog> {
  title?: string
  slug?: string
  description?: string

  @Expose({ name: 'short_description' })
  shortDescription?: string | null

  thumbnail?: string | null
  content?: string | null

  @Expose({ name: 'read_time_minutes' })
  readTimeMinutes: number = 1

  @Expose({ name: 'published_at' })
  publishedAt?: string | null

  @Type(() => BlogTagModel)
  tag?: BlogTagModel | null

  serialize(): SerializedBlog {
    return {
      id: this.id,
      title: this.title,
      slug: this.slug,
      description: this.description,
      shortDescription: this.shortDescription ?? null,
      thumbnail: this.thumbnail,
      content: this.content,
      readTimeMinutes: this.readTimeMinutes,
      publishedAt: this.publishedAt ?? null,
      tag: this.tag
        ? {
            id: this.tag.id,
            name: this.tag.name,
            slug: this.tag.slug,
          }
        : null,
    }
  }
}

export class BlogListResponseModel {
  @Type(() => Blog)
  items: Blog[] = []

  @Type(() => BlogTagModel)
  topics: BlogTagModel[] = []
}

export class BlogDetailResponseModel {
  @Type(() => Blog)
  blog: Blog = new Blog()
}
