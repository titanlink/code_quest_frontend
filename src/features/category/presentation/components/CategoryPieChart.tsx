"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

import { ICategory } from "../.."
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { CustomCard } from "@/components";

interface CategoryPieProps {
  categories: ICategory[]
}

export function CategoryPieChart({ categories }: CategoryPieProps) {
  const data = categories.map((cat) => ({
    name: cat.name,
    value: cat.postCount ?? 0,
    color: cat.color ?? "#8884d8", // usa el color si está definido
  }))

  return (
    <CustomCard className="w-full " withGlowEffect={true}>
      <CardHeader>
        <CardTitle>Categorías por Posts</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
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
