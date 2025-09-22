"use client"

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { IUser } from "../../domain/entities/user.entity"
import { CustomCard } from "@/components/CustomCard"
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface UserRoleChartProps {
  users: IUser[]
}

export function UserRoleChart({ users }: UserRoleChartProps) {
  const rolesCount = users.reduce(
    (acc, user) => {
      acc[user.role] = (acc[user.role] ?? 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const data = Object.entries(rolesCount).map(([role, count]) => ({
    name: role,
    value: count,
  }))

  const COLORS = ["#0088FE", "#FF8042"]

  return (
    <CustomCard className="w-full" withGlowEffect withBlur withOpacity>
      <CardHeader>
        <CardTitle>Distribución de Roles</CardTitle>
      </CardHeader>
      <CardContent className="h-70">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </CustomCard>
  )
}
