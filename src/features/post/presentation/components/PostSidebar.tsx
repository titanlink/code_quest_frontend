"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, LinkIcon, Twitter, Github } from "lucide-react"
import type { Post } from "@/lib/types"

interface PostSidebarProps {
  post: Post
}

export function PostSidebar({ post }: PostSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Author Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sobre el autor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-16 w-16">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback className="text-lg">{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{post.author.name}</h3>
              <p className="text-sm text-muted-foreground">
                {post.author.role === "admin" ? "Administrador" : "Colaborador"}
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Desarrollador apasionado por las tecnologías web modernas y el diseño de experiencias de usuario
            excepcionales.
          </p>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Miembro desde {post.author.createdAt.getFullYear()}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>España</span>
            </div>
          </div>

          <Separator />

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <Twitter className="h-4 w-4 mr-2" />
              Seguir
            </Button>
            <Button variant="outline" size="sm">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <LinkIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table of Contents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contenido</CardTitle>
        </CardHeader>
        <CardContent>
          <nav className="space-y-2">
            <a
              href="#introduccion"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Introducción
            </a>
            <a
              href="#caracteristicas"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Nuevas características
            </a>
            <a
              href="#instalacion"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Instalación
            </a>
            <a
              href="#conclusion"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Conclusión
            </a>
          </nav>
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card className="bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg">Mantente actualizado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Recibe los últimos artículos y tutoriales directamente en tu email.
          </p>
          <div className="space-y-2">
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background"
            />
            <Button size="sm" className="w-full">
              Suscribirse
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
