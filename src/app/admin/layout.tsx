import type React from "react"

import { AuthGuard } from "@/components/auth-guard"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <AuthGuard requireAdmin>
        <div className="min-h-screen bg-background">
          <AdminHeader />
          <div className="flex">
            <AdminSidebar />

            <main className="flex-1 p-6 bg-gradient-to-b from-sky-800/10 to-mured/10">{children}</main>
          </div>
        </div>
      </AuthGuard>
  )
}
