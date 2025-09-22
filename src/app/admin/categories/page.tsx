"use client"

import { useEffect, useState, useTransition } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import { Plus } from "lucide-react"

import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { AdminFeatureHeader } from "@/components/AdminFeatureHeader"
import { LoadingPage } from "@/components/LoadingPage"
import { PaginationManager } from "@/components/PaginationManager"
import { SearchFilters } from "@/components/SearchFilters"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { CategoriesTable } from "@/features/category/presentation/components/CategoriesTable"
import { CategoryPieChart } from "@/features/category/presentation/components/CategoryPieChart"
import { useCategoryStore } from "@/features/category/presentation/providers/category.store"
import { useAuth } from "@/lib/auth-context"


export default function AdminCategoriesPage() {
  const { user, getToken } = useAuth()
  const [token, setToken] = useState<string>('')
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("")
  const [isPending, startTransition] = useTransition()

  const getCategories = useCategoryStore((state) => state.getData);
  const removeCategory = useCategoryStore((state) => state.deleteOne);
  const categories = useCategoryStore((state) => state.items);


  const [limit] = useState(10)
  const [page,setPage] = useState(1)

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
        getCategories(page-1, limit, token);
      }
    }
    fetchToken()
  }, [page, limit, isPending, user,getCategories, getToken, token]);


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
      <AdminFeatureHeader title="Categorias" subTitle="Gestion de categorias" >
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
        <ResizablePanelGroup direction="horizontal" className=" gap-4">
          <ResizablePanel defaultSize={70}>
            <div className="flex flex-col gap-4 w-full">
              <SearchFilters placeholder="Buscar categories..." searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

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

              <CategoriesTable 
                filteredCategories={filteredCategories} 
                handleDeleteCategory={handleDeleteCategorie} 
                isPending={isPending} 
                totalRecords={totalRecords} />
            </div>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel>
            <div className="flex flex-col gap-4 w-full">
              <CategoryPieChart categories={categories} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>
  )
}
