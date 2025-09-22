import { ResponsePropio } from "@/config/response-propio";
import { IBookMark } from "../entities/bookmark.entity";

export abstract class BookMarkRepository {
  abstract all(page: number, limit: number): Promise<any>;
  abstract findById(
    id: string,
    token: string
  ): Promise<IBookMark | ResponsePropio>;
  abstract create(
    entity: any,
    token: string
  ): Promise<IBookMark | ResponsePropio>;
  abstract update(
    entity: any,
    token: string
  ): Promise<IBookMark | ResponsePropio>;
  abstract delete(id: string, token: string): Promise<ResponsePropio>;
}
