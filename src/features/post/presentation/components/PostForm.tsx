import { Badge, Button, CardContent, CardHeader, CardTitle, CustomCard, Input, Label } from '@/components'
import { Textarea } from '@/components/ui/textarea'
import { mockCategories } from '@/lib'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select'
import { Switch } from '@radix-ui/react-switch'
import { X } from 'lucide-react'
import React from 'react'
import { IPost } from '../..'

interface formData {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    categoryId: string;
    coverImage: string;
    tags: string[];
    published: boolean;
    featured: boolean;
}


interface Props {
  formData: formData
  handleSubmit: (e: React.FormEvent<Element>) => void
  handleTitleChange: (title: string) => void,
  setFormData: (value: React.SetStateAction<formData>) => void
  removeTag: (tagToRemove: string) => void
  setNewTag: (value: React.SetStateAction<string>) => void
  addTag: () => void
  newTag: string
}


export const PostForm = ({
  handleSubmit,
  handleTitleChange,
  formData,
  setFormData,
  removeTag,
  setNewTag,
  addTag,
  newTag
}:Props) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <CustomCard>
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
            </CustomCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <CustomCard>
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
            </CustomCard>

            {/* Category */}
            <CustomCard>
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
            </CustomCard>

            {/* Cover Image */}
            <CustomCard>
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
            </CustomCard>

            {/* Tags */}
            <CustomCard>
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
            </CustomCard>
          </div>
        </form>
    </>
  )
}
