import { ResponsePropio } from "@/config/response-propio";
import { IPost } from "../entities/post.entity";

export interface PostDatasource {
  all(
    page: number,
    limit: number,
    token: string,
    categoriId?: number
  ): Promise<ResponsePropio>;
  findById(id: string, token: string): Promise<IPost | ResponsePropio>;
  findBySlugId(slug: string, token: string): Promise<IPost | ResponsePropio>;
  create(entity: any, token: string): Promise<IPost | ResponsePropio>;
  update(entity: any, token: string): Promise<IPost | ResponsePropio>;
  delete(id: string, token: string): Promise<ResponsePropio>;
}
