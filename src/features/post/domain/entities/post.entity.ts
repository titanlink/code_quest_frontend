import { BookMarkMapper, CategoryMapper, CommentMapper, IBookMark, ICategory, IComment, ILike, IUser, LikeMapper, UserMapper } from "@/features"

export interface IPost {
  id?: string
  title: string
  slug: string
  content: string
  excerpt: string
  tags: string[]
  likes?: ILike[]
  bookmarks?: IBookMark[]
  comments?: IComment[]
  published?: boolean
  featured?: boolean
  likesCount?: number
  bookMarkCount?: number
  commentsCount?: number
  viewsCount?: number
  coverImage?: string |  File
  authorId?: string
  author?: IUser
  categoryId?: string
  category?: ICategory
  isLiked?: boolean
  isBookMarked?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export class PostMapper {
  static fromJson( json: Record<string, any>, isLiked?: boolean, isBookMarked?: boolean ): IPost | undefined {
    let retorno: IPost | undefined
    if (!json) return
    try {
      const author = UserMapper.fromJson(json['user'])
      const category = CategoryMapper.fromJson(json['category'])
      const comments = CommentMapper.fromJsonList(json['comment'] ?? [])
      const likes = LikeMapper.fromJsonList(json['like_post'] ?? [])
      const bookmarks = BookMarkMapper.fromJsonList(json['bookmark_post'] ?? [])
      retorno = {
        id: json['id'],
        title: json['title'],
        slug: json['slug'],
        content: json['content'],
        coverImage: json['coverImage'],
        excerpt:  json['excerpt'],
        authorId: author?.id,
        author: author,
        likes: likes,
        bookmarks: bookmarks,
        comments: comments,
        categoryId: category?.id,
        category: category,
        tags: json['tags'],
        published: json['published'] ?? false,
        featured: json['featured'] ?? false,
        likesCount: json['likesCount'] ?? likes.length,
        bookMarkCount: json['bookMarkCount'] ?? bookmarks.length,
        commentsCount: json['commentsCount'] ?? comments.length,
        viewsCount: json['viewsCount'] ?? 0,
        createdAt: new Date(json['createAt']),
        updatedAt: new Date(json['updateAt']),
        isLiked: isLiked ?? false,
        isBookMarked: isBookMarked ?? false,
      }
    } catch (e){
      retorno = undefined
    } finally {
      return retorno
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