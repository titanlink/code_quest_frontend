import { PostFilters } from "@/lib/types"
import { IPost } from "../../domain/entities/post.entity"

interface Props {
  filteredPosts:IPost[],
  clearFilters: () => void,
  filters: PostFilters
}


export const ResultsSummary = ({filteredPosts, clearFilters, filters}:Props) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <p className="text-muted-foreground">
        {filteredPosts.length === 0
          ? "No se encontraron artículos"
          : `${filteredPosts.length} artículo${filteredPosts.length !== 1 ? "s" : ""} encontrado${
              filteredPosts.length !== 1 ? "s" : ""
            }`}
      </p>

      {(filters.search || filters.category || filters.featured !== undefined) && (
        <button
          onClick={clearFilters}
          className="text-sm text-primary hover:text-primary/80 underline transition-colors"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  )
}
