"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PostsTable, PostViewsChart, usePostStore } from "@/features"
import { AdminFeatureHeader, LoadingPage, PaginationManager, ResizableHandle, ResizablePanel, ResizablePanelGroup, SearchFilters } from "@/components"
import { Plus } from "lucide-react"
import { useAuth } from "@/lib"

export default function AdminPostsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const getPosts = usePostStore((state) => state.getData);
  const posts = usePostStore((state) => state.items);
  const totalRecords = usePostStore((state) => state.total);

  // const page: number = usePostStore( (state) => state.page ?? 1  );
  // const limit: number = usePostStore( (state) => state.limit ?? 50  );

  const [limit,setLimit] = useState(10)
  const [page,setPage] = useState(1)
  
  const isLoading = usePostStore((state) => state.isLoading);

  const { user, getToken } = useAuth()
  const [token, setToken] = useState<string | null>(null)

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) 
    // || post.author.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeletePost = (postId: string) => {
    // setPosts(posts.filter((p) => p.id !== postId))
  }

  useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        const authToken = await getToken() ?? ''
        setToken(token)
        getPosts(page-1, limit, authToken );
      }
    }
    fetchToken()
  }, [user, token, page])


  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminFeatureHeader title="Posts" subTitle="Gestiona todos los artículos" >
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
        <ResizablePanelGroup direction="horizontal" className=" gap-4">
          <ResizablePanel defaultSize={70}>
            <div className="flex flex-col gap-4 w-full">
              <SearchFilters placeholder="Buscar posts..." searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              
              <div className='flex flex-row'>
                <PaginationManager
                  totalItems={totalRecords}
                  itemsPerPage={limit}
                  currentPage={page}
                  onPageChange={async (pag) => {
                    if (page == pag) return
                    setPage(pag)
                  }}
                  maxVisiblePages={1}
                />
              </div>

              <PostsTable filteredPosts={filteredPosts} handleDeletePost={handleDeletePost} totalRecords={totalRecords} />
            </div>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel>
            <div className="flex flex-col gap-4 w-full">
              <PostViewsChart posts={posts} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) }
    </div>
  )
}
