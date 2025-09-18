"use client"

import { useState, useRef, type DragEvent, type ChangeEvent } from "react"
import type { Control, FieldPath, FieldValues } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { X, Upload, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploadProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>
  name: TName
  label?: string
  maxSize?: number // en MB
  acceptedTypes?: string[]
}

export function ImageUpload<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label = "Imagen",
  maxSize = 5,
  acceptedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"],
}: ImageUploadProps<TFieldValues, TName>) {
  const [image, setImage] = useState<{ file: File; preview: string } | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    if (!acceptedTypes.includes(file.type)) {
      return { valid: false, error: "Tipo de archivo no soportado" }
    }

    if (file.size > maxSize * 1024 * 1024) {
      return { valid: false, error: `Archivo muy grande (máx. ${maxSize}MB)` }
    }

    return { valid: true }
  }

  const handleFile = (file: File, onChange: (value: File | null) => void) => {
    const { valid, error: validationError } = validateFile(file)

    if (!valid) {
      setError(validationError || "Error de validación")
      setTimeout(() => setError(""), 5000)
      return
    }

    // Limpiar imagen anterior si existe
    if (image) {
      URL.revokeObjectURL(image.preview)
    }

    const newImage = {
      file,
      preview: URL.createObjectURL(file),
    }

    setImage(newImage)
    onChange(file)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>, onChange: (value: File | null) => void) => {
    e.preventDefault()
    setIsDragOver(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0], onChange)
    }
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>, onChange: (value: File | null) => void) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0], onChange)
    }
  }

  const removeImage = (onChange: (value: File | null) => void) => {
    if (image) {
      URL.revokeObjectURL(image.preview)
    }
    setImage(null)
    onChange(null)
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</div>
              )}

              {!image && (
                <Card
                  className={cn(
                    "border-2 border-dashed transition-colors cursor-pointer",
                    isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, field.onChange)}
                  onClick={openFileDialog}
                >
                  <div className="p-8 text-center">
                    <div className="mx-auto w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Upload className="w-6 h-6 text-primary" />
                    </div>

                    <h3 className="text-lg font-semibold mb-2">Subir imagen</h3>

                    <p className="text-muted-foreground mb-4">
                      Arrastra y suelta tu imagen aquí, o haz clic para seleccionar
                    </p>

                    <Button variant="outline" type="button">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Seleccionar archivo
                    </Button>

                    <p className="text-xs text-muted-foreground mt-2">
                      Máximo {maxSize}MB. Formatos: JPG, PNG, GIF, WebP
                    </p>
                  </div>
                </Card>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept={acceptedTypes.join(",")}
                onChange={(e) => handleFileSelect(e, field.onChange)}
                className="hidden"
              />

              {image && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Imagen seleccionada</h3>

                  <Card className="relative group overflow-hidden max-w-sm">
                    <div className="aspect-square relative">
                      <img
                        src={image.preview || "/placeholder.svg"}
                        alt={image.file.name}
                        className="w-full h-full object-cover"
                      />

                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeImage(field.onChange)
                        }}
                      >
                        <X className="w-3 h-3" />
                      </Button>

                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-xs truncate font-medium">{image.file.name}</p>
                        <p className="text-xs text-gray-300">{(image.file.size / 1024 / 1024).toFixed(1)} MB</p>
                      </div>
                    </div>
                  </Card>

                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={() => {
                        console.log("Subiendo imagen:", image.file)
                      }}
                      className="flex-1"
                      type="button"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Subir imagen
                    </Button>

                    <Button variant="outline" onClick={() => removeImage(field.onChange)} type="button">
                      Cambiar imagen
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
