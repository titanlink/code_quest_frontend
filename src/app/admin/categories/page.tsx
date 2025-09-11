"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { mockCategories } from "@/lib/mock-data"
import { AdminFeatureHeader, LoadingPage, SearchFilters } from "@/components"
import { Plus } from "lucide-react"
import { CategoriesTable, useCategoryStore } from "@/features"

export default function AdminCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  // const [categories, setCategories] = useState(mockCategories)
  
  const getCategories = useCategoryStore((state) => state.getData);
  const categories = useCategoryStore((state) => state.items);

  const page: number = useCategoryStore( (state) => state.page ?? 1  );
  const limit: number = useCategoryStore( (state) => state.limit ?? 50  );
  const isLoading = useCategoryStore((state) => state.isLoading);

  const filteredCategories = categories.filter(
    (categorie) =>
      categorie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      categorie.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteCategorie = (categorieId: string) => {
    // setCategories(categories.filter((p) => p.id !== categorieId))
  }

  useEffect(() => {
    getCategories(page, limit);
  }, [page, limit, getCategories]);


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


      {/* Categories Table */}
      {isLoading ? (
        <LoadingPage />
      ) :  (
        <>
          {/* Search and Filters */}
          <SearchFilters placeholder="Buscar categories..." searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <CategoriesTable filteredCategories={filteredCategories} handleDeleteCategory={handleDeleteCategorie} />
          {/* <pre><b>{JSON.stringify(categories, null, 2) } </b> </pre>  */}
        </>
      )}
    </div>
  )
}
