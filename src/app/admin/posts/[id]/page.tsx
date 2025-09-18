"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { PostForm, findPostAction, IPost, usePostStore } from "@/features"
import { useAuth } from "@/lib"
import { LoadingPage } from "@/components"
import NotFound from "@/app/posts/[slug]/not-found"

export default function Page() {
  const findOne = usePostStore((state) => state.findOne);
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { user, getToken } = useAuth()

  const [entity, setEntity] = useState<IPost | undefined>()
  const [loading, setLoading] = useState(true)

  const idParam = params.id
  const isNew = idParam === "new"
  const id = !isNew ? Number(idParam) : 0

  useEffect(() => {
    const fetchData = async () => {
      if (id > 0) {
        if (user){
          const token = await getToken()
          const response = await findOne(id.toString(), token ?? "")
          if (response && ("id" in response)) {
            setEntity(response)
          }
          setLoading(false)
        }
      }else{
        setLoading(false)
      }
    }

    fetchData()
  }, [id, isNew, getToken, router, user])

  if (loading) return <LoadingPage />
  if (!loading && !isNew && !entity) return <NotFound />
  

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <PostForm entity={entity} />
      </div>
    </div>
  )
}
