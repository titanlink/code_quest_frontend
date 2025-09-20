"use client"

import { useEffect, useState } from "react"
import { IUser, UserGrowthChart, UserRoleChart, UsersTable, useUserStore } from "@/features"
import { AdminFeatureHeader, LoadingPage, PaginationManager, ResizableHandle, ResizablePanel, ResizablePanelGroup, SearchFilters } from "@/components"
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
  const [page,setPage] = useState(1)

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
        getUsers(page-1, limit, authToken );
      }
    }
    fetchToken()
  }, [user, token, page])

  const handleToggleRole = async (user: IUser) => {
    if (token) {  await changeRole(user, token); return }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminFeatureHeader title="Usuarios" subTitle="Gestiona los usuarios" ></AdminFeatureHeader>
      

      { isLoading ? ( 
          <LoadingPage /> 
        ) : (
          <ResizablePanelGroup direction="horizontal" className=" gap-4">
            <ResizablePanel defaultSize={70}>
              <div className="flex flex-col gap-4 w-full">
                <SearchFilters placeholder="Buscar usuarios..." searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                <div className='flex flex-row'>
                <PaginationManager
                  totalItems={totalRecords}
                  itemsPerPage={limit}
                  currentPage={page}
                  onPageChange={async (pag) => {
                    if (page == pag) return
                    setPage(pag)
                  }}
                  maxVisiblePages={2}
                />
              </div>

                <UsersTable filteredUsers={filteredUsers} handleToggleRole={handleToggleRole}  totalRecords={totalRecords}/>
              </div>
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel>
              <div className="flex flex-col gap-4 w-full">
                <UserRoleChart users={users}/>
                <UserGrowthChart users={users}/>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        ) }
    </div>
  )
}
