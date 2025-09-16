import { CategoryMapper, CommentMapper, ICategory, IComment, IUser } from "@/features"

export interface IPost {
  id?: string
  title: string
  slug: string
  content: string
  excerpt: string
  tags: string[]
  comments?: IComment[]
  published?: boolean
  featured?: boolean
  likesCount?: number
  commentsCount?: number
  viewsCount?: number
  coverImage?: string
  authorId?: string
  author?: IUser
  categoryId?: string
  category?: ICategory
  isLiked?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export class PostMapper {
  static fromJson( json: Record<string, any>, isLiked?: boolean ): IPost {
    const category = CategoryMapper.fromJson(json['category'])
    const comments = CommentMapper.fromJsonList(json['comment'] ?? [])
    return {
      id: json['id'],
      title: json['title'],
      slug: json['slug'],
      content: json['content'],
      coverImage: json['coverImage'],
      excerpt:  json['excerpt'],
      authorId: json['authorId'],
      author: json['author'],
      comments: comments,
      categoryId: category?.id,
      category: category,
      tags: json['tags'],
      published: json['published'] ?? false,
      featured: json['featured'] ?? false,
      likesCount: json['likesCount'] ?? 0,
      commentsCount: json['commentsCount'] ?? 0,
      viewsCount: json['viewsCount'] ?? 0,
      createdAt: json['createdAt'],
      updatedAt: json['updatedAt'],
      isLiked: isLiked ?? false,
    }
  }

  static fromJsonList( data: any ) : IPost[] {
    const entities: IPost[] = [];
    if (!data) return entities
    for (const json of data) {
      const entidad = PostMapper.fromJson(json);
      if(entidad) entities.push(entidad);
    }
    return entities;
  }
}