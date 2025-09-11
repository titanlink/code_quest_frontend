"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
// import { SearchFilters } from "@/components/search-filters"
import { mockPosts } from "@/lib/mock-data"

import type { PostFilters } from "@/lib/types"
import { PostGrid, ResultsSummary } from "@/features"

export default function PostsPage() {
  const [filters, setFilters] = useState<PostFilters>({
    search: "",
    category: "",
    featured: undefined,
    published: true,
  })

  const filteredPosts = useMemo(() => {
    return mockPosts.filter((post) => {
      // Filter by published status
      if (filters.published !== undefined && post.published !== filters.published) {
        return false
      }

      // Filter by featured status
      if (filters.featured !== undefined && post.featured !== filters.featured) {
        return false
      }

      // Filter by category
      if (filters.category && post.category.slug !== filters.category) {
        return false
      }

      // Filter by search term
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const matchesTitle = post.title.toLowerCase().includes(searchTerm)
        const matchesExcerpt = post.excerpt.toLowerCase().includes(searchTerm)
        const matchesContent = post.content.toLowerCase().includes(searchTerm)
        const matchesTags = post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
        const matchesAuthor = post.author.name.toLowerCase().includes(searchTerm)

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
      featured: undefined,
      published: true,
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
        <PostGrid filteredPosts={filteredPosts} clearFilters={clearFilters} />
      </div>
    </div>
  )
}
