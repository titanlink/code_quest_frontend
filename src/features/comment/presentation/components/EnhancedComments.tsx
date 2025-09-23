"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  MessageCircle,
  Reply,
  MoreHorizontal,
  Flag,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth-context";
import { CustomCard } from "@/components/CustomCard";
import { ShineBorder } from "@/components/magicui/shine-border";
import { IPost } from "@/features/post/domain/entities/post.entity";
import { IUser } from "@/features/user/domain/entities/user.entity";
import { createCommentAction } from "../../actions/create";
import { IComment, ISubComment, SubCommentMapper } from "../../domain/entities/comment.entity";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";



interface Props {
  post: IPost;
  postId: string;
  postComments: IComment[];
}

export function EnhancedCommentsSection({ postId, postComments, post }: Props) {
  const { user, getToken, session } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [comments, setComments] = useState(postComments);

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        const authToken = (await getToken()) ?? "";
        setToken(authToken);
      }
    };
    fetchToken();
  }, [user, token, newComment, getToken]);


  const getCurrenUser = (): IUser => {
    return  {
      id: post.author?.id ?? "",
      email: user?.email ?? "",
      name: user?.displayName ?? "",
      role: "user",
      avatar: session?.avatar
    }
  }


  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    // console.log("🚀 ~ handleSubmitComment ~ user:", user)
    const comment: IComment = {
      id: Date.now().toString(),
      content: newComment,
      postId,
      authorId: getCurrenUser().id,
      author: getCurrenUser(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const resp = await createCommentAction(comment, token ?? "");
    if ("error" in resp) return;

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleSubmitReply = async (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    const isSubComment = true;
    if (!user || !replyContent.trim()) return;

    const reply: IComment | ISubComment = {
      id: Date.now().toString(),
      content: replyContent,
      postId,
      parentId,
      authorId: getCurrenUser().id,
      author: getCurrenUser(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // console.log("🚀 ~ handleSubmitReply ~ reply:", reply)

    const resp = await createCommentAction(reply, token ?? "", isSubComment);
    const subComment = SubCommentMapper.fromJson(resp)
    if ("error" in resp) return;
    const mapeado = comments.map((comment)=> {
      if (comment.id == parentId){
        if (subComment) comment.sub_comment?.push(subComment)
      }
      return comment
    })
    setComments(mapeado);
    setReplyContent("");
    setReplyTo(null);
  };


  const topLevelComments = comments
    .sort((b, a) => {
      const aTime =
        a?.createdAt instanceof Date
          ? a.createdAt.getTime()
          : typeof a?.createdAt === "number"
          ? a.createdAt
          : 0;
      const bTime =
        b?.createdAt instanceof Date
          ? b.createdAt.getTime()
          : typeof b?.createdAt === "number"
          ? b.createdAt
          : 0;
      return aTime - bTime;
    })
    .filter((c) => c.sub_comment);

  return (
    <section className="mt-16 pt-16 border-t">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-5 w-5" />
        <h2 className="text-2xl font-bold">Comentarios ({comments.length})</h2>
      </div>
      {/* <pre><b>{JSON.stringify(comments, null, 2) } </b> </pre> */}
      {/* Comment Form */}
      {user ? (
        <CustomCard className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Agregar comentario</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={user.photoURL || "/placeholder.svg"}
                    alt={user?.displayName ?? ""}
                  />
                  <AvatarFallback>
                    {user?.displayName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Escribe tu comentario..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={!newComment.trim()}>
                  Publicar comentario
                </Button>
              </div>
            </form>
          </CardContent>
          <ShineBorder shineColor={["#FE8FB5", "#FFBE7B"]} />
        </CustomCard>
      ) : (
        <Card className="mb-8 bg-muted/30">
          <CardContent className="pt-6">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">
                Únete a la conversación
              </h3>
              <p className="text-muted-foreground mb-4">
                Inicia sesión para comentar y participar en la discusión.
              </p>
              <div className="flex gap-2 justify-center">
                <Button asChild>
                  <a href="/login">Iniciar Sesión</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/register">Registrarse</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comments List */}
      <ScrollArea className={`${comments.length > 0 ? 'h-200' : 'h-60' } w-full rounded-md border p-4`}>
        <div className="space-y-6 mt-4">
          {comments.length > 0 ? (
            comments.map((comment) => {
              const sub_comment: IComment[] = comment.sub_comment ?? []; //
              return (
                <div key={comment.id} className="space-y-4">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={comment?.author?.avatar || "/placeholder.svg"}
                        alt={comment?.author?.name}
                      />
                      <AvatarFallback>
                        {comment?.author?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {comment?.author?.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {comment?.createdAt?.toLocaleDateString()}
                          </span>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={()=> { toast.warning("Todo: No Implementado")}}>
                              <Flag className="mr-2 h-4 w-4" />
                              Reportar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <p className="text-sm leading-relaxed">
                        {comment.content}
                      </p>

                      <div className="flex items-center gap-4 text-sm">
                        {/* <Button
                          variant="ghost"
                          size="sm"
                          className={`h-auto p-0 ${
                            isLiked ? "text-red-500" : "text-muted-foreground"
                          } hover:text-red-500`}
                          onClick={() => handleLikeComment(comment?.id ?? "")}
                        >
                          <Heart
                            className={`h-4 w-4 mr-1 ${
                              isLiked ? "fill-current" : ""
                            }`}
                          />
                          Me gusta
                        </Button> */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-muted-foreground hover:text-foreground"
                          onClick={() =>
                            setReplyTo(
                              replyTo === comment?.id ? null : comment?.id ?? ""
                            )
                          }
                        >
                          <Reply className="h-4 w-4 mr-1" />
                          Responder
                        </Button>
                      </div>

                      {/* Reply Form */}
                      {replyTo === comment.id && user && (
                        <form
                          onSubmit={(e) =>
                            handleSubmitReply(e, comment?.id ?? "")
                          }
                          className="mt-4 space-y-3"
                        >
                          <div className="flex gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={user.photoURL || "/placeholder.svg"}
                                alt={user.displayName ?? ""}
                              />
                              <AvatarFallback>
                                {user?.displayName?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <Textarea
                                placeholder={`Responder a ${comment?.author?.name}...`}
                                value={replyContent}
                                onChange={(e) =>
                                  setReplyContent(e.target.value)
                                }
                                className="min-h-[80px]"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setReplyTo(null)}
                            >
                              Cancelar
                            </Button>
                            <Button
                              type="submit"
                              size="sm"
                              disabled={!replyContent.trim()}
                            >
                              Responder
                            </Button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>

                  {/* sub_comment */}
                  {sub_comment.length > 0 && (
                    <div className="ml-14 space-y-4 border-l-2 border-muted pl-4">
                      {sub_comment.map((reply) => {

                        return (
                          <div key={reply.id} className="flex gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={
                                  reply?.author?.avatar || "/placeholder.svg"
                                }
                                alt={reply?.author?.name}
                              />
                              <AvatarFallback>
                                {reply?.author?.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">
                                  {reply?.author?.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {reply?.createdAt?.toLocaleDateString()}
                                </span>
                              </div>

                              <p className="text-sm leading-relaxed">
                                {reply.content}
                              </p>

                              <div className="flex items-center gap-4 text-xs">
                                {/* <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`h-auto p-0 ${
                                    isReplyLiked
                                      ? "text-red-500"
                                      : "text-muted-foreground"
                                  } hover:text-red-500`}
                                  onClick={() =>
                                    handleLikeComment(reply?.id ?? "")
                                  }
                                >
                                  <Heart
                                    className={`h-3 w-3 mr-1 ${
                                      isReplyLiked ? "fill-current" : ""
                                    }`}
                                  />
                                  Me gusta
                                </Button> */}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {comment.id !==
                    topLevelComments[topLevelComments.length - 1]?.id && (
                    <Separator />
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">
                No hay comentarios aún
              </h3>
              <p className="text-muted-foreground">
                Sé el primero en comentar este artículo.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </section>
  );
}
