import {
  ICategory,
  CategoryMapper,
} from "@/features/category/domain/entities/category.entity";
import {
  IComment,
  CommentMapper,
} from "@/features/comment/domain/entities/comment.entity";
import { IUser, UserMapper } from "@/features/user/domain/entities/user.entity";
import { IBookMark, BookMarkMapper } from "./bookmark.entity";
import { IImage, ImageMapper } from "./image.entity";
import { ILike, LikeMapper } from "./like.entity";

export interface IPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  likes?: ILike[];
  bookmarks?: IBookMark[];
  comments?: IComment[];
  published?: boolean;
  featured?: boolean;
  totalView?: number;
  viewUserCount?: number;
  likesCount?: number;
  bookMarkCount?: number;
  commentsCount?: number;
  coverImage?: string | File;
  image?: IImage | null;
  authorId?: string;
  author?: IUser;
  categoryId?: string;
  category?: ICategory;
  isLiked?: boolean;
  isBookMarked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class PostMapper {
  static fromJson(
    json: Record<string, any>,
    isLiked?: boolean,
    isBookMarked?: boolean
  ): IPost | undefined {
    let retorno: IPost | undefined;
    if (!json) return;
    try {
      const author = UserMapper.fromJson(json["user"]);
      const category = CategoryMapper.fromJson(json["category"]);
      const comments = CommentMapper.fromJsonList(json["comment"] ?? []);
      const likes = LikeMapper.fromJsonList(json["like_post"] ?? []);
      const bookmarks = BookMarkMapper.fromJsonList(
        json["bookmark_post"] ?? []
      );

      const coverImage = ImageMapper.fromJson(json["image"]);
      retorno = {
        id: json["id"],
        title: json["title"],
        slug: json["slug"],
        content: json["content"],
        coverImage: coverImage?.secure_url,
        image: coverImage,
        excerpt: json["excerpt"],
        authorId: author?.id,
        author: author,
        likes: likes,
        bookmarks: bookmarks,
        comments: comments,
        categoryId: category?.id,
        category: category,
        tags: json["tags"],
        published: json["published"] ?? false,
        featured: json["featured"] ?? false,
        likesCount: json["likesCount"] ?? likes.length,
        totalView: json["total_view"] ?? 0,
        viewUserCount: json["viewUserCount"] ?? 0,
        bookMarkCount: json["bookMarkCount"] ?? bookmarks.length,
        commentsCount: json["commentCount"] ?? comments.length,

        createdAt: new Date(json["createAt"]),
        updatedAt: new Date(json["updateAt"]),
        isLiked: isLiked ?? false,
        isBookMarked: isBookMarked ?? false,
      };
    } catch {
      retorno = undefined;
    } finally {
      return retorno;
    }
  }

  static fromJsonList(data: any): IPost[] {
    const entities: IPost[] = [];
    if (!data) return entities;
    for (const json of data) {
      const entidad = PostMapper.fromJson(json);
      if (entidad) entities.push(entidad);
    }
    return entities;
  }
}

export const postGQLFields = `
  id
  title
  slug
  content
  excerpt
  published
  featured
  total_view
  likesCount
  bookmarkCount
  viewUserCount
  commentCount
  tags
  createAt
  updateAt
  image {
    id
    secure_url
    public_id
  }
`;
