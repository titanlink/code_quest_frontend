"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { mockComments } from "@/lib/mock-data"
import { CommentsTable } from "@/features"
import { SearchFilters } from "@/components"
import { Plus } from "lucide-react"

export default function AdminCommentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [comments, setComments] = useState(mockComments)

  const filteredComments = comments.filter(
    (comment) =>
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.author.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter((p) => p.id !== commentId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Comments</h1>
          <p className="text-muted-foreground">Gestiona todos los artículos del blog</p>
        </div>
      </div>

      {/* Search and Filters */}
      <SearchFilters placeholder="Buscar comments..." searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Comments Table */}
      <CommentsTable filteredComments={filteredComments} handleDeleteComment={handleDeleteComment} />
    </div>
  )
}
