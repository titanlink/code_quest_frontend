"use client"

import { useEffect, useState } from "react"
import {  CommentsOverTimeChart, CommentsTable, useCommentStore } from "@/features"
import { AdminFeatureHeader, LoadingPage, SearchFilters } from "@/components"
import { useAuth } from "@/lib"

export default function AdminCommentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { user, getToken } = useAuth()
  const [token, setToken] = useState<string>('')

  const getComments = useCommentStore((state) => state.getData);
  const comments = useCommentStore((state) => state.items);

  const page: number = useCommentStore( (state) => state.page ?? 0  );
  const limit: number = useCommentStore( (state) => state.limit ?? 50  );
  const isLoading = useCommentStore((state) => state.isLoading);

  const filteredComments = comments.filter(
    (comment) =>
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment?.author?.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteComment = (commentId: string) => {
    // setComments(comments.filter((p) => p.id !== commentId))
  }

  useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        const authToken = await getToken() ?? ''
        setToken(authToken)
        getComments(page, limit, token);
      }
    }
    fetchToken()
  }, [token, user, page, limit, getComments]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminFeatureHeader title="Comentarios" subTitle="Gestiona todos los commentarios del blog" ></AdminFeatureHeader>

      { isLoading ? ( 
        <LoadingPage /> 
      ) : (
      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-2 w-[60%]">
          <SearchFilters placeholder="Buscar comments..." searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <CommentsTable filteredComments={filteredComments} handleDeleteComment={handleDeleteComment} />
        </div>
        <div className="flex flex-col gap-2 w-[40%]">
          <CommentsOverTimeChart comments={comments}/>
        </div>
      </div>
      ) }
    </div>
  )
}
