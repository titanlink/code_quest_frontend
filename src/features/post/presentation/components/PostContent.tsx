"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Heart, MessageCircle, Eye, Calendar, Clock, ArrowLeft, Bookmark } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
// import { SocialShare } from "@/components/social-share"
import type { Post } from "@/lib/types"

interface PostContentProps {
  post: Post
}

export function PostContent({ post }: PostContentProps) {
  const { user } = useAuth()
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likesCount)

  const handleLike = () => {
    if (!user) {
      // Redirect to login or show login modal
      return
    }

    setIsLiked(!isLiked)
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
  }

  const handleBookmark = () => {
    if (!user) {
      return
    }

    setIsBookmarked(!isBookmarked)
  }

  const estimatedReadTime = Math.ceil(post.content.split(" ").length / 200) // 200 words per minute

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/posts" className="hover:text-foreground transition-colors">
          Artículos
        </Link>
        <span>/</span>
        <Link href={`/posts?category=${post.category.slug}`} className="hover:text-foreground transition-colors">
          {post.category.name}
        </Link>
        <span>/</span>
        <span className="text-foreground">{post.title}</span>
      </nav>

      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/posts">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a artículos
        </Link>
      </Button>

      {/* Header */}
      <header className="space-y-6">
        <div className="flex flex-wrap gap-2">
          <Badge style={{ backgroundColor: post.category.color }} className="text-white">
            {post.category.name}
          </Badge>
          {post.featured && <Badge className="bg-primary text-primary-foreground">Destacado</Badge>}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-balance leading-tight">{post.title}</h1>

        <p className="text-xl text-muted-foreground text-pretty">{post.excerpt}</p>

        {/* Author and Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{post.createdAt.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{estimatedReadTime} min de lectura</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{post.viewsCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{post.commentsCount}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={isLiked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className="flex items-center gap-2"
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                <span>{likesCount}</span>
              </Button>

              <Button
                variant={isBookmarked ? "default" : "outline"}
                size="sm"
                onClick={handleBookmark}
                className="flex items-center gap-2"
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
              </Button>

              {/* <SocialShare title={post.title} url={`/posts/${post.slug}`} description={post.excerpt} /> */}
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        </div>
      )}

      <Separator />

      {/* Content */}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }} />
      </div>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="pt-8 border-t">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
