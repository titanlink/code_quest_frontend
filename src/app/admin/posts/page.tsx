"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PostsTable, usePostStore } from "@/features"
import { AdminFeatureHeader, LoadingPage, PaginationManager, SearchFilters } from "@/components"
import { Plus } from "lucide-react"
import { useAuth } from "@/lib"

export default function AdminPostsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const getPosts = usePostStore((state) => state.getData);
  const posts = usePostStore((state) => state.items);
  const totalRecords = usePostStore((state) => state.total);

  // const page: number = usePostStore( (state) => state.page ?? 1  );
  // const limit: number = usePostStore( (state) => state.limit ?? 50  );

  const [limit,setLimit] = useState(50)
  const [page,setPage] = useState(0)
  
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
        getPosts(page, limit, authToken );
      }
    }
    fetchToken()
  }, [user, getToken])


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

            <div className='flex flex-row mb-4'>
              <PaginationManager
                totalItems={totalRecords}
                itemsPerPage={limit}
                currentPage={!page ? 1 : page}
                onPageChange={async (pag) => {
                  if (page == pag) return
                  setPage(pag)
                  await getPosts(pag-1, limit, '');
                }}
                maxVisiblePages={1}
              />
            </div>

            {/* Posts Table */}
            <PostsTable filteredPosts={filteredPosts} handleDeletePost={handleDeletePost} />
          </>
      ) }
    </div>
  )
}
