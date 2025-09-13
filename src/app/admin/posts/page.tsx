"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PostsTable, usePostStore } from "@/features"
import { AdminFeatureHeader, LoadingPage, SearchFilters } from "@/components"
import { Plus } from "lucide-react"

export default function AdminPostsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const getPosts = usePostStore((state) => state.getData);
  const posts = usePostStore((state) => state.items);

  const page: number = usePostStore( (state) => state.page ?? 0  );
  const limit: number = usePostStore( (state) => state.limit ?? 50  );
  const isLoading = usePostStore((state) => state.isLoading);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) 
    // || post.author.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeletePost = (postId: string) => {
    // setPosts(posts.filter((p) => p.id !== postId))
  }

  useEffect(() => {
      getPosts(page, limit);
    }, [page, limit, getPosts]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminFeatureHeader title="Posts" subTitle="Gestiona todos los artículos del blog" >
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Post
          </Link>
        </Button>
      </AdminFeatureHeader>

      { isLoading ? ( 
        <LoadingPage /> 
      ) : (
          <>
            {/* Search and Filters */}
            <SearchFilters placeholder="Buscar posts..." searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {/* Posts Table */}
            <PostsTable filteredPosts={filteredPosts} handleDeletePost={handleDeletePost} />
          </>
      ) }
    </div>
  )
}
