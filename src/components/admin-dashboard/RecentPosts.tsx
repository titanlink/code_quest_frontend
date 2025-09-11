import { CustomCard, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '@/components'
import { IPost } from '@/features'
import { Eye, Link } from 'lucide-react'
import React from 'react'


interface Props {
  recentPosts: IPost[]
}

const RecentPosts = ({recentPosts}: Props) => {
  return (
    <CustomCard>
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
                <span className="text-xs text-muted-foreground">{post.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>{post.viewsCount}</span>
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full bg-transparent" asChild>
          <Link href="/admin/posts">Ver todos los posts</Link>
        </Button>
      </CardContent>
    </CustomCard>
  )
}

export default RecentPosts