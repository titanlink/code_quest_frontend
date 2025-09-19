"use client"

import { CustomCard, CardHeader, CardTitle, CardContent } from "@/components"
import { IUser } from "@/features"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface UserGrowthChartProps {
  users: IUser[]
}

export function UserGrowthChart({ users }: UserGrowthChartProps) {
  const groupedByMonth = users.reduce((acc, user) => {
    if (!user.createdAt) return acc
    const month = new Date(user.createdAt).toLocaleString("default", {
      month: "short",
      year: "numeric",
    })
    acc[month] = (acc[month] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)

  const data = Object.entries(groupedByMonth).map(([month, count]) => ({
    month,
    count,
  }))

  return (
    <CustomCard className="w-full max-w-3xl" withGlowEffect={true}>
      <CardHeader>
        <CardTitle>Crecimiento de Usuarios</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </CustomCard>
  )
}
