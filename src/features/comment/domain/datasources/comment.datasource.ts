import { ResponsePropio } from "@/config/response-propio";
import { IComment } from "../entities/comment.entity";

export interface CommentDatasource {
  all(page: number, limit: number, token: string): Promise<any>;
  findById(id: string, token: string): Promise<IComment | ResponsePropio>;
  create(
    entity: any,
    token: string,
    isSubComment: boolean
  ): Promise<IComment | ResponsePropio>;
  update(entity: any, token: string): Promise<IComment | ResponsePropio>;
  delete(id: string, token: string): Promise<ResponsePropio>;
}
