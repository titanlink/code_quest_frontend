"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Heart, MessageCircle, Calendar, Clock, ArrowLeft, Bookmark, Eye } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { createBookMarkAction, createLikePostAction, deleteBookMarkAction, deleteLikeAction, IBookMark, ILike, IPost } from "@/features"
import { getImageUrl } from "@/lib"
import { motion } from "motion/react"
import { Pointer } from "@/components/ui/pointer"
import { RainbowButton } from "@/components"
// import { SocialShare } from "@/components/social-share"

interface Props {
  post: IPost
}

export function PostContent({ post }: Props) {
  const { user, getToken } = useAuth()
  const [src, setSrc] = useState("/no_image_available.jpg")
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [isBookMarked, setIsBookMarked] = useState(post.isBookMarked)
  // const [post, setPost] = useState(entity)
  const [likesCount, setLikesCount] = useState(post.likesCount ?? 0)
  const [likes, setLikes] = useState<ILike[]>(post.likes ?? []) 
  const [bookmarks, setBookMarks] = useState<IBookMark[]>(post.bookmarks ?? []) 

  const [token, setToken] = useState<string | null>(null)
  
  
    
  useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        const authToken = await getToken() ?? ''
        setToken(authToken)
        setIsBookMarked(post.isBookMarked)
        setIsLiked(post.isLiked)
      }
    }
    fetchToken()
  }, [user, token, post])

  const handleLike = async () => {
    if (!user) {
      // Redirect to login or show login modal
      return
    }

    let resp;
    if (isLiked){ 
      const liked = likes.find((p) => p.user?.email === user?.email)
      resp = await deleteLikeAction(liked?.id ?? '', token ?? '') 
    }
    
    if (!isLiked){ 
      const liked = {post: post}
      resp = await createLikePostAction(liked, token ?? '')
      if ('id' in resp) setLikes([resp, ...likes])
    
    }
    if (!resp) return
    if (('error' in resp) && resp['error']) return

    setIsLiked(!isLiked)    
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
  }

  const handleBookmark = async () => {
    if (!user) {
      return
    }

    let resp;
    if (isBookMarked){ 
      const marked = bookmarks.find((p) => p.user?.email === user?.email)
      resp = await deleteBookMarkAction(marked?.id ?? '', token ?? '') 
    }
    
    if (!isBookMarked){ 
      const marked = {post: post}
      resp = await createBookMarkAction(marked, token ?? '')
      if ('id' in resp) setBookMarks([resp, ...bookmarks])
    
    }
    if (!resp) return
    if (('error' in resp) && resp['error']) return

    setIsBookMarked(!isBookMarked)    
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
        <Link href={`/posts?category=${post?.category?.slug}`} className="hover:text-foreground transition-colors">
          {post?.category?.name}
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
          <Badge style={{ backgroundColor: post?.category?.color }} className="text-white">
            {post?.category?.name}
          </Badge>
          {post.featured && <Badge className="bg-primary text-primary-foreground">Destacado</Badge>}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-balance leading-tight">{post.title}</h1>

        <p className="text-xl text-muted-foreground text-pretty">{post.excerpt}</p>

        {/* Author and Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post?.author?.avatar || "/placeholder.svg"} alt={post?.author?.name} />
              <AvatarFallback>{post?.author?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post?.author?.name}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{post?.createdAt?.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{estimatedReadTime} min de lectura</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Actions */}
          <div className="flex setIsBookMarkeditems-center gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{post.totalView}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{post.commentsCount}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              
              <RainbowButton
                variant={isLiked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className="flex items-center gap-2"
              >
              { !isLiked && ( <Pointer>
                  <motion.div
                    animate={{
                      scale: [0.8, 2, 0.8],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: !isLiked ? Infinity : 1,
                      ease: "easeInOut",
                    }}
                  >
                  <Heart className={`h-4 w-4 text-pink-600 fill-current`} />
                  </motion.div>
                </Pointer>)}
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                <span>{likesCount}</span>
              </RainbowButton>
              <Button
                variant={isBookMarked ? "default" : "outline"}
                size="sm"
                onClick={handleBookmark}
                className="flex items-center gap-2"
              >
                <Bookmark className={`h-4 w-4 ${isBookMarked ? "fill-current" : ""}`} />
              </Button>

              {/* <SocialShare title={post.title} url={`/posts/${post.slug}`} description={post.excerpt} /> */}
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative aspect-video overflow-hidden rounded-lg">
          {/* <Image src={getImageUrl(post?.coverImage)|| "/no_image_available.jpg"} alt={post.title} fill className="object-cover" priority /> */}
          <Image
            fill className="object-cover" priority
            src={getImageUrl(post?.coverImage)}
            alt={post.title}
            onError={() => {
              console.warn("⚠️ Imagen no encontrada:", src)
              setSrc("/fallback.png") // cambiamos a imagen de respaldo
            }}
          />
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
