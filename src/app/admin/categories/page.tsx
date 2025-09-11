"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { mockCategories } from "@/lib/mock-data"
import { AdminFeatureHeader, SearchFilters } from "@/components"
import { Plus } from "lucide-react"
import { CategoriesTable } from "@/features"

export default function AdminCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categories, setCategories] = useState(mockCategories)

  const filteredCategories = categories.filter(
    (categorie) =>
      categorie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      categorie.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteCategorie = (categorieId: string) => {
    setCategories(categories.filter((p) => p.id !== categorieId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminFeatureHeader title="Categorias" subTitle="Gestiona todos los artículos del blog" >
        <Button asChild>
          <Link href="/admin/categories/new">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Categoria
          </Link>
        </Button>
      </AdminFeatureHeader>

      {/* Search and Filters */}
      <SearchFilters placeholder="Buscar categories..." searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Categories Table */}
      <CategoriesTable filteredCategories={filteredCategories} handleDeleteCategory={handleDeleteCategorie} />
    </div>
  )
}
