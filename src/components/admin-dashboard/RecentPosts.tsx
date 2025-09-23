
import { IPost } from '@/features/post/domain/entities/post.entity'
import {  Eye } from 'lucide-react'
import React from 'react'
import { CustomCard } from '../CustomCard'

import { CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'


interface Props {
  recentPosts: IPost[]
  isLoading?:boolean
}

const RecentPosts = ({recentPosts, isLoading}: Props) => {
  return (
    <CustomCard isLoading={isLoading} withOpacity>
      <CardHeader>
        <CardTitle>Posts Recientes</CardTitle>
        <CardDescription>Los últimos artículos publicados</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentPosts.map((post) => (
          <div key={post.id} className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{post.title}</p>
              <div className="flex items-center gap-2">
                <Badge variant={post.published ? "default" : "secondary"}>
                  {post.published ? "Publicado" : "Borrador"}
                </Badge>
                <span className="text-xs text-muted-foreground">{post?.createdAt?.toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>{post.totalView}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </CustomCard>
  )
}

export default RecentPosts