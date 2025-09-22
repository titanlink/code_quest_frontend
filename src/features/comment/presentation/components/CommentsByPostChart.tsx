"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { IComment } from "../../domain/entities/comment.entity"

interface CommentsByPostProps {
  comments: IComment[]
}

export function CommentsByPostChart({ comments }: CommentsByPostProps) {
  const grouped = comments.reduce((acc, c) => {
<<<<<<< HEAD
    acc[c?.postId??""] = (acc[c?.postId??""] ?? 0) + 1
=======
    acc[String(c.postId)] = (acc[String(c.postId)] ?? 0) + 1
>>>>>>> main
    return acc
  }, {} as Record<string, number>)

  const data = Object.entries(grouped).map(([postId, count]) => ({
    postId,
    comments: count,
  }))

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Comentarios por Post</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="postId" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="comments" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
