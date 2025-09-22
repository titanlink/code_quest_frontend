"use client"

import { useState } from "react"
import { Control, FieldValues, Path } from "react-hook-form"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface Props<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
}

export function CustomFormFile<T extends FieldValues>({
  control,
  name,
  label = "Subir imagen",
}: Props<T>) {
  const [preview, setPreview] = useState<string | null>(null)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label} - {name}</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept="*/*"
              onChange={(e) => {
                field.onChange(e.target.files)
                const file = e.target.files?.[0]
                if (file) {
                  setPreview(URL.createObjectURL(file))
                }
              }}
            />
          </FormControl>
          {preview && (
            <Image
              width={500}
              height={500}
              src={preview}
              alt="Vista previa"
              className="mt-2 w-32 h-32 object-cover rounded-md border"
            />
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
