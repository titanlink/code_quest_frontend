"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  requireAdmin?: boolean
  redirectTo?: string
}

export function AuthGuard({ children, requireAdmin = false, redirectTo = "/login" }: AuthGuardProps) {
  const { user, loading, session } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo)
        return
      }

      if (requireAdmin && session?.role !== "admin") {
        router.push("/")
        return
      }
    }
  }, [user, loading, requireAdmin, redirectTo, router, session?.role])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user || (requireAdmin && session?.role !== "admin")) {
    return null
  }

  return <>{children}</>
}
