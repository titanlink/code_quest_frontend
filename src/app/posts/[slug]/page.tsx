'use client'

import { notFound, useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { mockPosts } from "@/lib/mock-data"
import { EnhancedCommentsSection, IPost, PostContent, PostSidebar, RelatedPosts, usePostStore } from "@/features"
import { useAuth } from "@/lib"
import { useEffect, useState } from "react"
import { LoadingPage } from "@/components"
import NotFound from "./not-found"


export default  function PostPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const { user, getToken } = useAuth()

  const findOneBySlug = usePostStore((state) => state.findOneBySlug);
  const isLoading = usePostStore((state) => state.isLoading);
  const selected = usePostStore((state) => state.selected);

  const [post, setPost] = useState<IPost | undefined>()
  // const [loading, setLoading] = useState(true)

  const slug = params.slug

  useEffect(() => {
    const fetchData = async () => {
      let token = ''
      if (user) token = await getToken() ?? ''
      await findOneBySlug(slug, token)
      setPost(selected)
    }
    if (selected?.slug != slug) fetchData()
  }, [slug, getToken, router, user, post])
  


const relatedPosts = mockPosts
.filter((p) => p.id !== post?.id && p.categoryId === post?.categoryId && p.published)
.slice(0, 3)

return (
  <div className="min-h-screen bg-background">
      <Navbar />

      {(!isLoading && !selected) && ( <NotFound />) }
      {isLoading && (<LoadingPage />)}

      {(!isLoading && selected) && (<article className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <PostContent post={selected} />
            <EnhancedCommentsSection  post={selected} postId={selected.id ?? ''} postComments={selected.comments ?? []} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <PostSidebar post={selected} />
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-16 border-t">
            <RelatedPosts posts={relatedPosts} />
          </div>
        )}
      </article>)}
    </div>
  )
}

// Generate metadata for SEO
// export async function generateMetadata({ params }: Props) {
//   const post = mockPosts.find((p) => p.slug === params.slug)

//   if (!post) {
//     return {
//       title: "Post no encontrado",
//     }
//   }

//   return {
//     title: post.title,
//     description: post.excerpt,
//     openGraph: {
//       title: post.title,
//       description: post.excerpt,
//       images: post.coverImage ? [post.coverImage] : [],
//     },
//   }
// }
