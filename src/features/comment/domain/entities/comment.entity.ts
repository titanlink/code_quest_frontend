import { IUser } from "@/features"

export interface IComment {
  id?: string
  content: string
  postId: string
  authorId?: string
  author: IUser
  parentId?: string
  sub_comment?: IComment[]
  createdAt?: Date
  updatedAt?: Date
}


export class CommentMapper {
  static fromJson( json: Record<string, any> ): IComment {
    return {
      id: json['id'],
      content: json['content'],
      postId: json['postId'],
      sub_comment: CommentMapper.fromJsonList(json['sub_comment'] ?? []),
      author: json['user'],
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