"use client"

import { SetStateAction, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { mockPosts } from "@/lib/mock-data"
import { PostsTable } from "@/features"
import { SearchFilters } from "@/components"

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-muted-foreground">Gestiona todos los artículos del blog</p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Post
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <SearchFilters placeholder="Buscar posts..." searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Posts Table */}
      <PostsTable filteredPosts={filteredPosts} handleDeletePost={handleDeletePost} />
    </div>
  )
}
