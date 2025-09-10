

export abstract class CommentRepository {
  abstract findById(id: number): Promise<any>;
  abstract create(entity: any): Promise<any>;
  abstract update(entity: any): Promise<any>;
  abstract all(page:number, limit:number): Promise<any>;
  abstract delete(id: number): Promise<any>;
}
