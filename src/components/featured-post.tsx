import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Heart, MessageCircle, Eye, Star } from "lucide-react"
import type { Post } from "@/lib/types"

interface FeaturedPostProps {
  post: Post
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-primary/20">
      <CardContent className="p-0">
        <Link href={`/posts/${post.slug}`}>
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={post.coverImage || "/placeholder.svg?height=300&width=600"}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className="bg-primary text-primary-foreground">
                <Star className="h-3 w-3 mr-1" />
                Destacado
              </Badge>
              <Badge style={{ backgroundColor: post.category.color }} className="text-white">
                {post.category.name}
              </Badge>
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-foreground transition-colors">
                {post.title}
              </h3>
              <p className="text-white/90 text-sm mb-4 line-clamp-2">{post.excerpt}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 border-2 border-white/20">
                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{post.author.name}</p>
                    <div className="flex items-center gap-1 text-xs text-white/70">
                      <Calendar className="h-3 w-3" />
                      <span>{post.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-white/80">
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
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
