import { ResponsePropio } from "@/config/response-propio";
import { ILike } from "../entities/like.entity";

export abstract class LikeRepository {
  abstract all(page: number, limit: number): Promise<any>;
  abstract findById(id: string, token: string): Promise<ILike | ResponsePropio>;
  abstract create(entity: any, token: string): Promise<ILike | ResponsePropio>;
  abstract update(entity: any, token: string): Promise<ILike | ResponsePropio>;
  abstract delete(id: string, token: string): Promise<ResponsePropio>;
}
