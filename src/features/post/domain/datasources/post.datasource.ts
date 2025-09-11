import { IPost } from "..";


export interface PostDatasource {
  all(page:number, limit:number): Promise<IPost[]>;
  findById(id: string): Promise<any>;
  create(entity: any): Promise<any>;
  update(entity: any): Promise<any>;
  delete(id: string): Promise<any>;
}
