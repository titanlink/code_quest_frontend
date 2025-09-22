import { ResponsePropio } from "@/config/response-propio";
import { IComment } from "../entities/comment.entity";

export abstract class CommentRepository {
  abstract findById(
    id: string,
    token: string
  ): Promise<IComment | ResponsePropio>;
  abstract create(
    entity: any,
    token: string,
    isSubComment: boolean
  ): Promise<IComment | ResponsePropio>;
  abstract update(
    entity: any,
    token: string
  ): Promise<IComment | ResponsePropio>;
  abstract all(page: number, limit: number, token: string): Promise<any>;
  abstract delete(id: string, token: string): Promise<ResponsePropio>;
}
