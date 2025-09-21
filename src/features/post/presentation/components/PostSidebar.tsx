"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar,  X } from "lucide-react"
import { Badge, CustomCard, PostCard } from "@/components"
import { ICategory, IPost, usePostStore } from "@/features"
import { InstagramLogoIcon } from "@radix-ui/react-icons"


interface Props {
  post: IPost
  relateds?: IPost[]
  categories?: ICategory[]
}

export function PostSidebar({ post, categories, relateds }: Props) {

  return (
    <div className="space-y-6">
      {/* Author Card */}
      <CustomCard>
        <CardHeader>
          <CardTitle className="text-lg">Sobre el autor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-16 w-16">
              <AvatarImage src={post?.author?.avatar || "/placeholder.svg"} alt={post?.author?.name} />
              <AvatarFallback className="text-lg">{post?.author?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{post?.author?.name}</h3>
              <p className="text-sm text-muted-foreground">
                {post?.author?.role === "admin" ? "Administrador" : "Colaborador"}
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            {post?.author?.about}
          </p>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Miembro desde {post?.author?.createdAt?.getFullYear()}</span>
            </div>
            {/* <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>España</span>
            </div> */}
          </div>

          <Separator />

          <div className="flex gap-2">
            {
            post?.author?.twitter_url && (
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <X className="h-4 w-4 mr-2" />
                Seguir
              </Button>)
            }
            {
              post?.author?.instagram_url && 
              (
                <Button variant="outline" size="sm">
                  <InstagramLogoIcon className="h-4 w-4" />
                </Button>
              )
            }
            {/* <Button variant="outline" size="sm">
              <LinkIcon className="h-4 w-4" />
            </Button> */}
          </div>
        </CardContent>
      </CustomCard>
      

      {/* Newsletter Signup */}
      <CustomCard className="bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg">Categorias</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 justify-between">
          { categories?.map((category) => (
            <Badge key={category.id} style={{ backgroundColor: category?.color }} className="text-white">
              {category?.name} - {category.id}
            </Badge>

          ))}
        </CardContent>
      </CustomCard>

    </div>
  )
}
