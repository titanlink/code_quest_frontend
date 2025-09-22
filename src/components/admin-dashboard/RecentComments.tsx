
import { IComment } from "@/features/comment/domain/entities/comment.entity";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Link } from "lucide-react";
import React from "react";
import { CustomCard } from "../CustomCard";
import { Button } from "../ui/button";
import { CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";


interface Props {
  recentComments: IComment[];
}
const RecentComments = ({ recentComments }: Props) => {
  return (
    <CustomCard withBlur withOpacity>
      <CardHeader>
        <CardTitle>Comentarios Recientes</CardTitle>
        <CardDescription>Los últimos comentarios de usuarios</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentComments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={comment?.author?.avatar || "/placeholder.svg"}
                alt={comment?.author?.name}
              />
              <AvatarFallback>{comment?.author?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{comment?.author?.name}</p>
                <span className="text-xs text-muted-foreground">
                  {comment?.createdAt?.toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </CustomCard>
  );
};

export default RecentComments;
