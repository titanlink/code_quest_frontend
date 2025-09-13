import { ResponsePropio } from "@/config";
import { IPost } from "..";


export abstract class PostRepository {
  abstract all(page:number, limit:number): Promise<any>;
  abstract findById(id: string): Promise<IPost | ResponsePropio>;
  abstract findBySlugId(id: string): Promise<IPost | ResponsePropio>;
  abstract create(entity: any): Promise<IPost | ResponsePropio>;
  abstract update(entity: any): Promise<IPost | ResponsePropio>;
  abstract delete(id: string): Promise<ResponsePropio>;
}
