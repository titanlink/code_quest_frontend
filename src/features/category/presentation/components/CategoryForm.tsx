"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";


import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";

import { inputErrors } from "@/components/input-errors";

import { CustomCard } from "@/components/CustomCard";
import { FormErrors } from "@/components/FormErrors";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FormColorInput } from "@/components/ui/form-color-input";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { ICategory } from "../../domain/entities/category.entity";
import { useCategoryStore } from "../providers/category.store";

interface Props {
  entity?: ICategory;
}

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string(inputErrors.required).min(2, inputErrors.minLength(2)),
  slug: z
    .string(inputErrors.required)
    .min(2, inputErrors.minLength(2))
    .max(60, inputErrors.minLength(60)),
  description: z.string().optional(),
  color: z
    .string(inputErrors.required)
    .regex(/^#[0-9A-F]{6}$/i, {
      message: "Debe ser un color hexadecimal válido.",
    })
    .optional(),
});

export const CategoryForm = ({ entity }: Props) => {
  const isNew = entity ? false : true;
  const actionTitle = isNew ? "Nueva" : "Editar";
  const { user, getToken } = useAuth();
  const [token, setToken] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const createOrUpdate = useCategoryStore((state) => state.createOrUpdate);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...entity,
      id: entity?.id?.toString(),
      color: entity?.color ?? "#FFFFFF",
    },
  });

  useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        const authToken = (await getToken()) ?? "";
        setToken(authToken);
      }
    };
    fetchToken();
  }, [user, token, getToken]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // toast.info( <pre><b>{JSON.stringify(values, null, 2) } </b> </pre>)
    let isCreated = false;
    const actioned = isNew ? "Registrado" : "Actualizado";
    startTransition(async () => {
      try {
        const resp = await createOrUpdate(values, token);
        if ("error" in resp && resp["error"]) {
          toast.error(resp.msg);
          return;
        }
        if ("id" in resp) isCreated = true;
        if (!isCreated) return;
        toast.success(`${actioned} Correctamente!`);
        router.push(`/admin/categories`);
      } catch (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      }
    });
  }

  return (
    <Form {...form}>
      <div className="space-y-6">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-1 gap-6"
        >
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" asChild>
                    <Link href="/admin/categories">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Volver
                    </Link>
                  </Button>
                  <div>
                    <h1 className="text-3xl font-bold">
                      {actionTitle} Categoria
                    </h1>
                    {isNew && (
                      <p className="text-muted-foreground">
                        Crea una nueva categoria para los blogs
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" size="lg" disabled={isPending}>
                    {isPending ? (
                      <>
                        {" "}
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />{" "}
                        Guardando...{" "}
                      </>
                    ) : (
                      <>
                        {" "}
                        <Save className="h-4 w-4 mr-2" /> Guardar{" "}
                      </>
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ej: Cocina, Vehiculos"
                            type="text"
                            {...field}
                          />
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
                            {...field}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
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
            </div>

            <div className="space-y-6">
              <FormErrors formState={form.formState} />
            </div>
          </div>
        </form>
      </div>
    </Form>
  );
};
