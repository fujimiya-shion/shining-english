import 'reflect-metadata'
import { Expose, Type } from 'class-transformer'
import { Course } from '@/data/models/course.model'
import { mapToModel, mapToModelList } from '@/shared/mappers/model.mapper'

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value)
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined
}

function normalizeButtonType(value: unknown): 'primary' | 'secondary' {
  if (typeof value !== 'string') {
    return 'primary'
  }

  const normalized = value.trim().toLowerCase()
  return normalized === 'secondary' ? 'secondary' : 'primary'
}

class HomeReviewUserModel {
  id?: number | string
  name?: string
  avatar?: string
}

class HomeReviewCourseModel {
  id?: number | string
  name?: string
}

export class HomeActionButtonModel {
  title = ''
  action = ''
  type = 'primary'

  static fromApiJson(data: unknown): HomeActionButtonModel {
    const button = mapToModel(data, HomeActionButtonModel)
    button.type = normalizeButtonType(button.type)
    return button
  }
}

export class HomeHighlightModel {
  text = ''

  @Expose({ name: 'icon_path' })
  iconPath?: string | null

  @Expose({ name: 'icon_type' })
  iconType?: string | null
}

export class HomeBannerSectionModel {
  @Expose({ name: 'banner_logo' })
  bannerLogo = ''

  @Expose({ name: 'banner_eyebrow' })
  bannerEyebrow = ''

  @Expose({ name: 'banner_title' })
  bannerTitle = ''

  @Expose({ name: 'banner_description' })
  bannerDescription = ''

  @Expose({ name: 'banner_action_buttons' })
  @Type(() => HomeActionButtonModel)
  bannerActionButtons: HomeActionButtonModel[] = []

  @Expose({ name: 'banner_highlights' })
  @Type(() => HomeHighlightModel)
  bannerHighlights: HomeHighlightModel[] = []
}

export class HomeHeroCtaModel {
  title = ''
  description = ''
}

export class HomeHeroImageTagModel {
  text = ''

  @Expose({ name: 'hex_bg_color' })
  hexBgColor = '#FFFFFF'

  @Expose({ name: 'hex_text_color' })
  hexTextColor = '#172B4D'
}

export class HomeHeroImageCtaModel {
  icon = 'rocket'
  title = ''
  description = ''
}

export class HomeHeroSectionModel {
  title?: string | null

  @Expose({ name: 'html_title' })
  htmlTitle?: string | null

  description = ''

  @Type(() => HomeActionButtonModel)
  actions: HomeActionButtonModel[] = []

  @Type(() => HomeHeroCtaModel)
  ctas: HomeHeroCtaModel[] = []

  image = ''

  @Expose({ name: 'image_tags' })
  @Type(() => HomeHeroImageTagModel)
  imageTags: HomeHeroImageTagModel[] = []

  @Expose({ name: 'image_cta' })
  @Type(() => HomeHeroImageCtaModel)
  imageCta: HomeHeroImageCtaModel = new HomeHeroImageCtaModel()
}

export class HomeCourseListingSectionModel {
  title = ''
  description = ''

  @Type(() => Course)
  courses: Course[] = []

  @Expose({ name: 'hex_bg_colors' })
  hexBgColors: string[] = []

  @Expose({ name: 'render_background_type' })
  renderBackgroundType = 'frontend'
}

export class HomeFeatureItemModel {
  title = ''
  description = ''

  @Expose({ name: 'icon_path' })
  iconPath?: string | null

  @Expose({ name: 'icon_type' })
  iconType?: string | null

  @Expose({ name: 'badge_text' })
  badgeText?: string | null

  @Expose({ name: 'tag_text' })
  tagText?: string | null
}

export class HomeFeatureSectionModel {
  eyebrow = ''
  title = ''
  description = ''

  @Type(() => HomeFeatureItemModel)
  items: HomeFeatureItemModel[] = []
}

export class HomeProcessStepModel {
  label = ''
  title = ''
  description = ''

  @Expose({ name: 'icon_path' })
  iconPath?: string | null

  @Expose({ name: 'icon_type' })
  iconType?: string | null
}

export class HomeProcessSectionModel {
  title = ''
  description = ''

  @Type(() => HomeProcessStepModel)
  steps: HomeProcessStepModel[] = []

  tags: string[] = []
}

export class HomeTestimonialItemModel {
  id?: number | string
  rating?: number
  content?: string

  @Type(() => HomeReviewUserModel)
  user?: HomeReviewUserModel

  @Type(() => HomeReviewCourseModel)
  course?: HomeReviewCourseModel
}

export class HomeTestimonialSectionModel {
  title = ''
  description = ''

  @Type(() => HomeTestimonialItemModel)
  items: HomeTestimonialItemModel[] = []
}

export class HomeStatisticItemModel {
  value = ''
  label = ''
}

export class HomeStatisticSectionModel {
  @Type(() => HomeStatisticItemModel)
  items: HomeStatisticItemModel[] = []
}

export class HomeCtaSectionModel {
  title = ''
  description = ''

  @Expose({ name: 'action_buttons' })
  @Type(() => HomeActionButtonModel)
  actionButtons: HomeActionButtonModel[] = []
}

export class HomePageModel {
  banner: HomeBannerSectionModel = new HomeBannerSectionModel()
  hero: HomeHeroSectionModel = new HomeHeroSectionModel()
  courseListing: HomeCourseListingSectionModel = new HomeCourseListingSectionModel()
  feature: HomeFeatureSectionModel = new HomeFeatureSectionModel()
  process: HomeProcessSectionModel = new HomeProcessSectionModel()
  testimonials: HomeTestimonialSectionModel = new HomeTestimonialSectionModel()
  statistics: HomeStatisticSectionModel = new HomeStatisticSectionModel()
  cta: HomeCtaSectionModel = new HomeCtaSectionModel()

  static fromApiData(data: unknown): HomePageModel {
    const page = new HomePageModel()
    const payloads = isRecord(data) && Array.isArray(data.payloads) ? data.payloads : []

    for (const payload of payloads) {
      if (!isRecord(payload)) {
        continue
      }

      const type = asString(payload.type)
      const sectionData = payload.data

      switch (type) {
        case 'banner':
          page.banner = mapToModel(sectionData, HomeBannerSectionModel)
          page.banner.bannerActionButtons = normalizeHomeActionButtons(
            page.banner.bannerActionButtons
          )
          break
        case 'hero':
          page.hero = mapToModel(sectionData, HomeHeroSectionModel)
          page.hero.actions = normalizeHomeActionButtons(page.hero.actions)
          break
        case 'courses':
          page.courseListing = mapToModel(sectionData, HomeCourseListingSectionModel)
          page.courseListing.courses = mapToModelList(page.courseListing.courses, Course)
          break
        case 'feature':
          page.feature = mapToModel(sectionData, HomeFeatureSectionModel)
          break
        case 'process':
          page.process = mapToModel(sectionData, HomeProcessSectionModel)
          break
        case 'testimonials':
          page.testimonials = mapToModel(sectionData, HomeTestimonialSectionModel)
          break
        case 'statistics':
          page.statistics = mapToModel(sectionData, HomeStatisticSectionModel)
          break
        case 'cta':
          page.cta = mapToModel(sectionData, HomeCtaSectionModel)
          page.cta.actionButtons = normalizeHomeActionButtons(
            page.cta.actionButtons
          )
          break
        default:
          break
      }
    }

    return page
  }
}

export function normalizeHomeActionButtons(
  buttons: HomeActionButtonModel[],
): HomeActionButtonModel[] {
  return buttons.map((button) => HomeActionButtonModel.fromApiJson(button))
}
