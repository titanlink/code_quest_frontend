import { ResponsePropio } from "@/config";
import { IComment} from "..";


export abstract class CommentRepository {
  abstract findById(id: string): Promise<IComment| ResponsePropio>;
  abstract create(entity: any): Promise<IComment| ResponsePropio>;
  abstract update(entity: any): Promise<IComment| ResponsePropio>;
  abstract all(page:number, limit:number): Promise<any>;
  abstract delete(id: string): Promise<ResponsePropio>;
}
