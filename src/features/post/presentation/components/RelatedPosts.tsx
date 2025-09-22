'use client'

import { PostCard } from "@/components/post-card"
import { IPost } from "../../domain/entities/post.entity"

interface RelatedPostsProps {
  posts: IPost[]
}

export  const  RelatedPosts = ({ posts }: RelatedPostsProps) => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Artículos relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
