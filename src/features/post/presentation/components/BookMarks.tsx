import { Button, PostCard } from '@/components'
import { IBookMark } from '@/features'
import { Bookmark } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface Props {
  bookMarks: IBookMark[]
}

const BookMarks = ({bookMarks}:Props) => {
  return (
    <div id="bookMarks" className="px-4 ">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center  mb-8">
          <Bookmark className="text-muted-foreground"/> <h2 className="px-2 text-xl font-bold">Guardados</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {  bookMarks.slice(0,3).map((bookMark, indx) => ( 

            <PostCard key={indx} post={bookMark?.post}/> 
          ))}
          
        </div>
      </div>
    </div>
  )
}

export default BookMarks