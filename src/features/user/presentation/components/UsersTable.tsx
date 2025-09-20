import { Card, CardHeader, CardTitle, CardContent, Button, Badge, CustomCard } from '@/components'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Shield, UserCheck, UserX } from 'lucide-react'
import React from 'react'
import { IUser } from '../..'

interface Props {
  filteredUsers: IUser[],
  handleToggleRole: (user: IUser) => void
  totalRecords?:number
}

export const UsersTable = ({filteredUsers, handleToggleRole, totalRecords}: Props) => {
  return (
    <CustomCard>
      <CardHeader>
        <CardTitle>
          <div className='grid grid-cols-2'>
            <div className='flex flex-row w-full'>Filtrados ({filteredUsers.length})</div>
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
              <TableHead>Usuario</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Registro</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[70px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user,indx) => (
              <TableRow key={user.id}>
                <TableCell>{indx+1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      {user.discordId && <p className="text-sm text-muted-foreground">Discord: {user.discordId}</p>}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                    {user.role === "admin" ? "Administrador" : "Usuario"}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{user?.createdAt?.toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Activo
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleToggleRole(user)}>
                        <Shield className="mr-2 h-4 w-4" />
                        {user.role === "admin" ? "Quitar admin" : "Hacer admin"}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserCheck className="mr-2 h-4 w-4" />
                        Ver perfil
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem className="text-destructive">
                        <UserX className="mr-2 h-4 w-4" />
                        Suspender
                      </DropdownMenuItem> */}
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
