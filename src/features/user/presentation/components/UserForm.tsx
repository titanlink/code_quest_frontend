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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { CustomCard } from "@/components/CustomCard";
import { FormErrors } from "@/components/FormErrors";
import { inputErrors } from "@/components/input-errors";
import { NotAuthorized } from "@/components/NotAuthorized";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";

import { IUser } from "../../domain/entities/user.entity";
import { useUserStore } from "../providers/user.store";
import { toast } from "sonner";

interface Props {
  entity?: IUser;
  withOpacity?: boolean
  withBlur?: boolean
  backUrl?:string
}

const formSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string(inputErrors.required).min(2, inputErrors.minLength(2)),
  twitter_url: z.string().optional(),
  instagram_url: z.string().optional(),
  about: z.string().optional(),
  role: z.any(),
});

export const UserForm = ({ entity, withOpacity, withBlur, backUrl = '/admin/users' }: Props) => {
  const isNew = entity ? false : true;
  const actionTitle = isNew ? "Nueva" : "Editar";
  const { user, getToken, session } = useAuth();
  const [token, setToken] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const createOrUpdate = useUserStore((state) => state.createOrUpdate);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...entity,
      id: entity?.id?.toString() ?? "",
      name: entity?.name ?? "",
      about: entity?.about ?? "",
      twitter_url: entity?.twitter_url ?? "",
      instagram_url: entity?.instagram_url ?? "",
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
  }, [user, token, session, getToken]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // toast.info( <pre><b>{JSON.stringify(values, null, 2) } </b> </pre>)
    let isCreated = false
    const actioned = isNew ? "Registrado" : "Actualizado";
    startTransition(async () => {
      try {

        const resp = await createOrUpdate(values, token);
        if ("error" in resp && resp['error']){ toast.error(resp.msg); return }
        if ("id" in resp) isCreated = true
        if (!isCreated) return
        toast.success(`${actioned} Correctamente!`);
        router.push(backUrl);
      } catch (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      }
    });
  }


  if (user?.email != entity?.email) return <NotAuthorized />;


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
                    <Link href={backUrl}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Volver
                    </Link>
                  </Button>
                  <div>
                    <h1 className="text-3xl font-bold">
                      {actionTitle} Usuario
                    </h1>
                    {isNew && (
                      <p className="text-muted-foreground">
                        Crea una nueva categoria para los blogs
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {/* <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Vista previa
                </Button> */}
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

              <CustomCard withOpacity={withOpacity} withBlur={withBlur}>
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
                            placeholder="Nombre de Usuario"
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
                    name="about"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Agrega una breve descripción sobre ti"
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
                    name="instagram_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link de Instagram</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="URL de su cuenta de Instagram"
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
                    name="twitter_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link de X</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="URL de su cuenta de X"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
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
