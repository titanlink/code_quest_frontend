"use client"

import { useEffect, useState } from "react"
import {  CommentsOverTimeChart, CommentsTable, useCommentStore } from "@/features"
import { AdminFeatureHeader, LoadingPage, PaginationManager, ResizableHandle, ResizablePanel, ResizablePanelGroup, SearchFilters } from "@/components"
import { useAuth } from "@/lib"

export default function AdminCommentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { user, getToken } = useAuth()
  const [token, setToken] = useState<string>('')

  const getComments = useCommentStore((state) => state.getData);
  const comments = useCommentStore((state) => state.items);
  const totalRecords = useCommentStore((state) => state.total);
  const isLoading = useCommentStore((state) => state.isLoading ?? true);


  const [limit,setLimit] = useState(10)
  const [page,setPage] = useState(1)

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
        if (token) await getComments(page-1, limit, token);
      }
    }
    fetchToken()
  }, [token, user, limit, page]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminFeatureHeader title="Comentarios" subTitle="Gestiona todos los comentarios" ></AdminFeatureHeader>

      { isLoading ? ( 
        <LoadingPage /> 
      ) : (
        <ResizablePanelGroup direction="horizontal" className=" gap-4">
          <ResizablePanel defaultSize={70}>
            <div className="flex flex-col gap-4 w-full">
              <SearchFilters placeholder="Buscar comments..." searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

              <div className='flex flex-row'>
                <PaginationManager
                  totalItems={totalRecords}
                  itemsPerPage={limit}
                  currentPage={page}
                  onPageChange={async (pag) => {
                    if (page == pag) return
                    setPage(pag)
                  }}
                  maxVisiblePages={2}
                />
              </div>

              <CommentsTable filteredComments={filteredComments} handleDeleteComment={handleDeleteComment} totalRecords={totalRecords}/>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel>
            <div className="flex flex-col gap-4 w-full">
              <CommentsOverTimeChart comments={comments}/>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) }
    </div>
  )
}

