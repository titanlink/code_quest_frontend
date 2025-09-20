"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"

import type { PostFilters } from "@/lib/types"
import { PostGrid, ResultsSummary, usePostStore } from "@/features"

export default function PostsPage() {
  const isLoading = usePostStore((state) => state.isLoading);

  const [filters, setFilters] = useState<PostFilters>({
    search: "",
    category: "",
    featured: false,
    published: false,
  })

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      featured: false,
      published: false,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-700/20">
      <Navbar />
      <div className="relative inset-0 container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Todos los Artículos</h1>
          <p className="text-xl text-muted-foreground">
            Explora nuestra colección completa de artículos sobre tecnología, diseño y desarrollo.
          </p>
        </div>
        <PostGrid clearFilters={clearFilters} isLoading={isLoading} />
      </div>
    </div>
  )
}
