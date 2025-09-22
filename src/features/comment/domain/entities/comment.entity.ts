import {
  IUser,
  UserMapper,
} from "@/features/user/domain/entities/user.entity";

const userFields = `
id
provider
providerId
about
twitter_url
instagram_url
role
avatar
name
email
createAt
updateAt
`

export interface IComment {
  id?: string;
  content: string;
  postId?: string;
  authorId?: string;
  author: IUser;
  parentId?: string;
  sub_comment?: ISubComment[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ISubComment {
  id?: string;
  content: string;
  likesCount?: number;
  authorId?: string;
  author: IUser;
  commentId?: string;
  comment: IComment;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CommentMapper {
  static fromJson(json: Record<string, any>): IComment | undefined {
    if (!json) return;
    return {
      id: json["id"],
      content: json["content"],
      postId: json["postId"],
      sub_comment: SubCommentMapper.fromJsonList(json["sub_comment"] ?? []),
      author: UserMapper.fromJson(json["user"]) ?? json["user"],
      createdAt: json["createAt"] ? new Date(json["createAt"]) : new Date(),
      updatedAt: json["updateAt"] ? new Date(json["updateAt"]) : new Date(),
    };
  }

  static fromJsonList(data: any): IComment[] {
    const entities: IComment[] = [];
    if (!data) return entities;
    for (const json of data) {
      const entidad = CommentMapper.fromJson(json);
      if (entidad) entities.push(entidad);
    }
    return entities;
  }
}

export class SubCommentMapper {
  static fromJson(json: Record<string, any>): ISubComment | undefined {
    if (!json) return;
    const author: IUser = UserMapper.fromJson(json["user"]) ?? json["user"];
    const parentComment: IComment =
      CommentMapper.fromJson(json["comment"]) ?? json["comment"];
    return {
      id: json["id"],
      content: json["content"],
      comment: parentComment,
      commentId: parentComment?.id?.toString(),
      author: author,
      authorId: author?.id?.toString(),
      createdAt: json["createAt"] ? new Date(json["createAt"]) : new Date(),
      updatedAt: json["updateAt"] ? new Date(json["updateAt"]) : new Date(),
    };
  }

  static fromJsonList(data: any): ISubComment[] {
    const entities: ISubComment[] = [];
    if (!data) return entities;
    for (const json of data) {
      const entidad = SubCommentMapper.fromJson(json);
      if (entidad) entities.push(entidad);
    }
    return entities;
  }
}

export const subCommentGQLFields = `
  id
  content
  likesCount
  createAt
  updateAt
  user { ${userFields} }
  comment {
    id
    content
  }
`;

export const commentGQLFields = `
  id
  likesCount
  commentCount
  content
  createAt
  updateAt
  user { ${userFields} }
  sub_comment { ${subCommentGQLFields} }
`;
