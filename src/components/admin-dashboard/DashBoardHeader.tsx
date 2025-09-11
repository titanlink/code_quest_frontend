import { Button } from '@/components/ui'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { AdminFeatureHeader } from '..'

const DashBoardHeader = () => {
  return (
    <AdminFeatureHeader title="Dashboard" subTitle="Bienvenido al panel de administración" >
      <Button asChild>
        <Link href="/admin/posts/new">
          <Plus className="mr-2 h-4 w-4" />
          Nueva Post
        </Link>
      </Button>
    </AdminFeatureHeader>
  )
}

export default DashBoardHeader