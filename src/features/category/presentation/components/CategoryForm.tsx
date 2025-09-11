"use client"

import { Input, Button, CustomCard, CardContent, CardTitle, CardHeader, CardFooter, FormColorInput } from "@/components";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { ICategory } from "../..";

interface Props {
  entity?: ICategory;
}

const formSchema = z.object({
  name: z.string().min(1).min(1),
  slug: z.string().min(1).min(2).max(60),
  description: z.string().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, {
    message: "Debe ser un color hexadecimal válido.",
  }),
});

export const CategoryForm = ({entity}:Props) => {

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),

  })

  function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}  className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <CustomCard>
          <CardHeader>
            <CardTitle>Contenido Principal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input 
                  placeholder="shadcn"
                  
                  type="text"
                  {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
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
                  placeholder="shadcn"
                  
                  type="text"
                  {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Agrega una breve descripción"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />

          <FormColorInput
            control={form.control}
            name="color"
            label="Color primario"
            placeholder="Seleccionar color"
          />

          </CardContent>
        </CustomCard>
      </form>
    </Form>
  )
}