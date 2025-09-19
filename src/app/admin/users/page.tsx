"use client"

import { useEffect, useState } from "react"
import { IUser, UsersTable, useUserStore } from "@/features"
import { AdminFeatureHeader, LoadingPage, PaginationManager, SearchFilters } from "@/components"
import { useAuth } from "@/lib"
import { toast } from "sonner"

export default function AdminUsersPage() {
  const { user, getToken } = useAuth()
  const [token, setToken] = useState<string>('')

  const [searchTerm, setSearchTerm] = useState("")
  const getUsers = useUserStore((state) => state.getData);
  const changeRole = useUserStore((state) => state.changeRole);
  const users = useUserStore((state) => state.items);

  const [limit,setLimit] = useState(10)
  const [page,setPage] = useState(0)

  // const page: number = useUserStore( (state) => state.page ?? 0  );
  // const limit: number = useUserStore( (state) => state.limit ?? 50  );
  const isLoading = useUserStore((state) => state.isLoading);
  const totalRecords = useUserStore((state) => state.total);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteUser = (userId: string) => {
    // setUsers(users.filter((p) => p.id !== userId))
  }

  useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        const authToken = await getToken() ?? ''
        setToken(authToken)
        getUsers(page, limit, authToken );
      }
    }
    fetchToken()
  }, [user, getToken])

  const handleToggleRole = async (user: IUser) => {
    if (token) {  await changeRole(user, token); return }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminFeatureHeader title="Usuarios" subTitle="Gestiona los usuarios registrados en el blog" ></AdminFeatureHeader>
      

      { isLoading ? ( 
          <LoadingPage /> 
        ) : (
          <>
            {/* Search */}
            <SearchFilters placeholder="Buscar usuarios..." searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className='flex flex-row mb-4'>
              <PaginationManager
                totalItems={totalRecords}
                itemsPerPage={limit}
                currentPage={!page ? 1 : page}
                onPageChange={async (pag) => {
                  if (page == pag) return
                  setPage(pag)
                  await getUsers(pag-1, limit, token);
                }}
                maxVisiblePages={1}
              />
            </div>

            {/* Users Table */}
            <UsersTable filteredUsers={filteredUsers} handleToggleRole={handleToggleRole} />
          </>
        ) }
    </div>
  )
}
