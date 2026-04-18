export function resolveProxyVideoUrl(resource: 'lessons', id?: number | string, value?: string): string {
  if (!id || !value) {
    return ''
  }

  return `/api/proxy/${resource}/${id}/video`
}

export function resolveProxyLessonDocumentUrl(
  lessonId?: number | string,
  documentIndex?: number,
  value?: string,
): string {
  if (!lessonId || documentIndex === undefined || documentIndex < 0 || !value) {
    return ''
  }

  return `/api/proxy/lessons/${lessonId}/documents/${documentIndex}/download`
}
