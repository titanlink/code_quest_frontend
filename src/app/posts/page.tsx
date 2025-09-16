"use client"

import { useState, useMemo, useEffect } from "react"
import { Navbar } from "@/components/navbar"
// import { SearchFilters } from "@/components/search-filters"

import type { PostFilters } from "@/lib/types"
import { PostGrid, ResultsSummary, usePostStore } from "@/features"
import { useAuth } from "@/lib"

export default function PostsPage() {
  const getPosts = usePostStore((state) => state.getData);
  const items = usePostStore((state) => state.items);
  const page: number = usePostStore( (state) => state.page ?? 0  );
  const limit: number = usePostStore( (state) => state.limit ?? 50  );
  const isLoading = usePostStore((state) => state.isLoading);
  const { user, getToken } = useAuth()
  const [token, setToken] = useState<string | null>(null)

  const [filters, setFilters] = useState<PostFilters>({
    search: "",
    category: "",
    featured: false,
    published: false,
  })

  useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        const authToken = await getToken() ?? ''
        setToken(authToken)
        getPosts(0, 10, authToken );
      }
    }
    fetchToken()
  }, [user, getToken])

  const filteredPosts = useMemo(() => {
    return items.filter((post) => {
      // Filter by published status
      if (filters.published !== undefined && post.published !== filters.published) {
        return false
      }

      // Filter by featured status
      if (filters.featured !== undefined && post.featured !== filters.featured) {
        return false
      }

      // Filter by category
      if (filters.category && post?.category?.slug !== filters.category) {
        return false
      }

      // Filter by search term
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const matchesTitle = post.title.toLowerCase().includes(searchTerm)
        const matchesExcerpt = post.excerpt.toLowerCase().includes(searchTerm)
        const matchesContent = post.content.toLowerCase().includes(searchTerm)
        const matchesTags = post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
        const matchesAuthor = post?.author?.name.toLowerCase().includes(searchTerm)

        if (!matchesTitle && !matchesExcerpt && !matchesContent && !matchesTags && !matchesAuthor) {
          return false
        }
      }

      return true
    })
  }, [filters])

  const handleFiltersChange = (newFilters: PostFilters) => {
    setFilters(newFilters)
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      featured: false,
      published: false,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Todos los Artículos</h1>
          <p className="text-xl text-muted-foreground">
            Explora nuestra colección completa de artículos sobre tecnología, diseño y desarrollo.
          </p>
        </div>

        {/* Search and Filters */}
        {/* <SearchFilters filters={filters} onFiltersChange={handleFiltersChange} onClearFilters={clearFilters} /> */}

        {/* Results Summary */}
        <ResultsSummary filteredPosts={filteredPosts} clearFilters={clearFilters} filters={filters} />

        {/* Posts Grid */}
        <PostGrid filteredPosts={items} clearFilters={clearFilters} isLoading={isLoading} />
      </div>
    </div>
  )
}
