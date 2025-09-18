import { IPost, IUser, PostMapper, UserMapper } from "@/features"

export interface ILike {
  id?: string
  post?: IPost
  user?: IUser
  createdAt?: Date
  updatedAt?: Date
}


export class LikeMapper {
  static fromJson( json: Record<string, any> ): ILike {
    const post = PostMapper.fromJson(json['post'])
    const user = UserMapper.fromJson(json['user'])
    return {
      id: json['id'],
      post: post,
      user: user,
      createdAt: new Date(json['createAt']),
      updatedAt: new Date(json['updateAt']),
    }
  }

  static fromJsonList( data: any ) : ILike[] {
    const entities: ILike[] = [];
    if (!data) return entities
    for (const json of data) {
      const entidad = LikeMapper.fromJson(json);
      if(entidad) entities.push(entidad);
    }
    return entities;
  }
}