"use client"

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Eye, Heart, MessageCircle, } from "lucide-react"
import React from 'react'

import Link from 'next/link'
import { CustomCard } from '@/components/CustomCard'
import { Button } from '@/components/ui/button'
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip'

import { IPost } from '../../domain/entities/post.entity'
import { Badge } from '@/components/ui/badge'
import { Tooltip } from '@/components/ui/tooltip'

interface Props {
  totalRecords?:number,
  filteredPosts:IPost[],
  handleDeletePost: (postId: string) => void
}

export const PostsTable = ({filteredPosts, handleDeletePost, totalRecords}: Props) => {
  return (
    <CustomCard>
      <CardHeader>
        <CardTitle>
          <div className='grid grid-cols-2'>
            <div className='flex flex-row w-full'>Filtrados ({filteredPosts.length})</div>
            <div className='flex flex-row w-full  justify-end'> 
              {totalRecords && ( <>Total de Registros ({totalRecords}) </> )} 
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
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
            {filteredPosts.map((post, indx) => (
              <TableRow key={post.id}>
                <TableCell>{indx+1}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium truncate w-64">{post.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1 truncate w-64">{post.excerpt}</p>
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
                    <Tooltip>
                      <TooltipTrigger><Eye className="h-4 w-4" /></TooltipTrigger>
                      <TooltipContent>
                        <span>{post.totalView}</span>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger><Heart className="h-4 w-4" /></TooltipTrigger>
                      <TooltipContent>
                        <span>{post.likesCount}</span>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger><MessageCircle className="h-4 w-4" /></TooltipTrigger>
                      <TooltipContent>
                        <span>{post.commentsCount}</span>
                      </TooltipContent>
                    </Tooltip>
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
