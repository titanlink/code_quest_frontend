"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, Users, MessageSquare, FolderOpen,   Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Posts",
    href: "/admin/posts",
    icon: FileText,
  },
  {
    name: "Nuevo Post",
    href: "/admin/posts/new",
    icon: Plus,
  },
  {
    name: "Categorías",
    href: "/admin/categories",
    icon: FolderOpen,
  },
  {
    name: "Usuarios",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Comentarios",
    href: "/admin/comments",
    icon: MessageSquare,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r bg-muted/30 min-h-[calc(100vh-4rem)]">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Button
              key={item.name}
              variant={isActive ? "default" : "ghost"}
              className={cn("w-full justify-start", isActive && "bg-primary text-primary-foreground")}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          )
        })}
      </nav>
    </aside>
  )
}
