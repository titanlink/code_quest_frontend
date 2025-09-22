import { IUser, UserMapper } from "@/features/user/domain/entities/user.entity";
import { IPost, PostMapper } from "./post.entity";

export interface IBookMark {
  id?: string;
  post?: IPost;
  user?: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

export class BookMarkMapper {
  static fromJson(json: Record<string, any>): IBookMark | undefined {
    let retorno: IBookMark | undefined;
    if (!json) return;
    try {
      const user = UserMapper.fromJson(json["user"]);
      const post = PostMapper.fromJson(json["post"]);
      retorno = {
        id: json["id"],
        user: user,
        post: post,
        createdAt: new Date(json["createAt"]),
        updatedAt: new Date(json["updateAt"]),
      };
    } catch {
      retorno = undefined;
    } finally {
      return retorno;
    }
  }

  static fromJsonList(data: any): IBookMark[] {
    const entities: IBookMark[] = [];
    if (!data) return entities;
    for (const json of data) {
      const entidad = BookMarkMapper.fromJson(json);
      if (entidad) entities.push(entidad);
    }
    return entities;
  }
}

export const bookMarkGQLFields = `
id
createAt
updateAt
`;
