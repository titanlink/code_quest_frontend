"use client"

import { useEffect, useState } from "react"
import { UsersTable, useUserStore } from "@/features"
import { LoadingPage, SearchFilters } from "@/components"

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const getUsers = useUserStore((state) => state.getData);
  const users = useUserStore((state) => state.items);

  const page: number = useUserStore( (state) => state.page ?? 1  );
  const limit: number = useUserStore( (state) => state.limit ?? 50  );
  const isLoading = useUserStore((state) => state.isLoading);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteUser = (userId: string) => {
    // setUsers(users.filter((p) => p.id !== userId))
  }

  useEffect(() => {
      getUsers(page, limit);
  }, [page, limit, getUsers]);

  const handleToggleRole = (userId: string) => {
    // setUsers(
    //   users.map((user) => (user.id === userId ? { ...user, role: user.role === "admin" ? "user" : "admin" } : user)),
    // )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Usuarios</h1>
        <p className="text-muted-foreground">Gestiona los usuarios registrados en el blog</p>
      </div>

      { isLoading ? ( 
          <LoadingPage /> 
        ) : (
          <>
            {/* Search */}
            <SearchFilters placeholder="Buscar usuarios..." searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {/* Users Table */}
            <UsersTable filteredUsers={filteredUsers} handleToggleRole={handleToggleRole} />
          </>
        ) }
    </div>
  )
}
