'use client'

import { notFound, useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { mockPosts } from "@/lib/mock-data"
import { EnhancedCommentsSection, IPost, PostContent, PostSidebar, RelatedPosts, useCategoryStore, usePostStore } from "@/features"
import { useAuth } from "@/lib"
import { useEffect, useState } from "react"
import { LoadingPage, ScrollArea } from "@/components"
import NotFound from "./not-found"


export default  function PostPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const { user, getToken } = useAuth()

  const getCategories = useCategoryStore((state) => state.getData);
  const categories = useCategoryStore((state) => state.items);
  const findOneBySlug = usePostStore((state) => state.findOneBySlug);
  const isLoading = usePostStore((state) => state.isLoading);
  const selected = usePostStore((state) => state.selected);
  
  const getPosts = usePostStore((state) => state.getData);
  const relateds = usePostStore((state) => state.items);
  


  const slug = params.slug
  
  useEffect(() => {
    const fetchData = async () => {
      let token = ''
      if (user) token = await getToken() ?? ''
        const resp = await findOneBySlug(slug, token)
        await getCategories(0, 100, token)
        if ('id' in resp){ 
          await getPosts(0, 4, '',  Number(resp?.category?.id), false )
        }
    }
    if (selected?.slug != slug) fetchData()
  }, [])



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
            <PostSidebar post={selected}  categories={categories} relateds={relateds}/>
          </div>
        </div>

        {/* Related Posts */}
          <div className="mt-16 pt-16 border-t">
            <RelatedPosts posts={relateds} />
          </div>
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
