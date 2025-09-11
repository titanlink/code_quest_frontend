import { IPost } from "..";


export abstract class PostRepository {
  abstract all(page:number, limit:number): Promise<IPost[]>;
  abstract findById(id: string): Promise<any>;
  abstract create(entity: any): Promise<any>;
  abstract update(entity: any): Promise<any>;
  abstract delete(id: string): Promise<any>;
}
