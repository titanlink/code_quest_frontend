import { IUser, UserMapper } from "@/features"

export interface IComment {
  id?: string
  content: string
  postId?: string
  authorId?: string
  author: IUser
  parentId?: string
  sub_comment?: ISubComment[]
  createdAt?: Date
  updatedAt?: Date
}
export interface ISubComment {
  id?: string
  content: string
  likesCount?:number
  authorId?: string
  author: IUser
  commentId?:string
  comment:IComment
  createdAt?: Date
  updatedAt?: Date
}


export class CommentMapper {
  static fromJson( json: Record<string, any> ): IComment | undefined {
    if (!json) return
    return {
      id: json['id'],
      content: json['content'],
      postId: json['postId'],
      sub_comment: SubCommentMapper.fromJsonList(json['sub_comment'] ?? []),
      author: UserMapper.fromJson(json['user']) ?? json['user'],
      createdAt: new Date(json['createAt']),
      updatedAt: new Date(json['updateAt']),
    }
  }

  static fromJsonList( data: any ) : IComment[] {
    const entities: IComment[] = [];
    if (!data) return entities
    for (const json of data) {
      const entidad = CommentMapper.fromJson(json);
      if(entidad) entities.push(entidad);
    }
    return entities;
  }
}

export class SubCommentMapper {
  static fromJson( json: Record<string, any> ): ISubComment | undefined {
    if (!json) return
    const author:IUser = UserMapper.fromJson(json['user']) ?? json['user']
    const parentComment:IComment = CommentMapper.fromJson(json['comment']) ?? json['comment']
    return {
      id: json['id'],
      content: json['content'],
      comment: parentComment,
      commentId: parentComment?.id?.toString(),
      author: author,
      authorId: author?.id?.toString(),
      createdAt: new Date(json['createAt']),
      updatedAt: new Date(json['updateAt']),
    }
  }

  static fromJsonList( data: any ) : ISubComment[] {
    const entities: ISubComment[] = [];
    if (!data) return entities
    for (const json of data) {
      const entidad = SubCommentMapper.fromJson(json);
      if(entidad) entities.push(entidad);
    }
    return entities;
  }
}