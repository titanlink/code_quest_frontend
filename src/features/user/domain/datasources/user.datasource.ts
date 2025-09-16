

export interface UserDatasource {
  findById(id: string, token: string): Promise<any>;
  create(entity: any, token: string): Promise<any>;
  update(entity: any, token: string): Promise<any>;
  all(page:number, limit:number, token: string): Promise<any>;
  delete(id: string, token: string): Promise<any>;
}
