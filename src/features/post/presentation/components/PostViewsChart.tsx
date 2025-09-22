"use client"


import { CustomCard } from "@/components/CustomCard"
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { IPost } from "../../domain/entities/post.entity"

interface Props {
  posts: IPost[]
}

export function PostViewsChart({ posts }: Props) {
  const data = posts.map((post) => ({
    date: post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "N/A",
    views: post.totalView ?? 0,
  }))

  return (
    <CustomCard className="w-full max-w-4xl" withGlowEffect={true} withOpacity>
      <CardHeader>
        <CardTitle>Vistas de Posts en el Tiempo</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="views" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </CustomCard>
  )
}
