import { Avatar, AvatarFallback, AvatarImage, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { IPost } from '@/features'
import { Link } from 'lucide-react'
import React from 'react'

interface Props {
  recentComments: IPost[]
}
const RecentComments = ({recentComments}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comentarios Recientes</CardTitle>
        <CardDescription>Los últimos comentarios de usuarios</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentComments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
              <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{comment.author.name}</p>
                <span className="text-xs text-muted-foreground">{comment.createdAt.toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{comment.content}</p>
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full bg-transparent" asChild>
          <Link href="/admin/comments">Ver todos los comentarios</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default RecentComments