import { Card, CardHeader, CardTitle, CardContent, Button, Badge, CustomCard } from '@/components'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import React from 'react'
import { IPost } from '../..'
import Link from 'next/link'

interface Props {
  filteredPosts:IPost[],
  handleDeletePost: (postId: string) => void
}

export const PostsTable = ({filteredPosts, handleDeletePost}: Props) => {
  return (
    <CustomCard>
      <CardHeader>
        <CardTitle>Todos los Posts ({filteredPosts.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estadísticas</TableHead>
              <TableHead className="w-[70px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                  </div>
                </TableCell>
                <TableCell>{post?.author?.name}</TableCell>
                <TableCell>
                  <Badge style={{ backgroundColor: post?.category?.color }} className="text-white">
                    {post?.category?.name}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? "Publicado" : "Borrador"}
                    </Badge>
                    {post.featured && <Badge className="bg-primary">Destacado</Badge>}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{post?.createdAt?.toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{post.viewsCount} vistas</span>
                    <span>{post.likesCount} likes</span>
                    <span>{post.commentsCount} comentarios</span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/posts/${post.slug}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/posts/${post.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeletePost(post?.id ?? '')}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </CustomCard>
  )
}
