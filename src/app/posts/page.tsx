"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
// import { SearchFilters } from "@/components/search-filters"

import type { PostFilters } from "@/lib/types"
import { PostGrid, ResultsSummary, usePostStore } from "@/features"

export default function PostsPage() {
  const getPosts = usePostStore((state) => state.getData);
  const items = usePostStore((state) => state.items);
  const isLoading = usePostStore((state) => state.isLoading);
  // const totalRecords = usePostStore((state) => state.total);

  const [filters, setFilters] = useState<PostFilters>({
    search: "",
    category: "",
    featured: false,
    published: false,
  })

  // useEffect(() => {
  //   const getData = async () => {
  //     getPosts(page, limit, token );
  //   }
  //   getData()
  // }, [page, limit, getPosts])

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
        {/* <ResultsSummary filteredPosts={filteredPosts} clearFilters={clearFilters} filters={filters} /> */}

        {/* Posts Grid */}
        <PostGrid clearFilters={clearFilters} isLoading={isLoading} />
      </div>
    </div>
  )
}
