export function resolveProxyVideoUrl(resource: 'lessons', id?: number | string, value?: string): string {
  if (!id || !value) {
    return ''
  }

  return `/api/proxy/${resource}/${id}/video`
}
