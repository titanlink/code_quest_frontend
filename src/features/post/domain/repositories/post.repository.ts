import { ResponsePropio } from "@/config/response-propio";
import { IPost } from "../entities/post.entity";

export abstract class PostRepository {
  abstract all(
    page: number,
    limit: number,
    token: string,
    categoriId?: number
  ): Promise<IPost[] | ResponsePropio>;
  abstract findById(id: string, token: string): Promise<IPost | ResponsePropio>;
  abstract findBySlugId(
    slug: string,
    token: string
  ): Promise<IPost | ResponsePropio>;
  abstract create(entity: any, token: string): Promise<IPost | ResponsePropio>;
  abstract update(entity: any, token: string): Promise<IPost | ResponsePropio>;
  abstract delete(id: string, token: string): Promise<ResponsePropio>;
}
