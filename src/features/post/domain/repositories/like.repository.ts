import { ResponsePropio } from "@/config";
import { ILike } from "..";


export abstract class LikeRepository {
  abstract all(page:number, limit:number): Promise<any>;
  abstract findById(id: string, token: string): Promise<ILike | ResponsePropio>;
  abstract create(entity: any, token: string): Promise<ILike | ResponsePropio>;
  abstract update(entity: any, token: string): Promise<ILike | ResponsePropio>;
  abstract delete(id: string, token: string): Promise<ResponsePropio>;
}
