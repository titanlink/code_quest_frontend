import { IUser } from "@/features"

export interface IComment {
  id?: string
  content: string
  postId: string
  authorId?: string
  author?: IUser
  parentId?: string
  replies?: IComment[]
  createdAt?: Date
  updatedAt?: Date
}


export class CommentMapper {
  static fromJson( json: Record<string, any> ): IComment {
    return {
      id: json['id'],
      content: json['content'],
      postId: json['postId'],
      author: json['author'],
      createdAt: json['createdAt'],
      updatedAt: json['updatedAt'],
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