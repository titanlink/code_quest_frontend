import { ResponsePropio } from "@/config/response-propio";
import { ILike } from "../entities/like.entity";

export interface LikeDatasource {
  all(page: number, limit: number, token: string): Promise<any>;
  findById(id: string, token: string): Promise<ILike | ResponsePropio>;
  create(entity: any, token: string): Promise<ILike | ResponsePropio>;
  update(entity: any, token: string): Promise<ILike | ResponsePropio>;
  delete(id: string, token: string): Promise<ResponsePropio>;
}
