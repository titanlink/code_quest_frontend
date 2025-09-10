

export abstract class CategoryRepository {
  abstract findById(id: number): Promise<any>;
  abstract create(entity: any): Promise<any>;
  abstract update(entity: any): Promise<any>;
  abstract list(page:number, limit:number): Promise<any>;
  abstract delete(id: number): Promise<any>;
}
