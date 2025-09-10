import { Button } from '@/components/ui'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const DashBoardHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Bienvenido al panel de administración</p>
      </div>
      <Button asChild>
        <Link href="/admin/posts/new">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Post
        </Link>
      </Button>
    </div>
  )
}

export default DashBoardHeader