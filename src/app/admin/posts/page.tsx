"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { mockPosts } from "@/lib/mock-data"
import { PostsTable } from "@/features"
import { AdminFeatureHeader, SearchFilters } from "@/components"
import { Plus } from "lucide-react"

export default function AdminPostsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [posts, setPosts] = useState(mockPosts)

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter((p) => p.id !== postId))
  }

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

      {/* Search and Filters */}
      <SearchFilters placeholder="Buscar posts..." searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Posts Table */}
      <PostsTable filteredPosts={filteredPosts} handleDeletePost={handleDeletePost} />
    </div>
  )
}
