"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { mockComments } from "@/lib/mock-data"
import { CommentsTable, useCommentStore } from "@/features"
import { LoadingPage, SearchFilters } from "@/components"

export default function AdminCommentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  // const [comments, setComments] = useState(mockComments)

  const getComments = useCommentStore((state) => state.getData);
  const comments = useCommentStore((state) => state.items);

  const page: number = useCommentStore( (state) => state.page ?? 1  );
  const limit: number = useCommentStore( (state) => state.limit ?? 50  );
  const isLoading = useCommentStore((state) => state.isLoading);

  const filteredComments = comments.filter(
    (comment) =>
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.author.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteComment = (commentId: string) => {
    // setComments(comments.filter((p) => p.id !== commentId))
  }

  useEffect(() => {
      getComments(page, limit);
  }, [page, limit, getComments]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Comments</h1>
          <p className="text-muted-foreground">Gestiona todos los artículos del blog</p>
        </div>
      </div>


      { isLoading ? ( 
        <LoadingPage /> 
      ) : (
        <>
          {/* Search and Filters */}
          <SearchFilters placeholder="Buscar comments..." searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {/* Posts Table */}
          <CommentsTable filteredComments={filteredComments} handleDeleteComment={handleDeleteComment} />
        </>
      ) }
    </div>
  )
}
