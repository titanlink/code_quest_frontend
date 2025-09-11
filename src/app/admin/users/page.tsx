"use client"

import { useState } from "react"
import { mockUsers } from "@/lib/mock-data"
import { UsersTable } from "@/features"
import { SearchFilters } from "@/components"

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState(mockUsers)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleToggleRole = (userId: string) => {
    setUsers(
      users.map((user) => (user.id === userId ? { ...user, role: user.role === "admin" ? "user" : "admin" } : user)),
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Usuarios</h1>
        <p className="text-muted-foreground">Gestiona los usuarios registrados en el blog</p>
      </div>

      {/* Search */}
      <SearchFilters placeholder="Buscar usuarios..." searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Users Table */}
      <UsersTable filteredUsers={filteredUsers} handleToggleRole={handleToggleRole} />
    </div>
  )
}
