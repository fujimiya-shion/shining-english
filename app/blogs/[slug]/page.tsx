import { BlogDetailPageClient } from '@/app/blogs/components/blog-detail-page.client'

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params

  return <BlogDetailPageClient slug={slug} />
}
