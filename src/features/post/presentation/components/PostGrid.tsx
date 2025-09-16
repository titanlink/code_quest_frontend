import React from 'react'
import { IPost } from '../..'
import { PostCard, Skeleton } from '@/components'

interface Props {
  filteredPosts:IPost[],
  isLoading?:boolean,
  clearFilters: () => void
}
export const PostGrid = ({filteredPosts, clearFilters, isLoading}:Props) => {

  if (isLoading) {
    return( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{ [1,2,3].map((index) => ( 
      <Skeleton key={index} className="h-130 w-full " /> ))}
    </div>
    )
  }

  return (
    <>
    {
      filteredPosts.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
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
        <h3 className="text-xl font-semibold mb-2">No se encontraron artículos</h3>
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

