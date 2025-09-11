import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { mockPosts } from "@/lib/mock-data"
import { EnhancedCommentsSection, PostContent, PostSidebar, RelatedPosts } from "@/features"

interface PostPageProps {
  params: {
    slug: string
  }
}

export default function PostPage({ params }: PostPageProps) {
  const post = mockPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = mockPosts
    .filter((p) => p.id !== post.id && p.categoryId === post.categoryId && p.published)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <PostContent post={post} />
            <EnhancedCommentsSection postId={post.id} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <PostSidebar post={post} />
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-16 border-t">
            <RelatedPosts posts={relatedPosts} />
          </div>
        )}
      </article>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PostPageProps) {
  const post = mockPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: "Post no encontrado",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}
