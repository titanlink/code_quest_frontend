

export abstract class CommentRepository {
  abstract findById(id: string): Promise<any>;
  abstract create(entity: any): Promise<any>;
  abstract update(entity: any): Promise<any>;
  abstract all(page:number, limit:number): Promise<any>;
  abstract delete(id: string): Promise<any>;
}
