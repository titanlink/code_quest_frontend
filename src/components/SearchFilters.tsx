import { Card, CardContent, CardHeader, CardTitle, Input } from '@/components'
import { Search } from 'lucide-react'
import React, { SetStateAction } from 'react'

interface Props {
  placeholder: string
  searchTerm: string
  setSearchTerm: (value: SetStateAction<string>) => void
}
export const SearchFilters = ({placeholder, searchTerm, setSearchTerm}:Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
