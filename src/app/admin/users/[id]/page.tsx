"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {  IUser, useUserStore } from "@/features"
import { useAuth } from "@/lib"
import { LoadingPage } from "@/components"

export default function Page() {
  const findOne = useUserStore((state) => state.findOne);
  const isLoading = useUserStore((state) => state.isLoading);
  const selected = useUserStore((state) => state.selected);
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { user, getToken } = useAuth()

  const [entity, setEntity] = useState<IUser | undefined>()
  // const [loading, setLoading] = useState(true)

  const idParam = params.id
  const isNew = idParam === "new"
  const id = !isNew ? Number(idParam) : 0
  console.log("🚀 ~ Page ~ id:", id)

  useEffect(() => {
    const fetchData = async () => {
      if ((id === 0 && !isNew) || isNaN(id)) {
        router.replace("/404") // equivalente a notFound()
        return
      }

      if (id > 0) {
        if (user){
          const token = await getToken()
          const response = await findOne(id.toString(), token ?? "")
          if (!response || !("id" in response)) {
              router.replace("/404")
          } else {
              setEntity(response)
          }
        }
      }
    }

    fetchData()
  }, [id, isNew, getToken, router, user])

  if (isLoading) return <LoadingPage />
  

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <pre><b>{JSON.stringify(selected, null, 2) } </b> </pre>
        {/* <UserForm entity={selected} /> */}
      </div>
    </div>
  )
}
