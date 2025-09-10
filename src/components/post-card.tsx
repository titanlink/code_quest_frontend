import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Heart, MessageCircle, Eye } from "lucide-react"
import type { Post } from "@/lib/types"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="p-0">
        <Link href={`/posts/${post.slug}`}>
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={post.coverImage || "/placeholder.svg?height=200&width=400"}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4">
              <Badge style={{ backgroundColor: post.category.color }} className="text-white">
                {post.category.name}
              </Badge>
            </div>
          </div>
        </Link>
      </CardHeader>

      <CardContent className="p-6">
        <Link href={`/posts/${post.slug}`}>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span>{post.likesCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>{post.commentsCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{post.viewsCount}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 border-t bg-muted/30">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{post.author.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{post.createdAt.toLocaleDateString()}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
