

export abstract class UserRepository {
  abstract checkProfile(): Promise<any>;
  abstract findById(id: string): Promise<any>;
  abstract create(entity: any): Promise<any>;
  abstract update(entity: any): Promise<any>;
  abstract changeRole(entity: any): Promise<any>;
  abstract all(page:number, limit:number): Promise<any>;
  abstract delete(id: string): Promise<any>;
}
