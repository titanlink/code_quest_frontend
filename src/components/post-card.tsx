"use client";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Heart, MessageCircle, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useState } from "react";
import { IPost } from "@/features/post/domain/entities/post.entity";
import { getImageUrl } from "@/lib/utils";
import { CustomCard } from "./CustomCard";
import { CardHeader, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";

interface Props {
  post: IPost | undefined;
}

export function PostCard({ post }: Props) {
  const [src, setSrc] = useState("/no_image_available.jpg");

  if (!post) return <div></div>;

  return (
    <CustomCard withHover withOpacity>
      <CardHeader className="p-0">
        <Link href={`/posts/${post.slug}`}>
          <div className="relative aspect-video overflow-hidden">
            <Image
              fill
              className="object-cover"
              priority
              src={getImageUrl(post?.coverImage)}
              alt={post.title}
              onError={() => {
                console.warn("⚠️ Imagen no encontrada:", src);
                setSrc("/fallback.png"); // cambiamos a imagen de respaldo
              }}
            />
            {/* { JSON.stringify(post?.coverImage,null,2)} */}
            <div className="absolute top-4 left-4">
              <Badge
                style={{ backgroundColor: post?.category?.color }}
                className="text-white"
              >
                {post?.category?.name}
              </Badge>
            </div>
          </div>
        </Link>
      </CardHeader>

      <CardContent className="p-6">
        <Link href={`/posts/${post.slug}`}>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2 truncate w-[90%]">
            {post.title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 truncate w-[90%]">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span>{post.likesCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>{post.commentsCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{post.totalView}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 border-t bg-muted/30">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={post?.author?.avatar || "/placeholder.svg"}
                alt={post?.author?.name}
              />
              <AvatarFallback>{post?.author?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{post?.author?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{post?.createdAt?.toLocaleDateString()}</span>
          </div>
        </div>
      </CardFooter>
      {/* <GlowEffect
        colors={[ '#33FF5720', '#3357FF20', '#F1C40F20']}
        mode='colorShift'
        blur='medium'
        duration={3}
        scale={0.9}
      /> */}
    </CustomCard>
  );
}
