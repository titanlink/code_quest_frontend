"use client"


import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { IComment } from "../../domain/entities/comment.entity"
import { CustomCard } from "@/components/CustomCard"
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface CommentsOverTimeProps {
  comments: IComment[]
}

export function CommentsOverTimeChart({ comments }: CommentsOverTimeProps) {
  const groupedByDay = comments.reduce((acc, c) => {
    if (!c.createdAt) return acc
    const day = new Date(c.createdAt).toLocaleDateString()
    acc[day] = (acc[day] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)

  const data = Object.entries(groupedByDay).map(([date, count]) => ({
    date,
    comments: count,
  }))

  return (
    <CustomCard className="w-full max-w-3xl" withGlowEffect withOpacity>
      <CardHeader>
        <CardTitle>Comentarios en el Tiempo</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="comments" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </CustomCard>
  )
}
