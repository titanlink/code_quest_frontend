"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { IComment } from "@/features"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

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
    <Card className="w-full max-w-3xl">
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
    </Card>
  )
}
