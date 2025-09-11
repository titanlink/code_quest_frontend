"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { MessageCircle, Reply, Heart, MoreHorizontal, Flag } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-context"
import { mockComments } from "@/lib/mock-data"
import type { Comment } from "@/lib/types"

interface EnhancedCommentsSectionProps {
  postId: string
}

export function EnhancedCommentsSection({ postId }: EnhancedCommentsSectionProps) {
  const { user } = useAuth()
  const [newComment, setNewComment] = useState("")
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [comments, setComments] = useState(mockComments.filter((c) => c.postId === postId))
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set())

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment,
      postId,
      authorId: user.id,
      author: user,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  const handleSubmitReply = (e: React.FormEvent, parentId: string) => {
    e.preventDefault()
    if (!user || !replyContent.trim()) return

    const reply: Comment = {
      id: Date.now().toString(),
      content: replyContent,
      postId,
      authorId: user.id,
      author: user,
      parentId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setComments([reply, ...comments])
    setReplyContent("")
    setReplyTo(null)
  }

  const handleLikeComment = (commentId: string) => {
    if (!user) return

    const newLikedComments = new Set(likedComments)
    if (likedComments.has(commentId)) {
      newLikedComments.delete(commentId)
    } else {
      newLikedComments.add(commentId)
    }
    setLikedComments(newLikedComments)
  }

  const topLevelComments = comments.filter((c) => !c.parentId)
  const getReplies = (commentId: string) => comments.filter((c) => c.parentId === commentId)

  return (
    <section className="mt-16 pt-16 border-t">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-5 w-5" />
        <h2 className="text-2xl font-bold">Comentarios ({comments.length})</h2>
      </div>

      {/* Comment Form */}
      {user ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Agregar comentario</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Escribe tu comentario..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={!newComment.trim()}>
                  Publicar comentario
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-8 bg-muted/30">
          <CardContent className="pt-6">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Únete a la conversación</h3>
              <p className="text-muted-foreground mb-4">Inicia sesión para comentar y participar en la discusión.</p>
              <div className="flex gap-2 justify-center">
                <Button asChild>
                  <a href="/login">Iniciar Sesión</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/register">Registrarse</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {topLevelComments.length > 0 ? (
          topLevelComments.map((comment) => {
            const replies = getReplies(comment.id)
            const isLiked = likedComments.has(comment.id)

            return (
              <div key={comment.id} className="space-y-4">
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{comment.author.name}</span>
                        <span className="text-sm text-muted-foreground">{comment.createdAt.toLocaleDateString()}</span>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Flag className="mr-2 h-4 w-4" />
                            Reportar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <p className="text-sm leading-relaxed">{comment.content}</p>

                    <div className="flex items-center gap-4 text-sm">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-auto p-0 ${isLiked ? "text-red-500" : "text-muted-foreground"} hover:text-red-500`}
                        onClick={() => handleLikeComment(comment.id)}
                      >
                        <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
                        Me gusta
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                      >
                        <Reply className="h-4 w-4 mr-1" />
                        Responder
                      </Button>
                    </div>

                    {/* Reply Form */}
                    {replyTo === comment.id && user && (
                      <form onSubmit={(e) => handleSubmitReply(e, comment.id)} className="mt-4 space-y-3">
                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <Textarea
                              placeholder={`Responder a ${comment.author.name}...`}
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              className="min-h-[80px]"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button type="button" variant="outline" size="sm" onClick={() => setReplyTo(null)}>
                            Cancelar
                          </Button>
                          <Button type="submit" size="sm" disabled={!replyContent.trim()}>
                            Responder
                          </Button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>

                {/* Replies */}
                {replies.length > 0 && (
                  <div className="ml-14 space-y-4 border-l-2 border-muted pl-4">
                    {replies.map((reply) => {
                      const isReplyLiked = likedComments.has(reply.id)

                      return (
                        <div key={reply.id} className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={reply.author.avatar || "/placeholder.svg"} alt={reply.author.name} />
                            <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{reply.author.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {reply.createdAt.toLocaleDateString()}
                              </span>
                            </div>

                            <p className="text-sm leading-relaxed">{reply.content}</p>

                            <div className="flex items-center gap-4 text-xs">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`h-auto p-0 ${isReplyLiked ? "text-red-500" : "text-muted-foreground"} hover:text-red-500`}
                                onClick={() => handleLikeComment(reply.id)}
                              >
                                <Heart className={`h-3 w-3 mr-1 ${isReplyLiked ? "fill-current" : ""}`} />
                                Me gusta
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {comment.id !== topLevelComments[topLevelComments.length - 1].id && <Separator />}
              </div>
            )
          })
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No hay comentarios aún</h3>
            <p className="text-muted-foreground">Sé el primero en comentar este artículo.</p>
          </div>
        )}
      </div>
    </section>
  )
}
