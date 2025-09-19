"use client"

import { useEffect, useState, useTransition } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AdminFeatureHeader, LoadingPage, SearchFilters } from "@/components"
import { Plus } from "lucide-react"
import { CategoriesTable, CategoryPieChart, useCategoryStore } from "@/features"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib"

export default function AdminCategoriesPage() {
  const { user, getToken } = useAuth()
  const [token, setToken] = useState<string>('')
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("")
  const [isPending, startTransition] = useTransition()
  // const [categories, setCategories] = useState(mockCategories)
  
  const getCategories = useCategoryStore((state) => state.getData);
  const removeCategory = useCategoryStore((state) => state.deleteOne);
  const categories = useCategoryStore((state) => state.items);

  const page: number = useCategoryStore( (state) => state.page ?? 0  );
  const limit: number = useCategoryStore( (state) => state.limit ?? 50  );
  const totalRecords: number = useCategoryStore( (state) => state.total );
  const isLoading = useCategoryStore((state) => state.isLoading);

  const filteredCategories = categories.filter(
    (categorie) =>
      categorie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      categorie.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        const authToken = await getToken() ?? ''
        setToken(authToken)
        getCategories(page, limit, token);
      }
    }
    fetchToken()
  }, [page, limit, getCategories, isPending]);
  

  const handleDeleteCategorie = async (categorieId: string) => {

      startTransition(async () => {
      try {
        const resp = await removeCategory(categorieId, token)
        if ("error" in resp && resp['error']){ toast.error(resp.msg); return }
        toast.success(resp.msg)
        router.push(`/admin/categories`)

      } catch (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      }
    })
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


      {/* Categories Table */}
      {isLoading ? (
        <LoadingPage />
      ) :  (
        <div className="flex flex-row gap-2">
          
          <div className="flex flex-col gap-2 w-[60%]">
            <SearchFilters placeholder="Buscar categories..." searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <CategoriesTable filteredCategories={filteredCategories} handleDeleteCategory={handleDeleteCategorie} isPending={isPending} />
          </div>

          <div className="flex flex-col gap-2 w-[40%]">
            <CategoryPieChart categories={categories} />
          </div>

        </div>
      )}
    </div>
  )
}
