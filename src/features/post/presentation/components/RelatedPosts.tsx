import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Heart, MessageCircle } from "lucide-react"
import { IPost } from "@/features"

interface RelatedPostsProps {
  posts: IPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Artículos relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardContent className="p-0">
              <Link href={`/posts/${post.slug}`}>
                <div className="relative aspect-video overflow-hidden">
                  {/* <Image
                    src={post.coverImage || "/placeholder.svg?height=200&width=400"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  /> */}
                  <div className="absolute top-3 left-3">
                    <Badge style={{ backgroundColor: post?.category?.color }} className="text-white text-xs">
                      {post?.category?.name}
                    </Badge>
                  </div>
                </div>
              </Link>

              <div className="p-4 space-y-3">
                <Link href={`/posts/${post.slug}`}>
                  <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{post?.createdAt?.toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      <span>{post.likesCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{post.commentsCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
