import { Card, CardHeader, CardTitle, CardContent, Button, Badge, ConfirmDelete, CustomCard } from '@/components'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react"
import React from 'react'
import { ICategory } from '../..'
import Link from 'next/link'

interface Props {
  filteredCategories:ICategory[],
  handleDeleteCategory: (categoryId: string) => void
  isPending?: boolean
  totalRecords?: number
}

export const CategoriesTable = ({filteredCategories, handleDeleteCategory, isPending = false, totalRecords}: Props) => {
  return (
    <CustomCard>
      <CardHeader>
        <CardTitle>
          <div className='grid grid-cols-2'>
            <div className='flex flex-row w-full'>Filtrados ({filteredCategories.length})</div>
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
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Posts</TableHead>
              <TableHead className="w-[70px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category,indx) => (
              <TableRow key={category.id}>
                
                <TableCell>{indx+1}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium truncate w-30">{category.name}</p>
                  </div>
                </TableCell>
                <TableCell>
                    <p className="text-sm text-muted-foreground line-clamp-1 truncate w-64">{category.description}</p>
                </TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>
                  <Badge style={{ backgroundColor: category?.color}} className="text-black/75 font-bold">
                    {category?.color}
                  </Badge>
                </TableCell>
                <TableCell>
                    {category?.postCount}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      
                      {/* <DropdownMenuItem asChild>
                        <Link href={`/categories/${category.slug}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver
                        </Link>
                      </DropdownMenuItem> */}
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/categories/${category.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <ConfirmDelete onDelete={() => handleDeleteCategory(category?.id ?? '')}>
                        <Button variant="destructive" size="sm" className='w-full flex flex-row justify-between'  disabled={isPending}>
                          <Trash2 className="h-4 w-4" />
                          Eliminar
                        </Button>
                      </ConfirmDelete>

                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {/* <pre><b>{JSON.stringify(filteredCategories, null, 2) } </b> </pre>  */}
    </CustomCard>
  )
}
