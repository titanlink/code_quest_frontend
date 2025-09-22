"use client"

import { FormField, FormItem, FormLabel, FormDescription, FormMessage, Form, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner";
import { useForm } from "react-hook-form";


import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { ArrowLeft, Eye, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { CustomCard } from "@/components/CustomCard";
import { FormErrors } from "@/components/FormErrors";
import { inputErrors } from "@/components/input-errors";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TagsInput } from "@/components/ui/tags-input";
import { useCategoryStore } from "@/features/category/presentation/providers/category.store";
import { useAuth } from "@/lib/auth-context";
import { getImageUrl } from "@/lib/utils";

import { IPost } from "../../domain/entities/post.entity";
import { usePostStore } from "../providers/post.store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";


interface Props {
  entity?: IPost;
}

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string(inputErrors.required).min(2,inputErrors.minLength(2)),
  slug: z.string(inputErrors.required).min(2,inputErrors.minLength(2)).max(60, inputErrors.minLength(60)),
  excerpt: z.string(inputErrors.required).min(2,inputErrors.minLength(2)),
  content: z.string(inputErrors.required).min(2,inputErrors.minLength(2)),
  categoryId: z.string(),
  // coverImage: z.any().optional(),
  coverImage: z.any().refine(
    (file) => {
      if (!file) return true; // ✅ si no hay archivo, pasa
      return (
        file.size <= 25 * 1024 * 1024 &&
        ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(file.type)
      );
    },
    { message: "El archivo no puede ser mayor de 25MB y solo JPG/PNG/GIF son permitidos" }
  ).optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  tags: z.array(z.string()),
});

export const PostForm = ({entity}:Props) => {
  const [preview, setPreview] = useState<string | null>( getImageUrl(entity?.coverImage))
  const isNew = entity ? false : true
  const actionTitle = isNew ? 'Nueva' : 'Editar'
  const { user, getToken } = useAuth()
  const [token, setToken] = useState<string>('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter();
  const createOrUpdate = usePostStore((state) => state.createOrUpdate);
  const getCategories = useCategoryStore((state) => state.getData);
  const categories = useCategoryStore((state) => state.items);
  

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...entity,
      id: entity?.id?.toString(),
      categoryId: entity?.categoryId?.toString(),
    }
  })

  useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        const authToken = await getToken() ?? ''
        setToken(authToken)
        getCategories(0, 10, authToken );
      }
    }
    fetchToken()
  }, [user, token])

  async function onSubmit(values: z.infer < typeof formSchema > ) {
    // toast.info( <pre><b>{JSON.stringify(values, null, 2) } </b> </pre>)
    let isCreated = false
    const actioned = isNew ? 'Registrado' : 'Actualizado'
    startTransition(async () => {
      try {
        const resp = await createOrUpdate(values, token)
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

      <form onSubmit={form.handleSubmit(onSubmit)}  className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between" >
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/admin/posts">
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

            <CardContent>
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category?.id?.toString() ?? ''}>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                              {category.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                      
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </CustomCard>

          {/* Cover Image */}
          <CustomCard>
            <CardHeader>
              <CardTitle>Imagen de Portada</CardTitle>
            </CardHeader>
            <CardContent>

              {/* <ImageUpload control={form.control} name="coverImage"  maxSize={15} /> */}
              {/* <CustomFormFile control={form.control}  name="coverImage"  /> */}

              <FormField
                    control={form.control}
                    name="coverImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Imagen de Portada</FormLabel>
                        <FormControl>
                          <Input
                            name="coverImage"
                            type="file"
                            accept="*/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              field.onChange(file)
                              if (file) {
                                console.log("🚀 ~ ...file:", file)
                                setPreview(URL.createObjectURL(file)) 
                              }
                            }}
                          />
                        </FormControl>
                        {preview && (
                          <img
                            src={preview}
                            alt="Vista previa"
                            className="mt-2 w-32 h-32 object-cover rounded-md border"
                          />
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              


              
            </CardContent>
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