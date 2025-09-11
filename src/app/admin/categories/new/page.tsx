"use client"

import type React from "react"
import { Button } from "@/components/ui/button"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"
// import { Badge } from "@/components/ui/badge"
// import { mockCategories } from "@/lib/mock-data"
import { ArrowLeft, Save, Eye, X } from "lucide-react"
import Link from "next/link"
import { CategoryForm } from "@/features"
import { Badge, CardContent, CardHeader, CardTitle, CustomCard } from "@/components"

export default function NewPostPage() {
  // const router = useRouter()
  // const [formData, setFormData] = useState({
  //   title: "",
  //   slug: "",
  //   excerpt: "",
  //   content: "",
  //   categoryId: "",
  //   coverImage: "",
  //   tags: [] as string[],
  //   published: false,
  //   featured: false,
  // })
  // const [newTag, setNewTag] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally save to database
    // console.log("Saving post:", formData)
    // router.push("/admin/posts")
  }

  // const generateSlug = (title: string) => {
  //   return title
  //     .toLowerCase()
  //     .replace(/[^a-z0-9\s-]/g, "")
  //     .replace(/\s+/g, "-")
  //     .trim()
  // }

  // const handleTitleChange = (title: string) => {
  //   setFormData({
  //     ...formData,
  //     title,
  //     slug: generateSlug(title),
  //   })
  // }

  // const addTag = () => {
  //   if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
  //     setFormData({
  //       ...formData,
  //       tags: [...formData.tags, newTag.trim()],
  //     })
  //     setNewTag("")
  //   }
  // }

  // const removeTag = (tagToRemove: string) => {
  //   setFormData({
  //     ...formData,
  //     tags: formData.tags.filter((tag) => tag !== tagToRemove),
  //   })
  // }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/admin/posts">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Nueva Categoria</h1>
            <p className="text-muted-foreground">Crea una nueva categoria para los blogs</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Vista previa
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" />
            Guardar
          </Button>
        </div>
      </div>
      <div  className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryForm />
        <CustomCard>
           <CardHeader>
            <CardTitle>Todas las categorias</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <Badge style={{ backgroundColor: post.category.color }} className="text-white">
              {post.category.name}
            </Badge> */}
          </CardContent>
        </CustomCard>
      </div>
      {/* <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contenido Principal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Título del artículo"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="url-del-articulo"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Extracto</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Breve descripción del artículo"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Contenido</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Escribe el contenido del artículo en Markdown..."
                  rows={15}
                  className="font-mono"
                  required
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="published">Publicar</Label>
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Destacado</Label>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={formData.categoryId}
                onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {mockCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Imagen de Portada</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="URL de la imagen"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Agregar tag"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} size="sm">
                  Agregar
                </Button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </form> */}
    </div>
  )
}
