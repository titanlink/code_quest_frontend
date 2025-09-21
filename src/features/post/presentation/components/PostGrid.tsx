'use client'
import { useEffect, useMemo, useState } from 'react'
import { usePostStore } from '../..'
import {  PaginationManager,  PostCard, Skeleton, TextEffect } from '@/components'
import { SearchFilters } from './search-filters'
import { PostFilters } from '@/lib'
import { useCategoryStore } from '@/features'

interface Props {
  isLoading?:boolean,
  clearFilters: () => void
}
export const PostGrid = ({clearFilters, isLoading, }:Props) => {
  const [filters, setFilters] = useState<PostFilters>({ search: '' })
  
  const [limit,setLimit] = useState(8)
  const [page,setPage] = useState(1)

  const getCategories = useCategoryStore((state) => state.getData);
  const categories = useCategoryStore((state) => state.items);
  const isLoadingCat = useCategoryStore((state) => state.isLoading);

  const getPosts = usePostStore((state) => state.getData);
  const items = usePostStore((state) => state.items);
  const totalRecords = usePostStore((state) => state.total);

  useEffect(() => {
    getPosts(page-1, limit, '');
  }, [page, limit])
  
  useEffect(() => {
    getCategories(0, 100, '')
  }, [])


  const handleFiltersChange = (newFilters: PostFilters) => {
    setFilters(newFilters)
  }

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
        const matchesTags = post.tags.some((tag:string) => tag.toLowerCase().includes(searchTerm))
        const matchesAuthor = post?.author?.name.toLowerCase().includes(searchTerm)

        if (!matchesTitle && !matchesExcerpt && !matchesContent && !matchesTags && !matchesAuthor) {
          return false
        }
      }

      return true
    })
  }, [filters, items])
  


  if (isLoading) {
    return(
      <>
      <Skeleton className="h-25 w-full mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{ [1,2,3,4].map((index) => ( 
        <Skeleton key={index} className="h-130 w-full " /> ))}
      </div>
      </>
    )
  }
  return (
    <>
    
    {
      totalRecords > 0 ? (
        <>
          <SearchFilters categories={categories} filters={filters} onFiltersChange={handleFiltersChange} onClearFilters={clearFilters} />
          <div className='flex flex-row mb-4'>
            {filteredPosts.length > 0 &&(
              <PaginationManager
                totalItems={totalRecords}
                itemsPerPage={limit}
                currentPage={page}
                onPageChange={async (pag) => {
                  setPage(pag)
                }}
                maxVisiblePages={2}
              />
            )}
          </div>
          {filteredPosts.length == 0 && ( <div className="grid place-items-center w-full h-100">
            <TextEffect per='word' as='h3' preset='blur' className='text-4xl'>
              NO HAY RESULTADOS
            </TextEffect>
          </div>)}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>


          <div className='flex flex-row mt-4'>
            {filteredPosts.length > 0 &&(
              <PaginationManager
                totalItems={totalRecords}
                itemsPerPage={limit}
                currentPage={page}
                onPageChange={async (pag) => {
                  setPage(pag)
                }}
                maxVisiblePages={2}
              />
            )}
          </div>

          
        </>
    ) : (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.1-5.291-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>
        {/* <h3 className="text-xl font-semibold mb-2">No se encontraron artículos</h3> */}
        <p className="text-muted-foreground mb-6">
          Intenta ajustar tus filtros o términos de búsqueda para encontrar lo que buscas.
        </p>
        <button
          onClick={clearFilters}
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Ver todos los artículos
        </button>
      </div>
    )}
    </>
  )
}

