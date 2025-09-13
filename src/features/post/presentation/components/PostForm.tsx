"use client"

import { Input, Button, CustomCard, CardContent, CardTitle, CardHeader, CardFooter, FormColorInput, inputErrors, Card, Switch, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, TagsInput, CustomAlert, FormErrors } from "@/components";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { IPost, usePostStore } from "../..";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { ArrowLeft, Eye, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { mockCategories } from "@/lib";

interface Props {
  entity?: IPost;
}

const formSchema = z.object({
  id: z.string(inputErrors.invalidFormat),
  title: z.string(inputErrors.required).min(2,inputErrors.minLength(2)),
  slug: z.string(inputErrors.required).min(2,inputErrors.minLength(2)).max(60, inputErrors.minLength(60)),
  excerpt: z.string(inputErrors.required).min(2,inputErrors.minLength(2)),
  content: z.string(inputErrors.required).min(2,inputErrors.minLength(2)),
  categoryId: z.string(),
  coverImage: z.string().optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  tags: z.array(z.string()),
});

export const PostForm = ({entity}:Props) => {
  const isNew = entity ? false : true
  const actionTitle = isNew ? 'Nueva' : 'Editar'
  const [isPending, startTransition] = useTransition()
  const router = useRouter();
  const createOrUpdate = usePostStore((state) => state.createOrUpdate);

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...entity,
      id: entity?.id?.toString(),
      categoryId: entity?.categoryId?.toString(),
    }
  })

  async function onSubmit(values: z.infer < typeof formSchema > ) {
    // toast.info( <pre><b>{JSON.stringify(values, null, 2) } </b> </pre>)
    let isCreated = false
    let actioned = isNew ? 'Registrado' : 'Actualizado'
    startTransition(async () => {
      try {
        const resp = await createOrUpdate(values)
        console.log('resp',resp);
        if ("error" in resp && resp['error']){ toast.error(resp.msg); return }
        if ("id" in resp) isCreated = true 
        if (!isCreated) return
        toast.success(`${actioned} Correctamente!`)
        router.push(`/admin/posts`)

      } catch (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      }
    })
  }

  return (
    <Form {...form}>
      {/* <pre><b>{JSON.stringify(form.formState.errors, null, 2) } </b> </pre> */}


      {/* { Object.entries(form.formState.errors).length > 0 && (
        <CustomAlert 
        title="Revisar los siguientes criterios" 
        description={
        <ul>
          {Object.entries(form.formState.errors).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value.message}
            </li>
          ))}
        </ul>}
        className="mb-4" 
        variant="error" />)} */}


      <form onSubmit={form.handleSubmit(onSubmit)}  className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between" >
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/admin/categories">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold">{actionTitle} Post</h1>
                {isNew && (<p className="text-muted-foreground">Crea una nueva categoria para los blogs</p>)}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Vista previa
              </Button>
              <Button type="submit" size="lg" disabled={isPending}>
                  {isPending ? (
                    <> <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Guardando... </>
                  ) : (
                    <> <Save className="h-4 w-4 mr-2" /> Guardar </>
                  )}
              </Button>
            </div>
          </div>

          <CustomCard>
            <CardHeader>
              <CardTitle>Contenido Principal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input 
                    placeholder="Título del artículo"
                    
                    type="text"
                    {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url slug</FormLabel>
                  <FormControl>
                    <Input 
                    placeholder="ej: autos_nuevos"
                    
                    type="text"
                    {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Extracto</FormLabel>
                  <FormControl>
                      <Input 
                      placeholder="Breve descripción del artícul"
                      
                      type="text"
                      {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenido</FormLabel>
                  <FormControl>
                    <Textarea
                    placeholder="Escribe el contenido del artículo en Markdown..."
                    className="resize-none"
                    {...field}
                  />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />


            </CardContent>
          </CustomCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <FormErrors formState={form.formState}/>

          {/* Publish Settings */}
          <CustomCard>
            <CardHeader>
              <CardTitle>Configuración</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2" >
                <FormField
                  control={form.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Publicar</FormLabel>
                        <FormDescription></FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />


                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Destacado</FormLabel>
                        <FormDescription></FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

            </CardContent>
          </CustomCard>

          {/* Category */}
          <CustomCard>
            <CardHeader>
              <CardTitle>Categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={'1'}
                onValueChange={(value) => {}}
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
            {/* <CardContent>
              <Input
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="URL de la imagen"
              />
            </CardContent> */}
          </CustomCard>

          {/* Tags */}
          <CustomCard>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Etiquetas</FormLabel>
                    <FormControl>
                      <TagsInput
                        value={field.value ?? []}
                        onValueChange={field.onChange}
                        placeholder="Enter para agregar"
                      />
                    </FormControl>
                    <FormDescription>Agregar Etiquetas.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <div className="flex gap-2">
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
              )} */}
            </CardContent>
          </CustomCard>
        </div>
          


        </form>
    </Form>
  )
}