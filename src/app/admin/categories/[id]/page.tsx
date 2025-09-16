"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { CategoryForm, findCategoryAction, ICategory } from "@/features"
import { useAuth } from "@/lib"

export default function Page() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { user, getToken } = useAuth()

  const [entity, setEntity] = useState<ICategory | undefined>()
  const [loading, setLoading] = useState(true)

  const idParam = params.id
  const isNew = idParam === "new"
  const id = !isNew ? Number(idParam) : 0

  useEffect(() => {
    const fetchData = async () => {
      if ((id === 0 && !isNew) || isNaN(id)) {
        router.replace("/404") // equivalente a notFound()
        return
      }

      if (id > 0) {
        if (user){
          const token = await getToken()
          const response = await findCategoryAction(id.toString(), token ?? "")
          console.log("🚀 ~ fetchData ~ response:", response)
          if (!response || !("id" in response)) {
              router.replace("/404")
          } else {
              setEntity(response)
          }
        }
      }
      setLoading(false)
    }

    fetchData()
  }, [id, isNew, getToken, router, user])

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <CategoryForm entity={entity} />
      </div>
    </div>
  )
}
