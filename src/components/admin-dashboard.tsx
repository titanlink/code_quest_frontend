"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Users, MessageSquare, Eye, TrendingUp, Plus } from "lucide-react"
import { mockPosts, mockUsers, mockComments } from "@/lib/mock-data"
import Link from "next/link"

export function AdminDashboard() {
  const totalPosts = mockPosts.length
  const publishedPosts = mockPosts.filter((p) => p.published).length
  const draftPosts = mockPosts.filter((p) => !p.published).length
  const totalUsers = mockUsers.length
  const totalComments = mockComments.length
  const totalViews = mockPosts.reduce((sum, post) => sum + post.viewsCount, 0)

  const recentPosts = mockPosts.slice(0, 5)
  const recentComments = mockComments.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Bienvenido al panel de administración</p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Post
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              {publishedPosts} publicados, {draftPosts} borradores
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">Usuarios registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comentarios</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComments}</div>
            <p className="text-xs text-muted-foreground">Comentarios totales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizaciones</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% este mes
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <Card>
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
        </Card>

        {/* Recent Comments */}
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
      </div>
    </div>
  )
}
