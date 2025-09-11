import { Card, CardHeader, CardTitle, CardContent, Button, Badge, CustomCard } from '@/components'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash2 } from "lucide-react"
import React from 'react'
import { IComment } from '../..'

interface Props {
  filteredComments:IComment[],
  handleDeleteComment: (commentId: string) => void
}

export const CommentsTable = ({filteredComments, handleDeleteComment}: Props) => {
  return (
    <CustomCard>
      <CardHeader>
        <CardTitle>Todos los Comments ({filteredComments.length})</CardTitle>
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
            {filteredComments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">{comment.content}</p>
                    {/* <p className="text-sm text-muted-foreground line-clamp-1">{comment.excerpt}</p> */}
                  </div>
                </TableCell>
                <TableCell>{comment.author.name}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteComment(comment.id)}>
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
